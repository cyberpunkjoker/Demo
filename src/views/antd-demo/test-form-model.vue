<template>
    <div>
        <a-table
            :columns="columns"
            :dataSource="source"
        >
            <div slot="opt">
                <model></model>
            </div>
        </a-table>
    </div>
</template>

<script>
import model from './model'


export default {
    components: { model },
    data() {
        return {
            source: [{id: 1}],
            columns: [
                { title: '礼品编号', dataIndex: 'id' },
                { title: '礼品名称', dataIndex: '' },
                { title: '礼品图片', dataIndex: '' },
                { title: '礼品类别', dataIndex: '' },
                { title: '接待老师', dataIndex: '' },
                { 
                title: '操作',
                scopedSlots: { customRender: 'opt' },
                // customRender: (text, record, index) => {
                //     const detail = <model type={0}></model>
                //     const edit = <a-button type="link" style="padding:0;margin-right:10px">编辑</a-button>
                //     const del = <a-button type="link" style="padding:0;color:red">删除</a-button>
                //     return [detail, edit, del]
                // }
                }
            ],
        }
    },
}
</script>

<style>

</style>