<template>
  <div class="profile-container">
    <div>
      <div class="profile-item" @click="$router.push({path: '/login', query: {title: '登录'}})">
        <img :src="userInfos.avatar_url">
        <p v-if="isLogin" class="profile-name">{{ userInfos.name }}</p>
        <p v-else class="profile-name">未登录</p>
        <i class="iconfont icon-enter"></i>
      </div>
    </div>
    <div>
      <ul class="profile-list">
        <li class="profile-item" @click="$router.push({path: '/myinfo', query: {title: '个人资料'}})">
          <i class="iconfont icon-profile"></i>
          <p>个人资料</p>
          <i class="iconfont icon-enter"></i>
        </li>
        <li class="profile-item" @click="$router.push({path: '/changepwd', query: {title: '修改密码'}})">
          <i class="iconfont icon-lock"></i>
          <p>修改密码</p>
          <i class="iconfont icon-enter"></i>
        </li>
        <li class="profile-item" @click="$router.push({path: '/mycollection', query: {title: '我的收藏'}})">
          <i class="iconfont icon-star"></i>
          <p>我的收藏</p>
          <i class="iconfont icon-enter"></i>
        </li>
        <li class="profile-item" @click="$router.push({path: '/invitation', query: {title: '邀请好友'}})">
          <i class="iconfont icon-inviteFriend"></i>
          <p>邀请好友</p>
          <i class="iconfont icon-enter"></i>
        </li>
      </ul>
    </div>
    <button v-if="isLogin" @click="toLogout">退出登录</button>
    <button v-else @click="$router.push({path: '/login', query: {title: '我的'}})">登录</button>
  </div>
</template>

<script>
import { getSingleUser } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'profile',
  data () {
    return {
      userInfos: {},
      isLogin: false,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getSingleUser(id).then(response => {
      this.isLogin = true
      this.userInfos = response
    }).catch(error => {
      console.log(error)
      this.$Message.error('错误，请重试'+error)
    })
  },
  methods: {
    toLogout: function () {
      this.$store.dispatch("Logout")
      this.isLogin = false
      console.log("退出成功")
      this.$Message.success('退出成功')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.profile-container {
  div:not(:first-child) {
    border-top: 6px solid #D9D9DC;
  }
  & > div {
    background-color: #fff;
    div.profile-item {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      img {
        width: 38px;
        height: 38px;
        margin-right: 16px;
        border-radius:100%;
      }
      p {
        opacity:0.87;
        font-size:14px;
        color:#000000;
      }
      i.iconfont.icon-enter {
        margin-left: auto;
        font-size: 14px;
      }
    }
    li.profile-item {
      display: flex;
      align-items: center;
      padding: 21px 20px 21px 0;
      margin-left: 20px;
      p {
        opacity:0.87;
        font-size:12px;
        color:#000000;
      }
      i.iconfont:not(.icon-enter) {
        width: 30px;
        text-align: left;
        margin-right: 6px;
        font-size: 14px;
      }
      i.iconfont.icon-enter {
        margin-left: auto;
        font-size: 14px;
      }
    }
    ul.profile-list {
      li:not(:first-child){
        border-top: 1px solid #eff2f4;
      }
    }
    i.iconfont {
      color: #757575;
    }
  }
  > button{
    width: 304px;
    height: 44px;
    border-radius: 4px;
    background-color: #5677fc;
    font-size: 16px;
    color: rgba(255,255,255,0.87);
    box-shadow:  0 2px 6px 0 rgba(0,0,0,0.24);
    border: none;
    margin-top: 106.5px;
  }
}
</style>
