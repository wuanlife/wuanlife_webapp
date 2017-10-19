<template>
<div class="myCollection">
  <loadmore @on-pullup='onPullup'
            @on-pulldown='onPullup'
            class="page">
  <div>
    <div></div>
    <div v-if="isCollects" v-for="item in myCollectionList" class="myCollectionCard">
    <header><button style="border: none;background-color: transparent;" @click="$router.push({path: `/topic/${item.id}`, query: {title: '我的收藏'}})">{{ item.title }}</button></header>
    <p>{{ item.content }}</p>
    <div class="myCollectionCardImgBox" >
      <img v-for="imgs in item.image_url" :src="imgs"/>
    </div>
    <footer>
      <span>{{ item.group.name }}</span>
      <div class="myCollectionCardTime">
        收藏于 {{ item.create_time }}
      </div>
    </footer>
  </div>
  <p v-else>暂无收藏哦！</p>
  </div>
</loadmore>
</div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { postMyCollestion } from '../fetch/posts'
import store from '../vuex/store'
export default {
  name: 'myCollection',
  components:{
    loadmore,
  },
  data () {
    return {
      myCollectionList: [],
      i: 0,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    postMyCollestion(id, {
      limit: 20,
      offset: 0
    }).then(response => {
      response.data.forEach(function (el) {
        el.create_time = el.create_time.slice(0, 10) + ' ' + el.create_time.slice(11, 16)
      })
      this.myCollectionList = response.data
    }).catch(error => {
      console.log(error)
      this.$Message.error(error)
    })
  },
  computed: {
    isCollects () {
      if(this.myCollectionList == []) {
        return false
      }
      return true
    },
  },
  methods: {
    onPullup: function (done) {
      let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      let self = this
      self.i += 1 
      setTimeout(function () {
        postMyCollestion(id, {
          offset: 20 * self.i,
          limit: 20,
        }).then(function (response) {
          self.myCollectionList = self.myCollectionList.concat(response.data)
        })
        done()
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.myCollection{
  .page{
    height: calc(100vh - 51px);
    position: relative;
    user-select: none;
    .myCollectionCard{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 6px solid rgb(239,239,242);
    header, p, footer, > div{
      width: 100%;
      text-align: left;
    }
    header{
      opacity: 0.87;
      font-size: 16px;
      line-height: 22.5px;
      color: #2F2F2F;
      margin-top: 6px;
    }
    p{
      font-size: 14px;
      color: rgba(0,0,0,0.54);
      line-height: 20px;
      margin-bottom: 9px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    > div{
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      img{
        width: 107px;
        height: 107px;
      }
    }
    footer{
      color: rgba(0,0,0,0.26);
      font-size: 12px;
      margin-bottom: 7px;
      span{
        line-height: 16.5px;
      }
      > div{
        line-height: 16.5px;
        float: right;
      }
    }
  }
  }
}
</style>