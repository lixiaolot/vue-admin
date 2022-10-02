import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//状态管理器
export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
  },
  mutations: {
    SET_TOKEN: (state,token) =>{
      state.token = token
      localStorage.setItem("token",token)
    }
  },
  actions: {
  },
  modules: {
  }
})
