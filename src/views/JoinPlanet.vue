<template>
<div class="JoinPlanet">
  <div class="planetIntroduction">
  	<img :src="planetItem.image_url"/>
  	<span>{{ planetItem.name }}</span>
  	<span>成员 {{ planetItem.member_num }}<span></span>话题 {{ planetItem.post_num }}</span>
  	<button @click="toJoinPlanet()" v-if="join">加入</button>
  	<button @click="toQuitPlanet()" v-else>退出星球</button>
  </div>
  <div v-if="isNotPrivate" class="JoinPlanetCardsList">
  	<div v-for="(item, index) in planetListItem" class="JoinPlanetCard">
  	  <header>
  	    <img  :src="item.author.avatar_url"/>
  	    <span>{{ item.author.name }}</span>
  	    <span>{{ item.create_time }}</span>
  	  </header>
  	  <h2 @click="$router.push({path: `/topic/${item.id}`, query: {title: planetItem.name, name: item.title}})">{{ item.title }}</h2>
  	  <p>{{ item.content }}</p>
  	  <div v-for="imgs in item.image_url" class="JoinPlanetCardImgBox">
  	    <img :src="imgs"/>
  	  </div>
  	  <footer>
  	    <button :class="{clicked: item.replied}" @click="$router.push({path: `/topic/${item.id}`, query: {title: planetItem.name, name: `${item.title}`}})"><i class="iconfont icon-talk"></i>{{ item.replied_num }}</button>
        <button :class="{clicked: item.approved}" @click="onApproval(item.id, index)"><i class="iconfont icon-good"></i>{{ item.approved_num }}</button>
        <button :class="{clicked: item.collected}" @click="onCollection(item.id, index)"><i class="iconfont icon-star"></i>{{ item.collected_num }}</button>
  	  </footer>
  	</div>
  </div>
  <button @click="$router.push({path: `/postpost`, query: { postId: planetItem.id, title: '发表帖子' }})"><i class="iconfont icon-cross"></i></button>
</div>
</template>

