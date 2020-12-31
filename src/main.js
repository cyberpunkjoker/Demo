import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './libs/ant-design-use'
import 'ant-design-vue/dist/antd.css';

let echarts = require('echarts')
// 全局挂载组件
import './components/global'

// 全局挂载 echarts
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
