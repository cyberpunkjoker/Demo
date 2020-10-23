<template>
    <div>
        <div 
            style="margin-bottom: 16px"
            v-for="(outer, y) in selectList"
            :key="y"
        >
            <a-input
                v-model="form[outer]"
            >
                <a-select 
                    slot="addonBefore"
                    placeholder="选择"
                    style="width: 90px"
                    @change="toSelectedItem($event, y)"
                >
                    <a-select-option 
                        v-for="(item, x) in displayList"
                        :value="item.label"
                        :key="x"
                    >
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </a-input>
        </div>
        <p @click="addNew">点击</p>
    </div>
</template>

<script>
export default {
    name: "filter-select",
    props : {
        filterList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // 记录每个 select 选中的元素
            hasSelected: {},
            // input 个数
            selectList: [],
            // 展示数组
            displayList: this.filterList,
            // 上传表单
            form: {}
        }
    },
    mounted() {
        this.initSelected()
    },
    methods: {
        // 初始化选中项
        initSelected() {
            let length = this.filterList.length
            for (let i = 0; i < length; i++) {
                this.hasSelected[i] = ''
                this.form[this.filterList[i].key] = 'sdsds'
            }
            this.selectList.push(1)
        }, 
        addNew() {
            let isTure = this.selectList.length < this.filterList.length
            isTure && this.selectList.push(1)
        },
        toSelectedItem(value, y) {
            this.hasSelected[y] = value
            this.filterList.forEach(i => {
                i.label === value && (this.selectList[y] = i.key)
            })
            let arr = Object.values(this.hasSelected)
            this.displayList = this.filterList.filter(item => {
                let isTure = arr.some(inner=>inner === item.label)
                return !isTure
            })

        },
    }
}
</script>

<style>

</style>