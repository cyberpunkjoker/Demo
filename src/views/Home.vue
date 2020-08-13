<template>
  <div class="home">
    <div class="auth-name">cyberpunkjill</div>
    <!-- 井字棋 小demo -->
    <ticTacToe></ticTacToe>
    <!-- 扫雷 小demo -->
    <mineClearance></mineClearance>
  </div>
</template>

<script>
import ticTacToe from './demos/TicTacToe'
import mineClearance from './demos/mineClearance'

export default {
  name: 'Home',
  components: {
    ticTacToe,
    mineClearance
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  padding-top: 20px;
  .auth-name {
    margin: 0 20px;
    font-size: 40px;
    text-shadow: 5px 5px 5px #eee;
    text-align: center;
    border-radius: 20px;
    background-image: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
    box-shadow: 10px 10px 5px #888888;
  }
}
</style>
