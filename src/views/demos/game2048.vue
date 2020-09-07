<template>
  <div>
    <p>请使用WASD进行上下左右移动哦~</p>
    <div class="matrixfield">
      <div class="matrixfield-row" v-for="(rowItem,i) in matrix" :key="i">
        <div
          v-for="(colItem, x) in rowItem"
          :key="x"
          :class="colItem.value!==0?'matrixfield-col':'matrixfield-col has-number'"
        >{{colItem.value!==0?colItem.value:''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matrix: [],
      form: {
        row: 4,
        col: 4
        // num: 2 // 初始化时出现的值
      }
    }
  },
  created() {
    this.initMatrix()
    window.addEventListener('keyup', this.listenKey)
  },
  methods: {
    initMatrix(num = 2) {
      let { row, col } = this.form
      let randomArr = [] // 存储 除重后的 随机数
      this.matrix = new Array(row)
        .fill('')
        .map((a, y) => new Array(col).fill('').map((b, x) => (a = { value: 0, x, y })))
      // 随机选中两个元素的值为2
      do {
        let x = Math.floor(Math.random() * row)
        let y = Math.floor(Math.random() * col)
        let initValue = Math.floor(Math.random() * 2) // 初始值为 2 或 4 中的一个
        let arr = [2, 4]
        randomArr.push(`${x}-${y}`)
        this.matrix[x][y].value = arr[initValue]
      } while ([...new Set(randomArr)].length < num)
    },
    listenKey(e) {
      console.log(e.key)
      if (e.key === 'a' || e.key === 'A') this.moveMatrix('col', -1)
      if (e.key === 's' || e.key === 'S') this.moveMatrix('row', 1)
      if (e.key === 'd' || e.key === 'D') this.moveMatrix('col', 1)
      if (e.key === 'w' || e.key === 'W') this.moveMatrix('row', -1)
    },
    moveMatrix(type, key) {
      let { row, col } = this.form
      let matrix = this.matrix
      if (type === 'col') {
        matrix.forEach((row, y) => {
          // debugger
          key === 1
            ? row.forEach((colItem, x) => {  // 向右 
                if (colItem.value !== 0) {
                  if (x + key > 3 || x + key < 0) return
                  if (matrix[y][x + key].value!== 0) return
                  matrix[y][x + key].value = matrix[y][x].value
                  matrix[y][x].value = 0
                }
              })
            : row.reverse().forEach((colItem, x) => {  // 向左
                if (colItem.value !== 0) {
                  if (x + key > 3 || x + key < 0) return
                  if (matrix[y][x + key].value!== 0) return
                  matrix[y][x + key].value = matrix[y][x].value
                  matrix[y][x].value = 0
                }
              })
        })
      }
      if (type==='row') {
        key===1
          ? matrix.forEach((row,y)=>{
            row.forEach((colItem,x)=>{
               if (colItem.value !== 0) {
                  if (y + key > 3 || y + key < 0) return
                  matrix[y + key][x].value = matrix[y][x].value
                  matrix[y][x].value = 0
                }
            })
          })
          : matrix.reverse().forEach((row,y)=>{
            row.forEach((colItem,x)=>{
               if (colItem.value !== 0) {
                  if (y + key > 3 || y + key < 0) return
                  matrix[y+key][x].value = matrix[y][x].value
                  matrix[y][x].value = 0
                }
            })
          })
      }
    },


  }
}
</script>

<style lang="less" scoped>
.matrixfield {
  display: inline-block;
  margin: 0 auto;
  border: 3px solid #bbada0;
  .matrixfield-row {
    display: flex;
  }
  .matrixfield-col {
    width: 100px;
    height: 100px;
    line-height: 100px;
    background-color: rgba(238, 228, 218, 0.35);
    font-size: 40px;
    border: 3px solid #bbada0;
  }
  .has-number {
    background-color: #eee4da;
  }
}
</style>