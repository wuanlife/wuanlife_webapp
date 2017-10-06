import Vue from 'vue'
import Router from 'vue-router'
//import Login from '@/views/Login'
//import Signup from '@/views/Signup'
//import Index from '@/views/Index'
const Login = resolve => require.ensure([], () => resolve(require('../views/Login')), 'Login');
const Signup = resolve => require.ensure([], () => resolve(require('../views/Signup')), 'Signup');
const Index = resolve => require.ensure([], () => resolve(require('../views/Index')), 'Index');

//import DefaultHeader from '@/components/DefaultHeader'
//import SimpleHeader from '@/components/SimpleHeader'
//import SearchHeader from '@/components/SearchHeader'
//import NullHeader from '@/components/NullHeader'
//import CreatepostHeader from '@/components/createpostHeader'
const DefaultHeader = resolve => require.ensure([], () => resolve(require('../components/DefaultHeader')), 'DefaultHeader');
const SimpleHeader = resolve => require.ensure([], () => resolve(require('../components/SimpleHeader')), 'SimpleHeader');
const SearchHeader = resolve => require.ensure([], () => resolve(require('../components/SearchHeader')), 'SearchHeader');
const NullHeader = resolve => require.ensure([], () => resolve(require('../components/NullHeader')), 'NullHeader');
const CreatepostHeader = resolve => require.ensure([], () => resolve(require('../components/CreatepostHeader')), 'CreatepostHeader');

// Main route
//import Myplanet from '@/views/Myplanet'
//import Discovery from '@/views/Discovery'
//import Message from '@/views/Message'
//import Profile from '@/views/Profile'
const Myplanet = resolve => require.ensure([], () => resolve(require('../views/Myplanet')), 'Myplanet');
const Discovery = resolve => require.ensure([], () => resolve(require('../views/Discovery')), 'Discovery');
const Message = resolve => require.ensure([], () => resolve(require('../views/Message')), 'Message');
const Profile = resolve => require.ensure([], () => resolve(require('../views/Profile')), 'Profile');

