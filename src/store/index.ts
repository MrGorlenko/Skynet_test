import Vue from 'vue'
import Vuex from 'vuex'
import Steps from '@/store/steps'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Steps
  }
})
