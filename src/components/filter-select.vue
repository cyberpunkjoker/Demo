<template>
    <div>
        <div 
            style="margin-bottom: 16px"
            v-for="(outer, y) in selectList"
            :key="y"
        >
            <a-input
                v-model="form[outer.key]"
                @blur="onBlur"
                :disabled="!hasSelected[y]"
                :placeholder="outer.tips"
            >
                <a-select 
                    slot="addonBefore"
                    placeholder="请选择"
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
        },
    },
    data() {
        return {
            // 记录每个 select 选中的元素
            hasSelected: {},
            // input 个数 
            selectList: [],
            // 计算出来的 展示数组
            displayList: this.filterList,
            // 上传表单
            form: {}
        }
    },
    mounted() {
        this.initSelected()
    },
    methods: {
        // 初始化
        initSelected() {
            let length = this.filterList.length
            for (let i = 0; i < length; i++) {
                this.hasSelected[i] = ''
                this.form[this.filterList[i].key] = undefined
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
                if (i.label === value) {
                    this.selectList[y] = { key: i.key, tips: i.tips}
                }
            })
            let arr = Object.values(this.hasSelected)
            this.displayList = this.filterList.filter(item => {
                let isTure = arr.some(inner=>inner === item.label)
                return !isTure
            })
        },
        onBlur() {
            this.$emit('postSelectedInfo', this.form)
        }
    }
}
</script>

<style>

</style>