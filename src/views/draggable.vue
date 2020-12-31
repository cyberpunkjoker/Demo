<template>
    <div>
        <a-table
            :columns="columns" 
            :data-source="data"
            :key='keys'
            :customRow="customRow"
        >
            <div slot-scope="record" slot="expandedRowRender" v-if="record.id===123" style="display:none">
                <a-table
                    :columns="columns"
                    :data-source="undefined"
                    :pagination="false"
                >
                </a-table>
            </div>       
        </a-table>
        
        <draggable>
            <transition-group>
                <div 
                    v-for="item in data"
                    :key="item.id"
                >
                    {{item.name}}
                </div>
            </transition-group>
        </draggable>

        <div id="div" style="width:200px;height:200px;border:3px solid cyan;"></div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },
    data() {
        return {
            keys: 'id',
            columns: [
                {title: 'ID值', dataIndex: 'id'},
                {title: '姓名', dataIndex: 'name'},
                {title: '没啥', dataIndex: 'nothing'},
            ],
            data:[
                {id: 123, name: 'sdasd1', nothing: 'xasaddad'},
                {id: 1233, name: 'sdasd2', nothing: 'xasaddad1'},
                {id: 12346, name: 'sdasd3', nothing: 'xasaddad2'},
                {id: 12345, name: 'sdasd4', nothing: 'xasaddad3'},
                {id: 12344, name: 'sdasd5', nothing: 'xasaddad4'},
                {id: 12343, name: 'sdasd6', nothing: 'xasaddad5'},
                {id: 12342, name: 'sdasd7', nothing: 'xasaddad6'},
                {id: 12341, name: 'sdasd8', nothing: 'xasaddad7'}
            ],
        }
    },
    methods: {
        expandedRowRender(record,index, indent, expanded) {
            console.log(record,index, indent, expanded)
            const table = (
                <a-table
                    columns={this.columns}
                    data-source={this.data}
                    pagination={false}
                >
                </a-table>
            )
            let isRender = record.id === 123?table:null
            return isRender
        },
        changeStyle(doom) {
            doom.style.display = 'none'
        },
        // 拖动排序
        customRow(record,index) {
            console.log(record, index);
            let isRender = record.id === 123
            let doom = document.querySelectorAll('.ant-table-row-expand-icon-cell')[index]
            this.changeStyle(doom)

            // var div = document.getElementById('div');
            // var width = div.style.width;
            // console.log(div)
            
            // doom.className = ''
            return {
                style: {
                    cursor: 'pointer',
                    // [isRender?'display':'']: 'none'
                },
                on: {
                    // 鼠标移入
                    mouseenter: (event) => {
                        // 兼容IE
                        var ev = event || window.event
                        ev.target.draggable = true
                    },
                    // 开始拖拽
                    dragstart: (event) => {
                        // 兼容IE
                        var ev = event || window.event
                        // 阻止冒泡
                        ev.stopPropagation()
                        // 得到源目标数据
                        this.sourceObj = record
                        this.sourceIndex = index
                    },
                    // 拖动元素经过的元素
                    dragover: (event) => {
                        // 兼容 IE
                        var ev = event || window.event
                        // 阻止默认行为
                        ev.preventDefault()
                    },
                    // 鼠标松开
                    drop: (event) => {
                        // 兼容IE
                        var ev = event || window.event
                        // 阻止冒泡
                        ev.stopPropagation()
                        // 得到目标数据
                        this.targetObj = record
                        this.targetIndex = index
                        let obj = {
                            old: this.sourceIndex,
                            new: this.targetIndex
                        }
                        this.$set(this.data, obj.new, this.sourceObj)
                        this.$set(this.data, obj.old, this.targetObj)
                    }
                }


            }
        },
    }

}
</script>

<style lang="less" scoped>
    .el-item {
        width: 40px;
        border: 1px solid red;
        margin: 2px auto;
        background-color: rgba(23, 234, 123, .2);
    }
</style>