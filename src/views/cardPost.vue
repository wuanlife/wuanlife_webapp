<template>
  <div class="cardPost">
  <loadmore @on-pullup='onPullup'
            @on-pulldown='onPullup'
            class="page">
    <ul v-if="postNoNull" class="cardPost-list">
      <li class="profile-item" v-for="item in postList" @click="$router.push({path: `/topic/${ item.post.id }`, query: {title: '帖子通知', name: item.post.title}})">
        <img src=""/>
        <div>
          <p class="cardPost-name">{{ item.user.name }}</p>
          <p class="cardPost-content">回复了主题帖 <span>{{ item.post.title }}</span></p>
        </div>
        <button>查看</button>
      </li>
    </ul>
    <p v-else>还没有收到帖子通知哦！</p>
  </loadmore>
  </div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { getAllMessages } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'cardpost',
  components:{
    loadmore,
  },
  data() {
    return {
      postList: [],
      postNoNull: true,
      i: 0,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getAllMessages(id, {
      offset: 0,
      limit: 20,
      type: 'post'
    }).then(response => {
      this.postNoNull = response.data === null ? false : true
      this.postList = response.data
    }).catch(error => {
      console.log(error)
      this.$Message.error(error)
    })
  },
  methods: {
    onPullup: function (done) {
      let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      let self = this
      self.i += 1 
      setTimeout(function () {
        getAllMessages(id, {
          offset: 20 * self.i,
          limit: 20,
          type: 'post'
        }).then(function (response) {
          self.postList = self.postList.concat(response.data)
        })
        done()
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cardPost{
    .page{
      height: calc(100vh - 51px);
      position: relative;
      user-select: none;
      .cardPost-list{
      li{
        position: relative;
        margin-left: 20px;
        border-bottom: 1px solid #eff2f4;
        padding: 10px 0;
        height: 70px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        div{
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          p{
            text-align: left;
            margin-left: 58px;
            width: 282px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .cardPost-name{
            font-size: 15px;
            color: #292929;
          }
          .cardPost-content{
            font-size: 14px;
            color: rgba(0,0,0,0.54);
          }
        }
        button{
          background: #5677FC;
          border-radius: 4px;
          border: none;
          width: 63px;
          height: 25px;
          font-size: 12px;
          color: #ffffff;
          position: absolute;
          right: 20px;
        }
      }
    }
    > div{
      font-size: 16px;
      color: #d2d2d2;
      margin-top: 20px;
    }
    }
  }
</style>