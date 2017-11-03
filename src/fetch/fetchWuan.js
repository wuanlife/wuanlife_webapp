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
  console.dir(error);// for debug
  console.log('err' + error);// for debug
  if (error.response) {
    if(error.response.status == 401) {
    this.$Message.warning('登录信息失效，请重新登录！')
    this.store.dispatch('Logout').then( () => {
      location.reload();
    })
//  MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//    confirmButtonText: '重新登录',
//    cancelButtonText: '取消',
//    type: 'warning'
//  }).then(() => {
//    store.dispatch('Logout').then(() => {
//      location.reload();// 为了重新实例化vue-router对象 避免bug
//    });
//  })
//  return Promise.reject(error); 
}
  }
  return Promise.reject(error)
})

export default axiosWuan
