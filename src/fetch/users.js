import axios from 'axios'
import util from '../util'
import store from '../vuex/store'
import fetchWuan from './fetchWuan'

//消息接口
export function getAllMessages (id, params) {
  return fetchWuan({
    url: `/users/${id}/messages?offset=${params.offset}&limit=${params.limit}&type=${params.type}`,
    method: 'get',
  })
}

//获取单个用户信息
export function getSingleUser (id) {
  return fetchWuan({
    url: `/users/${id}`,
    method: 'get',
  })
}

//修改用户密码
export function changeUserPassword (id, params) {
  return fetchWuan({
    url: `/users/${id}/password`,
    method: 'put',
    data: params
  })
}

//用户邀请码
export function getUserInv (id) {
  return fetchWuan({
    url: `/users/${id}`,
    method: 'get',
  })
}

//找回密码
export function getUserPassword (mail) {
  return fetchWuan({
    url: `/users/resetpsw`,
    method: 'post',
    data: {
      mail: mail
    }
  })
}

//设置密码
export function setUserPassword (password, token) {
  return fetchWuan({
    url: `/users/resetpsw`,
    method: 'put',
    params: {
      token: token,
      password: password
    }
  })
}

//注册
export function signUp (params) {
  return fetchWuan({
    url: `/users`,
    method: 'post',
    data: params
  })
}

//登录
export function login (params) {
  return fetchWuan({
    url: `/users/signin`,
    method: 'post',
    data: params
  })
}

//修改用户信息
export function changeUserInfo (id,params) {
  return fetchWuan({
    url: `/users/${id}`,
    method: 'put',
    data: params
  })
}