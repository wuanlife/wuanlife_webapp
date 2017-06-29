<template>
  <div class="profile-container">
    <div>
      <div class="profile-item" @click="$router.push('login')">
        <img src="">
        <p class="profile-name">未登录</p>
        <i class="iconfont icon-enter"></i>
      </div>
    </div>
    <div>
      <ul class="profile-list">
        <li class="profile-item" @click="$router.push('myinfo')">
          <i class="iconfont icon-profile"></i>
          <p>个人资料</p>
          <i class="iconfont icon-enter"></i>
        </li>
        <li class="profile-item" @click="$router.push('changepwd')">
          <i class="iconfont icon-lock"></i>
          <p>修改密码</p>
          <i class="iconfont icon-enter"></i>
        </li>
        <li class="profile-item" @click="$router.push('mycollection')">
          <i class="iconfont icon-star"></i>
          <p>我的收藏</p>
          <i class="iconfont icon-enter"></i>
        </li>
        <li class="profile-item" @click="$router.push('invitation')">
          <i class="iconfont icon-inviteFriend"></i>
          <p>邀请好友</p>
          <i class="iconfont icon-enter"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.profile-container {
  div:not(:first-child) {
    margin-top: 12px;
  }
  & > div {
    background-color: #fff;
    div.profile-item {
      display: flex;
      align-items: center;
      padding: 32px 40px;
      img {
        width: 76px;
        height: 76px;
        margin-right: 32px;
        border-radius:100%;
      }
      p {
        opacity:0.87;
        font-size:28px;
        color:#000000;
      }
      i.iconfont.icon-enter {
        margin-left: auto;
        font-size: 28px;
      }
    }
    li.profile-item {
      display: flex;
      align-items: center;
      padding: 42px 40px 42px 0;
      margin-left: 40px;
      p {
        opacity:0.87;
        font-size:24px;
        color:#000000;
      }
      i.iconfont:not(.icon-enter) {
        width: 60px;
        text-align: left;
        margin-right: 12px;
        font-size: 28px;
      }
      i.iconfont.icon-enter {
        margin-left: auto;
        font-size: 28px;
      }
    }
    ul.profile-list {
      li:not(:first-child){
        border-top: 2px solid #eff2f4;
      }
    }
    i.iconfont {
      color: #757575;
    }
  }
}
</style>
