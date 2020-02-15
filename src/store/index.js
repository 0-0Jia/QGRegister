import Vue from 'vue'
import Vuex from 'vuex'
import submit from '@/store/modules/submitModules';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    manager: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    submit
  }
})
