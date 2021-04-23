<template>
    <div>
        <div class="title">Sku算法尝试001</div>
        <div>tips：这个感觉是有问题的。应该先穷举出所有可能出现的情况。然后再取并集---之后再尝试一下</div>
        <div 
            v-for="(i, y) in shopTypeList" 
            :key="y"
            class="list-item"
        >
            {{i.title}}:
            <button 
                v-for="(inner, x) in i.list" 
                :key="x"
                :disabled="inner.abled"
                :style="{ color: inner.showColor ? 'red' : '#000' }"
                class="btn-item"
                @click="selectedShop(inner, i.list)"
            >{{inner.name}}</button>
        </div>
    </div>
</template>

<script>
import { subset } from '../../common/tools.js'

export default {
    data() {
        return {
            shopTypeList: [],
            statusCtrlList: [],
            searchName: '',     //查询字段
            myMap: null,    //存储的Map结构方便查询
        }
    },
    mounted() {
        this.getInfo()
        this.searchData()
    },
    methods: {
        // 获取展示列表
        getInfo() {
            this.shopTypeList = [
                { title: "颜色", list: [
                    { name: "红色", abled: false, showColor: false }, 
                    { name: "紫色", abled: false, showColor: false },
                ]},
                { title: "套餐", list: [ 
                    { name: "套餐一", abled: false, showColor: false }, 
                    { name:"套餐二", abled: false, showColor: false }
                ]},
                { title: "内存", list: [
                    { name: "64G", abled: false, showColor: false }, 
                    { name: "128G", abled: false, showColor: false },
                    { name: "256G", abled: false, showColor: false }
                ]}
            ]

            // 查询数据
            this.searchList = {
                '红色,套餐一,64G': { num: 0, price: 110 },
                '红色,套餐一,128G': { num: 0, price: 120 },
                '红色,套餐一,256G': { num: 0, price: 130 },
                '红色,套餐二,64G': { num: 1, price: 140 },
                '红色,套餐二,128G': { num: 1, price: 150 },
                '红色,套餐二,256G': { num: 0, price: 160 },
                '紫色,套餐一,64G': { num: 1, price: 10 },
                '紫色,套餐一,128G': { num: 1, price: 160 },
                '紫色,套餐一,256G': { num: 0, price: 170 },
                '紫色,套餐二,64G': { num: 1, price: 108 },
                '紫色,套餐二,128G': { num: 0, price: 180 },
                '紫色,套餐二,256G': { num: 1, price: 190 },
            }
            let obj = this.searchList
            // 使用map数据结构
            let map = new Map()
            Object.entries(obj).forEach(i=>{
                let key = i[0].split(',')
                map.set(key, i[1])
            })
            this.myMap = map
        },
        // 判断颜色展示 && 匹配查询字段
        selectedShop(item, list) {
            item.showColor = !item.showColor
            // 保持同一类只能选择一个元素
            list.forEach(i => {
                i.name !== item.name && (i.showColor = false)
            })
            let str = ''
            //组装查询字段，重置禁用状态
            this.shopTypeList.forEach(out=>{
                out.list.forEach(inner=>{
                    inner.showColor && (str += ',' + inner.name)
                    inner.abled = false
                })
            })
            this.searchName = str.slice(1)
            this.searchData()
        },
        // 查询数据 
        searchData() {
            let map = this.myMap
            let searchArr = this.searchName.split(',')
            //筛选过后的map结构 && num===0时的数组
            let outLayerMap = new Map()
            let isEmptyArr = []
            for (let key of map.keys()) {
                if (subset(key, searchArr)) {
                    outLayerMap.set(key, map.get(key))
                    outLayerMap.get(key).num === 0 && isEmptyArr.push(key)
                }
            }
            if (searchArr.length === 1) return
            if (searchArr.length === this.shopTypeList.length) {
                this.finAble(searchArr)
            }
            isEmptyArr.forEach(out=>{
                out.forEach(inner=>{
                    !searchArr.includes(inner) && this.btnIsAble(inner)
                })
            })
        },
        // 最后禁用非选中的全部
        finAble(arr) {
            this.shopTypeList.forEach(out => {
                out.list.some(inner => {
                    !arr.includes(inner.name) && (inner.abled = true)
                })
            })
        },
        // 控制按钮是否可点击
        btnIsAble(name) {
            this.shopTypeList.forEach(out => {
                out.list.some(inner => {
                    inner.name === name && (inner.abled = true)
                })
            }) 
        }
        
    }
}
</script>

<style scoped>
.list-item {
    margin-bottom: 10px;
}
.btn-item {
    margin-right: 5px;
}
.title {
    margin: 10px;
    text-align: left;
    position: relative;
    padding-left: 10px;
    font-size: 18px;
    color: #000;
}
.title::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    border-radius: 5px;
    background: aqua;
}

</style>