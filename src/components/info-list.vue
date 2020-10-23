<template>
    <a-table
            :class='[{ "base-table": true }, "infolist"]'
            :columns='columns'
            :dataSource='source'
            :rowSelection='rowSelection'
            :loading='loading'
            :pagination='pageSettings'
            :rowKey='rowKey'
            :scroll='scroll'
            @change='pageChange'
            ref='aTable'
    >
    </a-table>
</template>

<script>
    const defaultPageSetting = () => {
        return {
            current: 1,
            pageSize: 10, // 默认每页显示数量
            total: 0, //总数
            showSizeChanger: true, // 显示可改变每页数量
            pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
            showQuickJumper: true, //显示跳转页
            showTotal: (total, range) => `共${total}条记录`
        }
    }
    export default {
        name: 'InfoList',
        props: {
            showTotals: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            pageSettings: {
                type: [Object, Boolean],
                default: defaultPageSetting
            },
            pagination: {
                type: [Object],
                default: () => {
                    return {
                        total: 50,
                        count: 12,
                        per_page: 12,
                        current_page: 1,
                        total_pages: 5,
                        last_page: 5
                    }
                }
            },
            columns: {
                type: Array,
                default: () => {
                    return []
                }
            },
            source: {
                type: Array,
                default: () => {
                    return []
                }
            },
            rowKey: {
                type: [String, Function],
                default: 'key'
            },
            /** 翻页回调方法 */
            onPageChange: {
                type: Function,
                default: () => {
                    return () => {
                    }
                }
            },
            /**排序回调方法 */
            onSorter: {
                type: Function,
                default: () => {
                    return () => {
                    }
                }
            },
            rowSelection: {
                type: [Object, null],
                default: null
            },
            scroll: {
                type: [Object],
                default: () => {
                    return { x: false }
                }
            }
        },
        data() {
            return {
                currentSorted: {},
                currentPage: {
                    current: 1,
                    pageSize: typeof this.pageSettings !== 'boolean' ? ~~this.pageSettings.pageSize : 10
                }
            }
        },
        watch: {
            //列表项没有数据就添加小横杠
            columns: {
                handler(curr, next) {
                    curr.forEach(item => {
                        if (!('customRender' in item)) {
                            item.customRender = (text, record, index) => {
                                return record[item.dataIndex] ? (<span> {record[item.dataIndex]} </span>) : (
                                    <span>-</span>)
                            }
                        }
                    })
                },
                immediate: true
            },
            pagination(c, o) {

                if (c != null) {
                    let t = this.$refs.aTable
                    let p = t.$children[0].sPagination
                    let pagination = t.$children[0].pagination
                    this.pageSettings.total = c.total || this.total || 0
                    pagination.pageSize = ~~c.per_page // 每页条数
                    if (c.current_page > c.last_page) {
                        this.pageChange(
                            { pageSize: c.per_page, current: c.last_page },
                            {},
                            {}
                        )
                    } else {
                        if (p) {
                            if (p.current !== c.current_page) {
                                p.current = c.current_page
                            }
                        }
                    }
                    Object.assign(this.currentPage, p)
                }
            }
        },
        methods: {
            rowClassName() {
                return 'infolist-row'
            },
            pageChange(pagination, filters, sorter) {
                console.log('pageChange')
                //翻页
                if (this.currentPage.pageSize !== pagination.pageSize || this.currentPage.current !== pagination.current) {
                    //改变pageSize时回到第一页
                    if (this.currentPage.pageSize !== pagination.pageSize) {
                        pagination.current = 1
                    }
                    this.$emit('pageChange', pagination)
                    this.onPageChange(pagination)
                    this.currentPage = pagination
                }

                this.$emit('filters', filters)

                //筛选
                if (this.currentSorted.filed !== sorter.filed || this.currentSorted.order !== sorter.order) {
                    this.onSorter(sorter)
                    this.currentSorted = sorter
                }


            }
        }
    }
</script>

<style lang="less">
    // .infolist {
    //     $h40: 40px;
    //     $table-border-color: rgba(236, 236, 236, 1);
    //     height: 100%;

    //     %new-cell-style {
    //         height: $h40;
    //         padding: 10px !important;
    //     }

    //     .base-table {
    //         table-layout: fixed;
    //     }

    //     .ant-spin-container {
    //         padding: 5px 0;
    //     }

    //     .ant-table-thead {
    //         tr:first-child {
    //             td,
    //             th {
    //                 border-top: 1px solid $table-border-color;
    //                 background-color: rgba(250, 250, 250, 1);
    //             }
    //         }

    //         th,
    //         td {
    //             @extend %new-cell-style;
    //         }
    //     }

    //     .ant-table-body {
    //         > table {
    //             table-layout: fixed;
    //         }

    //         th,
    //         td {
    //             padding: 10px !important;
    //             white-space: normal;
    //             word-break: break-all;
    //             word-wrap: break-word;

    //             &:first-child {
    //                 border-left: 1px solid $table-border-color;
    //             }

    //             &:last-child {
    //                 border-right: 1px solid $table-border-color;
    //             }
    //         }
    //     }

    //     .ant-table-tbody {
    //         td {
    //             @extend %new-cell-style;
    //             border-bottom-style: dashed;
    //             border-bottom-color: rgba(236, 236, 236, 1);
    //         }
    //     }
    // }
</style>
