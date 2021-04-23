export default {
  // namespace: true,
  state: { //设置全局访问的state对象
    message: 'first of all'
  },
  mutations: {
    setMessage(state, value) {
      state.message = value || ''
      // console.log(state.message);
    },
  },
  actions: {
      
  },
  getters: {

  }
}