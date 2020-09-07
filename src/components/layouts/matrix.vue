<template>
  <div class="matrixfield">
    <div class="matrixfield-row" v-for="(rowItem,i) in matrixList" :key="i">
      <div
        v-for="(colItem, x) in rowItem"
        :key="x"
        @click="selectedmatrix(i, x)"
        @contextmenu.prevent="selectedFlag(i,x)"
        class="matrixfield-col"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 点击元素事件
    selectedmatrix: {
      type: Function,
      default: () => {}
    },
    // 鼠标右键事件
    selectedFlag: {
      type: Function,
      default: () => {}
    },
    // 矩阵二维数据
    matrixList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    
    }
  }
}
</script>

<style lang="less" scoped>
.matrixfield {
  display: inline-block;
  margin: 0 auto;
  border: 1px solid #000;
  .matrixfield-row {
    display: flex;
  }
  .matrixfield-col {
    width: 100px;
    height: 100px;
    line-height: 40px;
    background-color: rgba(238, 228, 218, 0.35);
    margin: 1px;
    border: 1px solid #000;
  }
}
</style>