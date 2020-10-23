import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/video/index.vue'
import Message from '../views/message/index.vue'
import Antd from '../views/antd.vue'
import Drag from '../views/draggable.vue'
import Table from '../views/table-test.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
