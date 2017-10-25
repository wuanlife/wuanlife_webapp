<template>
<div class="PostContent">
  <loadmore @on-pullup='onPullup'
              @on-pulldown='onPullup'
              class="page">
    <h2>{{ contents.title }}</h2>
    <div>
      <div class="PostContentTime">
        <span>{{ contents.author.name }}发表于{{ planetName }}</span>
        <span>{{ contents.create_time }}</span>
      </div>
      <div><div></div><div class="contenttext" v-html="contents.content"></div></div>
      <!--<img :src="contents.image_url"/>-->
      <div class="PostContentBtn btnOne">
        <button @click="onApproval(contents.id)"><i class="iconfont icon-good"></i>{{ contents.approved_num }}</button>
        <button @click="onCollection(contents.id)"><i class="iconfont icon-star"></i>{{ contents.collected_num }}</button>
      </div>
      <div class="PostContentBtn btnTwo">
        <button @click="toTop(contents.sticky)">置顶</button>
        <button @click="toLock(contents.lock)">锁定</button>
        <button @click="toEdit(contents.lock)">编辑</button>
        <button @click="toDelete(contents.lock)">删除</button>
      </div>
      <div class="PostContentCommentList">
        <span>{{ comments.reply_count }}个回复</span>
        <div v-for="(item, index) in comments.reply" class="PostContentComment">
          <header>
            <span>{{ item.user_name }}</span>
            <span>{{ item.create_time }}</span>
          </header>
          <p>{{ item.comment }}</p>
          <footer>
            <button @click="toDeleteReply(item.floor, index)">删除</button>
            <button>回复</button>
          </footer>
        </div>
      </div>
    </div>
</loadmore>
<div class="writeComment">
    <input v-model="comment" type="text" placeholder="写下你的评论"/>
    <i @click="toReply()" class="iconfont icon-send"></i>
  </div>
</div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { planetContent, postTop, postLock, postEdit, postDelete, planetComment, postReply, postReplyDelete, toApproval, toCollection, } from '../fetch/posts'
import { getSinglePlanet } from '../fetch/groups'
import store from '../vuex/store'
export default {
  name: 'PostContent',
  components:{
    loadmore,
  },
  data () {
    return {
      contents: {},
      comments: [],
      planetName: '',
      comment: '',
    }
  },
  created() {
    this.postid = this.$route.params.id
    document.title = this.$route.query.name + ' - 午安网 - 过你想过的生活'
  },
  mounted() {
    var self = this;
    var params = {
      offset: 0,
      limit: 20,
      postId: this.$route.params.id
    }
    planetContent(this.$route.params.id).then(response => {
      response.create_time = response.create_time.slice(0, 10) + ' ' + response.create_time.slice(11, 16)
      this.contents = response;
      getSinglePlanet(response.group.id).then(res => {
        this.planetName = res.name;
      })
    }).catch(error =>　{
      console.log(error)
    })
    planetComment(params).then(response => {
      response.reply.forEach(function (el) {
        el.create_time = el.create_time.slice(0, 10) + ' ' + el.create_time.slice(11, 16)
      })
      this.comments = response;
    }).catch(error =>　{
      console.log(error)
    })
  },
  methods: {
    toTop: function (val) {
      if (val) {
        this.$Message.warning('已经置顶了，无需重复操作！')
        return
      }
      postTop(this.$route.params.id).then(response => {
        console.log("帖子置顶：　"+response.success)
        this.$Message.success('置顶成功')
      }).catch(error => {
        console.log("错误　帖子置顶：　"+error)
        this.$Message.error('置顶失败')
      })
    },
    toLock: function (val) {
      if (val) {
        this.$Message.warning('已经锁定了，无需重复操作！')
        return
      }
      postLock(this.$route.params.id).then(response => {
        console.log("帖子锁定：　"+response.success)
        this.$Message.success('锁定成功')
      }).catch(error => {
        console.log("错误　帖子锁定：　"+error)
        this.$Message.error('锁定失败')
      })
    },
    toEdit: function (val) {
      if (val) {
        this.$Message.warning('帖子已锁定，无法编辑')
        return
      }
      store.dispatch('setPostEditContent', {
        title: this.contents.title,
        content: this.contents.content,
      })
      this.$router.push({path: `/postpost`, query: { postId: this.contents.id, title: '编辑帖子', edit: true }})
    },
    toDelete: function (val) {
      if (val) {
        this.$Message.warning('帖子已锁定，无法删除')
        return
      }
      postDelete(this.$route.params.id).then(response => {
        console.log("帖子删除：　"+response.success)
        this.$Message.success('删除成功')
        this.$router.go(-1)
      }).catch(error => {
        console.log("错误　帖子删除：　"+error)
        this.$Message.error('删除失败')
      })
    },
    toReply: function () {
      var self = this;
      var params = {
        Comment: this.comment,
        postId: this.contents.id,
        floor: this.comments.reply_count + 2
      }
      postReply(params).then(response => {
        response.create_time = response.create_time.slice(0, 10) + ' ' + response.create_time.slice(11, 16)
        self.comments.reply.push(response)
        this.$Message.success('回复成功')
        this.comment = ''
      }).catch(error => {
        console.log("错误　帖子回复：　"+error)
        this.$Message.error('回复失败')
      })
    },
    toDeleteReply: function (floor, index) {
      postReplyDelete(this.contents.id, floor).then(response => {
        console.log("帖子回复删除：　"+response.success)
        this.$Message.success('删除回复成功')
        this.comments.reply.splice(index, 1)
      }).catch(error => {
        console.log("错误　帖子回复删除：　"+error)
        this.$Message.error('删除回复失败')
      })
    },
    onApproval: function (value) {
      let self = this;
      toApproval(value).then(function (response) {
        console.log("点赞成功：" + response.success);
        self.contents.approved_num += self.contents.approved ? -1 : 1
        self.contents.approved = !self.contents.approved
      }).catch(function (error) {
        console.log('Error: ' + error);
        this.$Message.error('出现错误　'+error);
      })
    },
    onCollection: function (post_id) {
      let self = this;
      let Id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      const params = {
        id: Id,
        post_id: post_id
      }
      toCollection(params).then(function (response) {
        console.log("收藏成功：　"+response.success);
        self.contents.collected_num += self.contents.collected ? -1 : 1
        self.contents.collected = !self.contents.collected
      }).catch(error => {
        console.log(error)
        this.$Message.error('出现错误　'+error)
      })
    },
    onPullup: function(done) {
      let self = this
      setTimeout(function () {
        done()
      }, 1500)
    },
  }
}
</script>

