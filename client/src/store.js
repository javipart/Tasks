import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    //Cambian el estado
    newToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    //Llaman las mutaciones
    newUser({commit, state}, newUser) {
      commit('newToken', newUser);
    }
  },
  getters: {
    //Retorna los datos
    getState(state) {
      return state.token;
    },
    isLogin(state) {
      if (state.token !== '') {
        return true;
      }
      return false;
    }
  },
})
