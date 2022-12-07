import { createStore } from 'vuex'

export default createStore({
  state: {
    requestUrl: 'api',
    userInfo:null,
    token:null

  },
  mutations: {
    handleChangeUser(state, TheUser) {
      state.userInfo=TheUser
    },
    handleChangeToken(state, token) {
      state.token=token
    },



  },
  actions: {
  },
  modules: {
  }
})
