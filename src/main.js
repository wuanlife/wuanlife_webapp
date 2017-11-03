// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueSimplemde from 'vue-simplemde'
//import FastClick from 'fastclick'

Vue.use(iView)
Vue.use(VueSimplemde)
Vue.config.productionTip = false

//FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
