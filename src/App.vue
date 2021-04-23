<template>
  <a-config-provider :locale="locale">
        <div id='app'>
            <router-view/>
        </div>
    </a-config-provider>
</template>

<script>
// 组件提示文本中文设置
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'

moment.locale('zh-cn')
export default {
    data() {
        return {
            locale: zhCN
        }
    },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
div {
  box-sizing: border-box;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
