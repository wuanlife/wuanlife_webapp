import axios from 'axios'
import util from '../util'
import store from '../vuex/store'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//自定义axios实例
var axiosWuan = axios.create({
  baseURL: 'http://47.88.58.119:800/',
  timeout: 5000,
})
//request拦截器
axiosWuan.interceptors.request.use(function (config) {
  if (localStorage.getItem("user") != undefined) {
    config.headers['Access-Token'] = JSON.parse(localStorage.getItem("user"))['Access-Token'] || '';
  }
  if (store.state.token !== '') {
    config.headers['Access-Token'] = store.state.token || '';
  }
  if(config.method === 'post'){
    config.headers['Content-Type'] = config.headers.post['Content-Type'];
  }
  if(config.method === 'put'){
    config.headers['Content-Type'] = config.headers.post['Content-Type'];
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
//response拦截器
axiosWuan.interceptors.response.use(function (response) {
  if (response.status == 200) {
    console.log("请求成功： "+response.data)
    return response.data
  }
  if (response.status == 204) {
   return {}
  }
},function (error) {
  return Promise.reject(error)
})

export default axiosWuan