//import Allplanet from '@/views/Allplanet'
//import cardPost from '@/views/cardPost'
//import planetPost from '@/views/planetPost'
//import planetApply from '@/views/planetApply'
//import myInfo from '@/views/myInfo'
//import changePwd from '@/views/changePwd'
//import myCollection from '@/views/myCollection'
//import Invitation from '@/views/Invitation'
//import Search from '@/views/Search'
//import PostContent from '@/views/PostContent'
//import JoinPlanet from '@/views/JoinPlanet'
//import Postpost from '@/views/Postpost'
//import JoinPrivatePlanet from '@/views/JoinPrivatePlanet'
//import creatPlanet from '@/views/creatPlanet'
//import getPassword from '@/views/getPassword'
//import setPassword from '@/views/setPassword'
const Allplanet = resolve => require.ensure([], () => resolve(require('../views/Allplanet')), 'Allplanet');
const cardPost = resolve => require.ensure([], () => resolve(require('../views/cardPost')), 'cardPost');
const planetPost = resolve => require.ensure([], () => resolve(require('../views/planetPost')), 'planetPost');
const planetApply = resolve => require.ensure([], () => resolve(require('../views/planetApply')), 'planetApply');
const myInfo = resolve => require.ensure([], () => resolve(require('../views/myInfo')), 'myInfo');
const changePwd = resolve => require.ensure([], () => resolve(require('../views/changePwd')), 'changePwd');
const myCollection = resolve => require.ensure([], () => resolve(require('../views/myCollection')), 'myCollection');
const Invitation = resolve => require.ensure([], () => resolve(require('../views/Invitation')), 'Invitation');
const Search = resolve => require.ensure([], () => resolve(require('../views/Search')), 'Search');
const PostContent = resolve => require.ensure([], () => resolve(require('../views/PostContent')), 'PostContent');
const JoinPlanet = resolve => require.ensure([], () => resolve(require('../views/JoinPlanet')), 'JoinPlanet');
const Postpost = resolve => require.ensure([], () => resolve(require('../views/Postpost')), 'Postpost');
const JoinPrivatePlanet = resolve => require.ensure([], () => resolve(require('../views/JoinPrivatePlanet')), 'JoinPrivatePlanet');
const creatPlanet = resolve => require.ensure([], () => resolve(require('../views/creatPlanet')), 'creatPlanet');
const getPassword = resolve => require.ensure([], () => resolve(require('../views/getPassword')), 'getPassword');
const setPassword = resolve => require.ensure([], () => resolve(require('../views/setPassword')), 'setPassword');


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
      components: {
        default: Signup,
        header: SimpleHeader,
      }
      //beforeEnter: isLogin,
    }, {
      path: '/allplanet',
      name: 'allplanet',
      components: {
        default: Allplanet,
        header: SimpleHeader,
    }
    }, {
      path: '/cardpost',
      name: 'cardpost',
      components: {
        default: cardPost,
        header: SimpleHeader,
      }
    }, {
      path: '/planetpost',
      name: 'planetpost',
      components: {
        default: planetPost,
        header: SimpleHeader,
      }
    }, {
      path: '/planetapply',
      name: 'planetapply',
      components: {
        default: planetApply,
        header: SimpleHeader,
      }
    }, {
      path: '/myinfo',
      name: 'myinfo',
      components: {
        default: myInfo,
        header: SimpleHeader,
      }
    }, {
      path: '/changepwd',
      name: 'changepwd',
      components: {
        default: changePwd,
        header: SimpleHeader,
      }
    }, {
      path: '/mycollection',
      name: 'mycollection',
      components: {
        default: myCollection,
        header: SimpleHeader,
      }
    }, {
      path: '/invitation',
      name: 'invitation',
      components: {
        default: Invitation,
        header: SimpleHeader,
      }
    }, {
      path: '/search',
      name: 'search',
      components: {
        default: Search,
        header: SearchHeader,
      }
    }, {
      path: '/postcontent',
      name: 'postcontent',
      components: {
        default: PostContent,
        header: SimpleHeader,
      },
      children: [{
        path: ':id',
        components: {
          default: PostContent,
          header: SimpleHeader,
        }
      }]
    }, {
      path: '/joinplanet',
      name: 'joinplanet',
      components: {
        default: JoinPlanet,
        header: NullHeader,
      },
      children: [{
        path: ':id',
        components: {
          default: JoinPlanet,
          header: NullHeader,
        }
      }]
    }, {
      path: '/postpost',
      name: 'postpost',
      components: {
        default: Postpost,
        header: CreatepostHeader,
      }
    }, {
      path: '/joinprivateplanet',
      name: 'joinprivateplanet',
      components: {
        default: JoinPrivatePlanet,
        header: NullHeader,
      }
    }, {
      path: '/creatplanet',
      name: 'creatplanet',
      components: {
        default: creatPlanet,
        header: SimpleHeader,
      }
    }, {
      path: '/getPassword',
      name: 'getPassword',
      components: {
        default: getPassword,
        header: SimpleHeader,
      }
    }, {
      path: '/setPassword',
      name: 'setPassword',
      components: {
        default: setPassword,
        header: SimpleHeader,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
    if (to.path == '/message' || to.path == '/myinfo' || to.path == '/changepwd' || to.path == '/mycollection' || to.path == '/invitation' || to.path == '/creatplanet' || to.path == '/postpost') {  // 判断该路由是否需要登录权限
        if (JSON.parse(localStorage.getItem("user")) == null && store.state.token == '') {  // 通过vuex state获取当前的token是否存在
            next({
              path: '/login',
              query: {title: '返回'}
            });
        }
        else {
          next();
        }
    }
    else {
        next();
    }
})
export default router;