import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import util from '@/util'
import { SET_INTERVAL } from './mutation-types'
import { PRODUCE_FOOD } from './mutation-types'
import { PRODUCE_FARMER } from './mutation-types'
import api from '../fetch/api'
import { login } from '../fetch/users'
//import * as actions from './actions'
// 导入各个模块的初始状态和 mutations
//import cart from './modules/cart'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    searchContent: '',
    postContent: {},
    postEditContent: {},
  },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    LOGOUT_USER: (state) => {
      state.userInfo = {}
    },
    LOGOUT_TOKEN: (state) => {
      state.token = ''
    },
    SET_SEARCH: (state, params) => {
      state.searchContent = params
    },
    SET_POSTCONTENT: (state, params) => {
      state.postContent = params
    },
    SET_POSTEDITCONTENT: (state, params) => {
      state.postEditContent = params
    },
  },
  modules: {
    user
  },
  actions: {
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          commit('SET_TOKEN', response['Access-Token'])
          commit('SET_USERINFO', response)
          localStorage.setItem("user",JSON.stringify(response))
          console.log("登录成功：　"+ response)
          router.push({
            path: '/',
            query: {title: '主页'}
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT_USER')
        commit('LOGOUT_TOKEN')
        localStorage.removeItem("user")
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    Search ({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_SEARCH', params.serText)
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    SignUp ({ commit }, params) {
      commit('SET_TOKEN', params['Access-Token'])
      commit('SET_USERINFO', params)
    },
    setPostContent ({ commit }, params) {
      commit('SET_POSTCONTENT', params)
    },
    setPostEditContent ({ commit }, params) {
      commit('SET_POSTEDITCONTENT', params)
    },
  }
})

export default store