<script>
import { getSinglePlanet, joinPlanet, isJoinPlanet, quitPlanet } from '../fetch/groups'
import { showSinglePlanet, toApproval, toCollection, indexPosts } from '../fetch/posts'
import store from '../vuex/store'
export default {
  name: 'JoinPlanet',
  data () {
    return {
      planetItem: {},
      planetListItem: [],
      join: true,
      isNotPrivate: true,
      isPrivate: false,
      isJoin: false
    }
  },
  created () {
    document.title = this.$route.query.name + ' - 午安网 - 过你想过的生活'
  },
  mounted () {
    var self = this;
    var params = {
      offset: 0,
      limit: 20,
      id: this.$route.params.id
    }
    getSinglePlanet(this.$route.params.id).then(response => {
      this.planetItem = response;
      if (response.identity === 'creator' || response.identity === 'member') {
        this.join = false
      }
      if (response.private) {
        this.isPrivate = true
        if (response.identity === 'creator' || response.identity === 'member') {
          this.isNotPrivate = true
          this.isJoin = true
          return
        }
        this.isNotPrivate = false
      }
    }).catch(error => {
      console.log('err: '+ error);
      this.$Message.error(error);
    })
    showSinglePlanet(params).then(response => {
//    var topArr = []
//    var otherArr = []
      response.data.forEach(function (el) {
        el.create_time = el.create_time.slice(0, 10) + ' ' + el.create_time.slice(11, 16)
//      if (el.sticky) {
//        topArr.push(el)
//      } else {
//        otherArr.push(el)
//      }
      })
      self.planetListItem = response.data // topArr.concat(otherArr)
    }).catch(error => {
      console.log('err: '+ error);
      //this.$Message.error(error);
    })
    let id = JSON.parse(localStorage.getItem("user")) === null ? '' : JSON.parse(localStorage.getItem("user")).id
    if (id === '') {
      this.join = true
    } else {
//  验证是否加入星球
//    isJoinPlanet(this.$route.params.id, id).then(response => {
//      this.join = response.success ? false : true
//    }).catch(error => {
//      console.log('err: '+ error);
//      this.$Message.error(error);
//    })
    }
  },
  methods: {
    toJoinPlanet: function () {
      let id = JSON.parse(localStorage.getItem("user")) === null ? '' : JSON.parse(localStorage.getItem("user")).id
      if (id === '') {
        this.$router.push({
          path: '/login',
          query: {title: '返回'}
        })
      } else {
        if (this.isPrivate) { //判断是否为私密星球，如果是私密星球且没有加入，则跳转到申请页面
          if (!this.isJoin) {
            this.$router.push({path: `/applyPrivatePlanet`, query: { postId: this.$route.params.id, title: '加入星球' }})
          }
        } else {
          joinPlanet(this.$route.params.id).then(response => {
            console.log(response)
            this.join = false
            this.$Message.success('加入成功')
          }).catch(error => {
            console.log('err: '+ error);
            this.$Message.error(error);
          })
        }
      }
    },
    toQuitPlanet: function () {
      quitPlanet(this.$route.params.id).then(response => {
        console.log(response)
        this.join = true
        this.$Message.success(response.success)
      }).catch(error => {
        console.log('err: '+ error);
        this.$Message.error('出现错误，请重试!(星球创建者无法退出)');
      })
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
          self.planetListItem[index].approved_num += self.planetListItem[index].approved ? -1 : 1
          self.planetListItem[index].approved = !self.planetListItem[index].approved
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
          self.planetListItem[index].collected_num += self.planetListItem[index].collected ? -1 : 1
          self.planetListItem[index].collected = !self.planetListItem[index].collected
        }).catch(error => {
          console.log(error)
          this.$Message.error('出现错误　'+error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.JoinPlanet{
  width: 100%;
  .planetIntroduction, .JoinPlanetCardsList{
    width: 100%;
  }
  .planetIntroduction{
    text-align: center;
    border-bottom: 6px solid rgb(239,239,242);
    > img{
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin: 24px auto 12px auto;
      display: block;
    }
    > span:nth-of-type(1){
      display: block;
      font-size: 17px;
      line-height: 24px;
      color: #292929;
      margin-bottom: 4px;
    }
    > span:nth-of-type(2){
      display: block;
      font-size: 13px;
      line-height: 18.5px;
      color: #7B7B7B;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      > span{
        width: 2px;
        height: 2px;
        line-height: 2px;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #7B7B7B;
        border-radius: 100%;
        margin: 0 11px;
      }
    }
    > button{
      width: 70px;
      height: 30px;
      border-radius: 4px;
      border: none;
      background-color: #5677FC;
      font-size: 12px;
      line-height: 16.5px;
      color: #FFFFFF;
      box-shadow:  0 0 4px 0 rgba(0,0,0,0.24),0 4px 4px 0 rgba(0,0,0,0.24);
      margin-bottom: 16px;
    }
  }
  .JoinPlanetCardsList{
    .JoinPlanetCard{
      width: 100%;
      border-bottom: 6px solid rgb(239,239,242);
      > header{
        padding: 0 20px;
        width: 100%;
        text-align: left;
        margin-top: 8px;
        box-sizing: border-box;
        > img{
          width: 30px;
          height: 30px;
          border-radius: 100%;
        }
        span{
          opacity: 0.26;
          font-size: 12px;
          line-height: 16.5px;
          color: #000000;
        }
        span:nth-of-type(1){
          margin-left: 6px;
        }
        span:nth-of-type(2){
          float: right;
        }
      }
      > h2{
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 22.5px;
        opacity: 0.87;
        color: #2F2F2F;
        text-align: left;
        margin-top: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > p{
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        opacity: 0.54;
        text-align: left;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .JoinPlanetCardImgBox{
        padding: 0 20px;
        box-sizing: border-box;
        margin: 8px 0 6px 0;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        > img{
          width: 102px;
          height: 102px;
          margin-right: 7px;
        }
      }
      > footer{
        width: 100%;
        padding: 8px 0 6px 0;
        border-top: 0.5px solid rgba(0,0,0,0.26);
        display: flex;
        justify-content: space-between;
        button{
          font-size: 12px;
          line-height: 16.5px;
          opacity: 0.54;
          width: 33.3%;
          border: none;
          border-right: 0.5px solid rgba(0,0,0,0.26);
          background-color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            margin-right: 9px;
          }
          i.clicked{
            opacity: 0.54;
            color: #5677FC;
          }
        }
        button:nth-of-type(3){
          border: none;
        }
        button.clicked{
          opacity: 0.54;
          color: #5677FC;
        }
      }
    }
  }
  > button{
    position: fixed;
    right: 33px;
    bottom: 40px;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 100%;
    background: #5677FC;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.12), 0 12px 12px 0 rgba(0,0,0,0.24);
    color: #FFFFFF;
    font-size: 14px;
    
  }
}
</style>