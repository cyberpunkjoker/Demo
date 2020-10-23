<template>
    <div>
        <info-list
            :columns="columns"
            :source="dataSource"
            :pageSettings='pagination'
            :rowKey='rowKey'
            :rowSelection="{
                selectedRowKeys: selectedRowKeys, 
                onChange: onSelectChange,
                onSelect: onSelect,
                onSelectAll: onSelectAll,
                getCheckboxProps: getCheckboxProps
            }"
        >
        </info-list>
    </div>
</template>

<script>
import infoList from '../components/info-list'

export default {
    components: { infoList },
    data() {
        return {
            rowKey: "id",
            pagination: {},
            columns: [
                {title: 'id', dataIndex: 'id'},
                {title: '名字', dataIndex: 'name'},
                {title: '性别', dataIndex: 'gender'},
                {title: '爱好', dataIndex: 'hobby'},
                {title: '年纪', dataIndex: 'old'},
            ],
            dataSource: [
                {id:1,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:2,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:3,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:4,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:5,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:6,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:7,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
                {id:8,name: 'dsada', gender: "dsada",hobby: 'play',old: "12313"},
            ],
            selectedRowKeys: []
        }
    },
    computed: {
        isOver() {
            return this.selectedRowKeys.length > 5
        }
    },
    methods: {
        getCheckboxProps(record) {
            console.log(this.isOver);
            // 被选中元素
            return {
                props: {
                    disabled: this.isOver, 
                    name: record.id + "",
                },
            }
        },
        onSelectAll(selected, selectedRows, changeRows) {
            console.log(selected, selectedRows, changeRows);
            this.getCheckboxProps(record)
        },
        onSelect(record, selected, selectedRows, nativeEvent) {
            console.log(record, selected, selectedRows, nativeEvent);
            this.getCheckboxProps(record)
        },
        onSelectChange(a, b) {
            this.selectedRowKeys = a 
        }
    }
}
</script>

<style>

</style>