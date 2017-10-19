<template>
  <div class="wuan-cards">
    <loadmore @on-pullup='onPullup'
              @on-pulldown='onPullup'
              class="page">
      <div>
        <div></div>
        <div v-for="(item, index) in IndexContentList" class="wuan-card">
        <div class="header">
          <div>
            <img :src="item.author.avatar_url">
            <p>{{ item.author.name }}</p>
          </div>
          <p>{{ item.create_time }}</p>
        </div>
        <div class="body">
          <div class="title">
            <p><button style="border: 0;background-color: transparent;" @click="$router.push({path: `/topic/${item.id}`, query: {title: '主页', name: `${item.title}`}})">{{ item.title }}</button></p>
          </div>
          <div class="brief">
            <p v-html="item.content"></p>
          </div>
          <div class="imgs">
            <img v-for="imgs in item.image_url" :src="imgs">
          </div>
        </div>
        <div class="footer">
          <button :class="{clicked: item.replied}" @click="$router.push({path: `/topic/${item.id}`, query: {name: `${item.title}`}})"><i class="iconfont icon-talk"></i>{{ item.replied_num }}</button>
          <button :class="{clicked: item.approved}" @click="onApproval(item.id, index)"><i class="iconfont icon-good"></i>{{ item.approved_num }}</button>
          <button :class="{clicked: item.collected}" @click="onCollection(item.id, index)"><i class="iconfont icon-star"></i>{{ item.collected_num }}</button>
        </div>
      </div>
      </div>
    </loadmore>
  </div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { toApproval, toCollection, indexPosts } from '../fetch/posts'
import store from '../vuex/store'
export default {
  name: 'index',
  components:{
    loadmore,
  },
  data () {
    return {
      topStatus: '',
      IndexContentList: [],
      i: 0,
    }
  },
  methods: {
    onPullup: function(done) {
      let self = this
      self.i += 1 
      setTimeout(function () {
        indexPosts({
          offset: 20 * self.i,
          limit: 20
        }).then(function (response) {
          response.data.forEach(function (el) {
            el.create_time = el.create_time.slice(0, 10) + ' ' + el.create_time.slice(11, 16)
          })
          self.IndexContentList = self.IndexContentList.concat(response.data)
        })
        done()
      }, 1500)
    },
    onApproval: function(value, index) {
      let self = this;
      if (JSON.parse(localStorage.getItem("user")) === null) {
        this.$router.push({
          path: '/login',
          query: {title: '返回'}
        })
      } else {
        toApproval(value).then(function (response) {
          console.log("点赞成功：" + response.success);
          self.IndexContentList[index].approved_num += self.IndexContentList[index].approved ? -1 : 1
          self.IndexContentList[index].approved = !self.IndexContentList[index].approved
        }).catch(function (error) {
          console.log('Error: ' + error);
          this.$Message.error('出现错误　'+error);
        })
      }
    },
    onCollection: function(post_id, index) {
      let self = this;
      if (JSON.parse(localStorage.getItem("user")) === null) {
        this.$router.push({
          path: '/login',
          query: {title: '返回'}
        })
      } else {
        let Id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
        const params = {
          id: Id,
          post_id: post_id
        }
        toCollection(params).then(function (response) {
          console.log("收藏成功：　"+response.success);
          self.IndexContentList[index].collected_num += self.IndexContentList[index].collected ? -1 : 1
          self.IndexContentList[index].collected = !self.IndexContentList[index].collected
        }).catch(error => {
          console.log(error)
          this.$Message.error('出现错误　'+error)
        })
      }
    }
  },
  mounted() {
    var self = this;
    let IndexContentListFirst = function () {
      firstCard = document.getElementsByClassName("wuan-card")[0];
      firstCard.style.marginBottom = "6px solid #d9d9dc";
    };
    indexPosts({
      offset: 0,
      limit: 20
    }).then(function (response) {
      console.log("Index-Ask-Success" + response.data);
      response.data.forEach(function (el) {
        el.create_time = el.create_time.slice(0, 10) + ' ' + el.create_time.slice(11, 16)
      })
      self.IndexContentList = response.data;
    }).catch(function (error) {
      console.log("Index-err： " + error);
      this.$Message.error(error)
    })
  },
  computed: {
    userId () {
      return store.state.userInfo.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wuan-cards {
  width: 100%;
  box-sizing: border-box;
  .page{
    height: calc(100vh - 105px);
    position: relative;
    user-select: none;
    .wuan-card {
      width: 100%;
      box-sizing: border-box;
      border-bottom: 6px solid #d9d9dc;
      > .header, > .body, > .footer{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
      }
      > .header{
        text-align: left;
        display: flex;
        margin-top: 9px;
        margin-bottom: 6px;
        align-items: center;
        justify-content: space-between;
        img{
          width: 30px;
          height: 30px;
          border-radius: 100%;
        }
        div > p{
          font-size: 12px;
          line-height: 16.5px;
          color: rgba(0,0,0,0.26);
          display: inline-block;
          padding-left: 6px;
        }
        > p{
          font-size: 12px;
          line-height: 16.5px;
          color: rgba(0,0,0,0.26);
          display: inline-block;
        }
      }
      > .body{
        .title{
          margin-bottom: 3px;
          p{
            width: 100%;
            font-size: 16px;
            line-height: 22.5px;
            color: #2f2f2f;
            text-align: left;
            opacity: 0.87;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .brief{
          margin-bottom: 9px;
          p{
            width: 100%;
            opacity: 0.54;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
            text-align: left;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
        .imgs{
          width: 100%;
          text-align: left;
          margin-bottom: 6px;
          img{
            width: 102px;
            height: 102px;
            margin-right: 7px;
          }
        }
      }
      > .footer{
        border-top: 0.5px solid rgba(0,0,0,0.26);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        button{
          width: 33.3%;
          border: none;
          opacity: 0.26;
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-right: 1px solid rgba(0,0,0,0.26);
          i{
            margin-right: 9px;
          }
          i.clicked{
            opacity: 0.54;
            color: #5677FC;
          }
        }
        button.clicked{
          opacity: 0.54;
          color: #5677FC;
        }
        button:last-child{
          border: none;
        }
      }
    }
  }
}
.iScrollVerticalScrollbar {
  position: absolute;
  z-index: 9999;
  width: 1px;
  bottom: 1px;
  top: 1px;
  right: 1px;
  overflow: hidden;
}
</style>
