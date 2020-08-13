<template>
  <div>
    <!-- 游戏结束提示文本 -->
    <div v-if="isOver">
      <p>比赛结束</p>
      <button>从新开始</button>
    </div>
    <div v-if="win">
      <p>you are winner!!!!</p>
      <button>再来一盘</button>
    </div>
    <!-- 按钮模块 -->
    <!-- 游戏区域 -->
    <div class="minefield">
      <div class="minefield-row" v-for="(rowItem,i) in minefieldList" :key="i">
        <div
          v-for="(colItem, x) in rowItem"
          :key="x"
          @click="selectedMine(i, x)"
          :class="colItem.selected?'minefield-col selected':'minefield-col'"
        >
          <!-- {{colItem.hasmine?'💣':''}} -->
          {{colItem.hasmine?'💣': colItem.around}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minefieldList: [],
      form: {
        row: 10, // 列
        col: 5, // 行
        num: 10 // 炸弹数目
      },
      isOver: false, // 判断游戏是否失败
      sum: 0, // 选择的非炸弹元素个数
      win: false // 判断游戏是否取得胜利
    }
  },
  created() {
    this.selectedLevel(10, 5)
    console.log(this.minefieldList)
    this.boom(10)
    this.mineNumOfAround()
  },
  methods: {
    //  随机选中雷元素
    boom() {
      let { row, col, num } = this.form
      let mineList = []
      do {
        let x = Math.floor(Math.random() * row)
        let y = Math.floor(Math.random() * col)
        mineList.push(`${x}-${y}`)
        this.minefieldList[x][y].hasmine = true
      } while ([...new Set(mineList)].length < num)
    },
    //  定义雷区大小
    selectedLevel() {
      let { row, col } = this.form
      this.minefieldList = new Array(row)
        .fill('')
        .map(i => new Array(col).fill('').map(c => (c = { selected: false, around: 0, hasmine: false })))
    },
    // 判断安全区域周围的地雷个数
    mineNumOfAround() {
      let { row, col, num } = this.form
      this.minefieldList.forEach((el, x) => {
        el.forEach((i, y) => {
           this.addAround(x,y,i)
        })
      })
    },
    // 周围一圈的雷添加
    addAround(x,y,i) {
      let {row, col} = this.form
      // 右
      y + 1 < col-1 && this.minefieldList[x][y + 1].hasmine && (i.around += 1)
      // 左
      y - 1 > 0 && this.minefieldList[x][y - 1].hasmine && (i.around += 1)
      // 上
      x + 1 < row-1 && this.minefieldList[x + 1][y].hasmine && (i.around += 1)
      // 下
      x - 1 > 0 && this.minefieldList[x - 1][y].hasmine && (i.around += 1)
      // 左上
      x + 1 < row-1 && y - 1 > 0 && this.minefieldList[x + 1][y - 1].hasmine && (i.around += 1)
      // 右上
      x + 1 < row-1 && y + 1 < col-1 && this.minefieldList[x + 1][y + 1].hasmine && (i.around += 1)
      // 左下
      x - 1 > 0 && y - 1 > 0 && this.minefieldList[x - 1][y - 1].hasmine && (i.around += 1)
      // 右下
      x - 1 > 0 && y + 1 < col-1 && this.minefieldList[x - 1][y + 1].hasmine && (i.around += 1)
    },
    // 选中雷区元素
    selectedMine(x, y) {
      let { row, col, num } = this.form
      if (!this.isOver) {
        this.minefieldList[x][y].selected = true
        if (this.minefieldList[x][y].hasmine) {
          this.isOver = true
          return
        }
        this.minefieldList.forEach(el => {
          el.forEach(i => i.selected && !i.hasmine && (this.sum += 1))
        })
        this.sum === col * row - num && (this.win = true)
        // 清空每次的循环的累计次数
        this.sum = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.minefield {
  display: inline-block;
  margin: 0 auto;
  border: 1px solid #000;
  .minefield-row {
    display: flex;
  }
  .minefield-col {
    width: 40px;
    height: 40px;
    background-color: skyblue;
    border: 1px solid #000;
  }
  .selected {
    background-color: #fff;
  }
}
</style>