<style lang="scss" scoped>
.PostContent{
  width: 100%;
  box-sizing: border-box;
  .page{
    height: calc(100vh - 120px);
    position: relative;
    user-select: none;
    > div{
    > h2, > span, > div > div > .contenttext, .PostContentBtn, .PostContentTime{
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    text-align: left;
  }
  h2{
    font-size: 20px;
    line-height: 28px;
    opacity: 0.87;
    color: rgba(47,47,47,0.87);
    letter-spacing: 1px;
    margin: 11px 0 3px 0;
    padding: 0 16px;
    text-align: left;
  }
  > div{
    width: 100%;
    .PostContentTime{
      opacity: 0.26;
      font-size: 12px;
      line-height: 16.5px;
      color: #000000;
      margin-bottom: 8px;
      span:nth-child(2){
        float: right;
      }
    }
    > div > .contenttext{
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.87);
      letter-spacing: 0.5px;
      padding: 0 16px;
      text-align: left;
    }
    > img{
      width: 343px;
      height: 205.5px;
      margin: 4px auto;
    }
    .btnOne{
      margin-top: 7px;
      margin-bottom: 9px;
      button{
        opacity: 0.87;
        background: #5677FC;
        border-radius: 4px;
        color: rgba(255,255,255,0.87);
        line-height: 20px;
        font-size: 14px;
        width: 90px;
        height: 25px;
        border: none;
        box-sizing: border-box;
        padding: 0 16px;
        text-align: right;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 18px;
      }
    }
    .btnTwo{
      margin-bottom: 7px;
      button{
        border: none;
        line-height: 20px;
        font-size: 14px;
        color: rgba(86,119,252,0.87);
        letter-spacing: 0.5px;
        margin-right: 16px;
        background-color: #FFFFFF;
      }
    }
    .PostContentCommentList{
      border-top: 4px solid rgb(239,239,242);
      padding: 0 16px;
      > span{
        width: 100%;
        display: block;
        padding: 7px 0 4px 0;
        text-align: left;
        font-size: 12px;
        line-height: 16.5px;
        color: rgba(0,0,0,0.36);
        letter-spacing: 0.43px;
        border-bottom: 1px solid rgba(86,119,252,0.36);
      }
      .PostContentComment{
        width: 100%;
        border-bottom: 0.5px solid rgba(86,119,252,0.26);
        header{
          width: 100%;
          font-size: 12px;
          line-height: 16.5px;
          color: rgba(0,0,0,0.36);
          text-align: left;
          margin: 4px 0 6px 0;
          span:nth-child(2){
            float: right;
          }
        }
        > p{
          width: 100%;
          text-align: left;
          font-size: 12px;
          line-height: 16.5px;
          color: rgba(0,0,0,0.87);
        }
        > footer{
          width: 100%;
          font-size: 12px;
          line-height: 16.5px;
          text-align: right;
          margin: 4px 0 9px 0;
          > button{
            color: rgba(86,119,252,0.87);
            letter-spacing: 0.43px;
            border: none;
            background-color: #fff;
            margin-left: 21px;
          }
        }
      }
    }
  }
    }
  }
  .writeComment{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background: #5677FC;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0px;
    > input{
      width: 100%;
      outline: none;
      border: none;
      font-size: 12px;
      line-height: 22.5px;
      color: rgba(255,255,255,0.54);
      letter-spacing: 0.57px;
      background-color: #5677FC;
      &::-webkit-input-placeholder{
        color: rgba(255,255,255,0.54);
      }
    }
    > i{
      color: #FFFFFF;
      width: 17px;
      height: 17px;
    }
  }
}
</style>