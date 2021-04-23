import Vue from 'vue'
import Vuex from 'vuex'

import testMessage from './test-message'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'index content'
  },
  mutations: {
    setMessage(state, value) {
      state.message = 'index页面的值'
    }
  },
  actions: {
  
  },
  modules: {
    tm: testMessage
  },
})
