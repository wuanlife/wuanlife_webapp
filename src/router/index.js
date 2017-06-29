import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Index from '@/views/Index'

import DefaultHeader from '@/components/DefaultHeader'
import SimpleHeader from '@/components/SimpleHeader'

// Main route
import Myplanet from '@/views/Myplanet'
import Discovery from '@/views/Discovery'
import Message from '@/views/Message'
import Profile from '@/views/Profile'


import store from '../vuex/store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index', params:{title: '主页'}},
    }, {
      name: 'index',
      path: '/index',
      components: {
        default: Index,
        header: DefaultHeader,
      }
    }, {
      name: 'myplanet',
      path: '/myplanet',
      components: {
        default: Myplanet,
        header: DefaultHeader,
      }
    }, {
      name: 'discovery',
      path: '/discovery',
      components: {
        default: Discovery,
        header: DefaultHeader,
      }
    }, {
      name: 'message',
      path: '/message',
      components: {
        default: Message,
        header: DefaultHeader,
      }
    }, {
      name: 'profile',
      path: '/profile',
      components: {
        default: Profile,
        header: DefaultHeader,
      }
    }, {
      path: '/login',
      name: 'login',
      components: {
        default: Login,
        header: SimpleHeader,
      }
      //beforeEnter: isLogin,
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup,
      //beforeEnter: isLogin,
    },
  ]
})

router.beforeEach((to, from, next) => {
    /*
    console.log(to.meta.requireAuth)
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.user.userInfo.id) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
    */
    next();
})
export default router;