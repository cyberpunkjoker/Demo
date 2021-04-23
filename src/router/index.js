import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/video/index.vue'
import Message from '../views/message/index.vue'
import Antd from '../views/antd.vue'
import Drag from '../views/draggable.vue'
import Table from '../views/table-test.vue'
import Echarts from '../views/echarts/index.vue'

import Idea from '../views/idea/test1.vue'
import antDemo from '../views/antd-demo/index.vue'

import algorithms from '../views/algorithms/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/antd',
    name: 'Antd',
    component: Antd
  },
  {
    path: '/drag',
    name: 'Drag',
    component: Drag
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/idea',
    name: 'idea',
    component: Idea
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: Echarts
  },
  {
    path: '/antdemo',
    name: 'antdemo',
    component: antDemo
  },
  {
    path: '/algorithms',
    name: 'algorithms',
    component: algorithms
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
