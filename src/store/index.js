import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import auth_app from './modules/auth_app.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    auth_app,
  },
  getters
})