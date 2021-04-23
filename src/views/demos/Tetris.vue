<template>
    <div class="tetris-fields">
        <div 
            v-for="(row,y) in tetrisList"
            :key="y"    
            class="tetris-row"
        >
            <div
                v-for="(col, x) in row"
                :key="x"
                :style="{ background: col.itemColor}"
                class="tetris-col"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            row: 18,
            col: 10,
            tetrisList: [],
            gameRound: false, //控制每一次开始与降落
            currentPosition: [], //记录下落方块当前位置
            currentColor: [],   //记录下落方块颜色
            currentType: '',    //记录是那种形状
            moveRight: false,
            moveLeft: false,
            speedUp: false,
            translate: false, //汽车人变形
            steep: 1, //变形阶段
        }
    },
    computed: {},
    watch: {
        gameRound(val) {
            !val && this.start()
        }
    },
    mounted() {
        this.makeTetrisFields()
        this.start()
        window.addEventListener('keyup', this.move)
    },
    methods: {
        // 制作游玩区域
        makeTetrisFields() {
            let arr = []
            for (let y = 0; y < this.row; y++) {
                arr[y] = []
                for (let x = 0; x < this.col; x++) {
                    arr[y][x] = {
                        hasItem: false,     //格子内是否存在元素 -> 元素停止移动后判断
                        itemColor: "#fff",  //当前格子颜色
                    }
                }
            }
            this.tetrisList = arr
        },
        // 制作下落俄罗斯方块
        start() {
            this.gameRound = true
            this.shapeOfTetris()
        },
        // 制作俄罗斯方块的形状
        shapeOfTetris() {
            // 决定初始位置 指 第一行的第一个元素
            let middle = Math.floor(this.col / 2) - 1   
            let I = [
                {y: 0, x: middle},
                {y: 1, x: middle},
                {y: 2, x: middle},
                {y: 3, x: middle},
            ] // i形状
            let S = [
                {y: 0, x: middle},
                {y: 0, x: middle + 1},
                {y: 1, x: middle - 1},
                {y: 1, x: middle},
            ] // s形状
            let Z = [
                {y: 0, x: middle - 1},
                {y: 0, x: middle},
                {y: 1, x: middle},
                {y: 1, x: middle + 1},
            ]// z形状
            let L = [
                {y: 0, x: middle},
                {y: 1, x: middle},
                {y: 2, x: middle},
                {y: 2, x: middle + 1},
            ]// l形状
            let J = [
                {y: 0, x: middle},
                {y: 1, x: middle},
                {y: 2, x: middle},
                {y: 2, x: middle - 1},
            ] //j形状
            let T = [
                {y: 0, x: middle - 1},
                {y: 0, x: middle},
                {y: 0, x: middle + 1},
                {y: 1, x: middle},
            ]
            const randomNum = Math.floor(Math.random()*6 + 1)
            const obj = {
                1: {shape: I, type: 'i'},
                2: {shape: S, type: 's'},
                3: {shape: Z, type: 'z'},
                4: {shape: L, type: 'l'},
                5: {shape: J, type: 'j'},
                6: {shape: T, type: 't'}
            }
            // this.currentPosition = obj[randomNum].shape
            // this.currentType = obj[randomNum].type
            // // 传入随机形状
            // this.setRandomColor(obj[randomNum].shape)
            this.currentPosition = I
            this.currentType = 'i'
            // 传入随机形状
            this.setRandomColor(I)
        },
        // 上色
        setRandomColor(shape, color) {
            let arr = ['0','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f']
            if(!color) {
                color = '#'
                for (let i = 0; i < 6; i++) {
                    let num = Math.floor(Math.random()*arr.length)
                    color += arr[num]
                }
            }
            this.currentColor = color
            shape.forEach(i=>this.tetrisList[i.y][i.x].itemColor = color) 
            this.autoDown(shape, color)
        },
        // 向下移动
        autoDown(arr, color, time = 1000 / 10) {
            if (this.isTouchBottom(arr)) {
                this.changeStatus(arr)
                this.gameRound = false
                return
            }
            if (this.speedUp) { time = 100; this.speedUp = false}
            setTimeout(()=>{
                this.clearColor(arr)
                arr.forEach(i=>i.y = i.y+1)
                if (this.moveRight) this.right(arr, color)
                if (this.moveLeft) this.left(arr, color)
                if (this.translate) this.toTransform(arr, color)
                this.setRandomColor(arr, color)
            },time)
        },
        // 清除颜色
        clearColor(arr) {
             arr.forEach(i=>this.tetrisList[i.y][i.x].itemColor = '#fff') 
        },
        // 设置已占位元素
        changeStatus(arr) {
            arr.forEach(i=>this.tetrisList[i.y][i.x].hasItem = true)
        },
        // 判断是否触底
        isTouchBottom(arr) {
            //最底层无元素的时候的判断
            let sort = arr.map(i=>i.y).sort((a, b)=> a-b)
            let len = sort.length - 1
            if (sort[len] === this.row - 1) return true
            //最底层有元素的判定
            return arr.some(i => {
                // 每一个元素下面一格是否 已经被占有
                return this.tetrisList[i.y + 1][i.x].hasItem === true
            })
        },
        // // 判断是否到达左右两边位置
        // isTouchAround(arr) {
        //     let sort = arr.map(i=>i.x).sort((a, b)=> a-b)
        //     let len = sort.length - 1
        //     if (sort[len] === this.col - 1) return true
        //     if (sort[0] === 0) return true
        //     return arr.some(i => {
        //         //右边到头
        //         let rightEdge = this.tetrisList[i.y][i.x + 1].hasItem === true
        //         //左边到头
        //         let leftEdge = this.tetrisList[i.y][i.x - 1].hasItem === true
        //         return (rightEdge || leftEdge) ? true : false   // true 表示到头了
        //     })
        // },
        // 是否达到右边缘
        isTouchRight(arr) {
            let sort = arr.map(i=>i.x).sort((a, b)=> a-b)
            let len = sort.length - 1
            if (sort[len] === this.col - 1) return true
            return arr.some(i => {
                //右边到头
                return this.tetrisList[i.y][i.x + 1].hasItem === true
            })
        },
        // 是否达到左边缘
        isTouchLeft(arr) {
            let sort = arr.map(i=>i.x).sort((a, b)=> a-b)
            if (sort[0] === 0) return true
            return arr.some(i => {
                //左边到头
                return this.tetrisList[i.y][i.x - 1].hasItem === true
            })
        },
        // 移动操作
        move(e) {
            const obj = {
                ArrowLeft: () => this.moveLeft = true,
                ArrowRight: () => this.moveRight = true,
                ArrowUp: () => this.translate = true,
                ArrowDown: () => this.speedUp = true
            }
            obj[e.key] && obj[e.key]()
        },
        right(arr, color) {
            if (this.isTouchRight(arr)) return
            arr.forEach(i=>i.x = i.x+1)
            this.moveRight = false
        },
        left(arr, color) {
            if (this.isTouchLeft(arr)) return
            arr.forEach(i=>i.x = i.x-1)
            this.moveLeft = false
        },
        toTransform(arr, color) {
            this.currentType
            // 两种情况 两种形态 四种形态的
            let isTwoTypes = ['i', 's', 'z'].includes(this.currentType)
            let isFourTypes = ['l', 'j', 't'].includes(this.currentType)
            let baseItem;
            if (isTwoTypes) {
                this.steep >= 2 ? this.steep = 1 : this.steep++
                //此时以第一个元素为轴心旋转
                baseItem = arr[0]
            }
            if (isFourTypes) {
                this.steep >= 4 ? this.steep = 1 : this.steep++
                //此时以第二个元素为轴心旋转
                baseItem = arr[1]
            }
            let obj = {
                i: {
                    1: [
                        { ...baseItem },
                        { y: baseItem.y, x: baseItem.x + 1},
                        { y: baseItem.y, x: baseItem.x + 2},
                        { y: baseItem.y, x: baseItem.x + 3}
                    ],
                    2: [
                        { ...baseItem },
                        { y: baseItem.y + 1, x: baseItem.x},
                        { y: baseItem.y + 2, x: baseItem.x},
                        { y: baseItem.y + 3, x: baseItem.x},
                    ]
                },
                s: {
                    1: [
                        // { ...baseItem },
                        // { x: baseItem.x , y: baseItem.y-1},
                        // { x: baseItem.x+1 , y: baseItem.y+1},
                        // { x: baseItem.x+1 , y: baseItem.y},
                    ],
                    2: [
                        { ...baseItem },
                        { x: baseItem.x , y: baseItem.y-1},
                        { x: baseItem.x+1 , y: baseItem.y+1},
                        { x: baseItem.x+1 , y: baseItem.y},
                    ]
                },
                z: {
                    1: [],
                    2: []
                },
                l: {},
                j: {},
                t: {}
            }   
            // let newArr = obj[this.currentType][this.steep]
            // this.setRandomColor( newArr, color)
            // this.clearColor(arr)
        }
    }
}
</script>

<style lang="less" scoped>
    @borderColor: #000;
    
    .tetris-fields {
        display: inline-block;
        margin: 20px auto;
        border: 1px solid @borderColor;
        .tetris-row {
            height: 10px;
            .tetris-col {
                float: left;
                box-sizing: border-box;
                width: 30px;
                height: 30px;
                border: 1px dashed #ccc;
            }
            
        }
    }
</style>