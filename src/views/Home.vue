<template>
  <div class="home">
    <div class="auth-name">cyberpunkjill</div>
    <!-- 井字棋 小demo -->
    <!-- <ticTacToe></ticTacToe> -->
    <!-- 扫雷 小demo -->
    <!-- <mineClearance></mineClearance> -->
    <!-- 2048 小demo -->
    <!-- 先暂时搁浅，看点算法的东西的 -->
    <!-- <game2048></game2048> -->
    <!-- 俄罗斯方框 -->
    <Tetris></Tetris>
  </div>
</template>

<script>
import ticTacToe from './demos/TicTacToe'
import mineClearance from './demos/mineClearance'
import game2048 from './demos/game2048'
import Tetris from './demos/Tetris'

export default {
  name: 'Home',
  components: {
    ticTacToe,
    mineClearance,
    game2048,
    Tetris
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
