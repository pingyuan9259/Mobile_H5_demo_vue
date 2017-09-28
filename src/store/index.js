// vuex配置

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as accountAction from '../actions/accountAction'
import * as courseAction from '../actions/courseAction'
import * as userAction from '../actions/userAction'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions: {
    ...accountAction,
    ...courseAction,
    ...userAction
  },
  getters,
  mutations,
  strict: debug
})
