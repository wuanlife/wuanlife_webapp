import Vue from 'vue'
import Vuex from 'vuex'
import util from '@/util'
import { SET_INTERVAL } from './mutation-types'
import { PRODUCE_FOOD } from './mutation-types'
import { PRODUCE_FARMER } from './mutation-types'
//import * as actions from './actions'
// 导入各个模块的初始状态和 mutations
//import cart from './modules/cart'
import user from './modules/user'
import music from './modules/music'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    
  },
  modules: {
    user,
    music,
  },
})

export default store