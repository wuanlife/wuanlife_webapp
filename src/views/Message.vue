<template>
  <div class="wuan-cards">
    <div class="wuan-briefcard">
      <i class="iconfont icon-privatenotice"></i>
      <div class="content"  @click="$router.push({path: '/planetapply', query: {title: '私密星球申请'}})">
        <h1>私密星球申请</h1>
        <p v-if="applyNull"><span>{{ applyMessage.user.name }}</span> 申请加入 <span>{{ applyMessage.group.name }}</span></p>
        <p v-else>暂无消息</p>
        <i class="iconfont icon-dot" v-if="reddot1"></i>
      </div>
    </div>
    <div class="wuan-briefcard" @click="$router.push({path: '/cardpost', query: {title: '帖子通知'}})">
      <i class="iconfont icon-postnotice"></i>
      <div class="content">
        <h1>帖子通知</h1>
        <p v-if="postNull"><span>{{ postMessage.user.name }}</span> 回复了你</p>
        <p v-else>暂无消息</p>
        <i class="iconfont icon-dot" v-if="reddot2"></i>
      </div>
    </div>
    <div class="wuan-briefcard"  @click="$router.push({path: '/planetpost', query: {title: '星球通知'}})">
      <i class="iconfont icon-planetnotice"></i>
      <div class="content">
        <h1>星球通知</h1>
        <p v-if="groupNull"><span>{{ groupMessage.user.name }}</span> {{ groupMessage.content }}</p>
        <p v-else>暂无消息</p>
        <i class="iconfont icon-dot" v-if="reddot3"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllMessages } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'message',
  data () {
    return {
      reddot1: false,
      reddot2: false,
      reddot3: false,
      applyMessage: {},
      postMessage: {},
      groupMessage: {},
      postNull: false,
      groupNull: false,
      applyNull: false,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getAllMessages(id, {
      offset: 0,
      limit: 20,
      type: 'home'
    }).then(response => {
      if (response.data.apply !== null) {
        this.applyMessage = response.data.apply === null ? {} : response.data.apply
        this.applyNull = true
      }
      if (response.data.post !== null) {
      this.postMessage = response.data.post === null ? {} : response.data.post
      this.postNull = true
      }
      if (response.data.group !== null) {
      this.groupMessage = response.data.group === null ? {} : response.data.group
      this.groupNull = true
      }
    }).catch(error => {
      console.log(error)
      this.$Message.error(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wuan-cards {
  .wuan-briefcard {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 15px;
    margin: 0 7.5px;
    position: relative;

    background:#ffffff;
    box-shadow:0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
    border-radius:2px;
    height:63px;
    > i.iconfont {
        color: #5677fc;
        font-size: 34.5px;
        margin-right: 12px;
    }
    div.content {
      flex: 1;
      min-width: 0;
      h1 {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size:16px;
          color:rgba(0,0,0,0.87);
          text-align: left;
      }
      p {
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size:12px;
          color:rgba(0,0,0,0.54);
      }
      > i{
        color: red;
        font-size: 8px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
  div.wuan-briefcard:not(:first-child) {
    margin-top: 6px;
  }
}
</style>
