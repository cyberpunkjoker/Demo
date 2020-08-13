<template>
  <div class="container">
    <!-- 井字棋 -->
      <div class="checker-board">
        <div class="board-row" v-for="(item,idx) in matrix" :key="idx">
          <div class="board-col" v-for="(el,i) in item" :key="i"
            @click="toSelected(idx, i)"
          >
            <!-- 选手1： X标识 -->
            <div v-if="whichPlayer(el) === 1" class="symbol-x">
              <div class="left"></div>
              <div class="right"></div>
            </div>
            <!-- 选手2： O标识 -->
            <div v-if="whichPlayer(el) === 2" class="symbol-o"></div>
          </div>
        </div>
      </div>
    <button v-if="isOver" @click="clear">结束</button>
  </div>
</template>

<script>

const initMatrix = [
  [{ role: 'none', status: false }, { role: 'none', status: false }, { role: 'none', status: false }],
  [{ role: 'none', status: false }, { role: 'none', status: false }, { role: 'none', status: false }],
  [{ role: 'none', status: false }, { role: 'none', status: false }, { role: 'none', status: false }]
]
export default {
  data () {
    return {
      matrix: [
        [{ role: 'none', status: false }, { role: 'none', status: false }, { role: 'none', status: false }],
        [{ role: 'none', status: false }, { role: 'none', status: false }, { role: 'none', status: false }],
        [{ role: 'none', status: false }, { role: 'none', status: false }, { role: 'none', status: false }]
      ],
      count: 0, // 奇数1玩家，偶数2玩家
      isOver: false
    }
  },
  methods: {
    // 选择单个元素部分
    toSelected (x, y) {
      if (!this.matrix[x][y].status && !this.isOver) {
        let role = ''
        this.count += 1
        this.matrix[x][y].status = true
        this.count % 2 === 0 ? role = 2 : role = 1
        this.matrix[x][y].role = role
        if (this.count > 2) {
          this.winner(1)
          this.winner(2)
        }
      }
    },
    // 判断是哪个玩家 1 or 2
    whichPlayer (el) {
      if (el.status === true && el.role === 1) return 1
      if (el.status === true && el.role === 2) return 2
    },
    // 获胜判断
    winner (i) {
      // 纵向
      this.matrix.every(item => item[0].role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      this.matrix.every(item => item[1].role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      this.matrix.every(item => item[2].role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      // 横向
      this.matrix[0].every(item => item.role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      this.matrix[1].every(item => item.role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      this.matrix[2].every(item => item.role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      // 对角线
      this.matrix.every((item, idx) => item[idx].role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      this.matrix.every((item, idx) => item[2 - idx].role === i) && (this.isOver = true) && alert(`玩家${i}获胜`)
      // 判断平局
      this.matrix.flat().every(el => el.status === true) && !this.isOver && (this.isOver = true) && alert('平局')
    },
    // 清除数据
    clear () {
      this.matrix = JSON.parse(JSON.stringify(initMatrix))
      this.isOver = false
      this.count = 0
    }
  }
}
</script>

<style lang='less' scoped>
// div {  // 写在全局里面
//   box-sizing: border-box;
// }
.container {
  /* 井字棋样式 */
  .checker-board {
    display: inline-block;
    margin: 100px auto;
    border: 1px solid #000;
    .board-row {
      display: flex;
      .board-col {
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        /** X样式 */
        .symbol-x {
          .left {
            height: 100px;
            width: 4px;
            background-color: #000;
            transform: translate(48px,0) rotate(45deg)
          }
          .right {
            height: 100px;
            width: 4px;
            background-color: #000;
            transform: translate(48px,-100px) rotate(135deg)
          }
        }
        /** O样式 */
        .symbol-o {
          width: 100px;
          height: 100px;
          border: 4px solid #000;
          border-radius: 50% 50%;
        }
      }
    }
  }
}
</style>
