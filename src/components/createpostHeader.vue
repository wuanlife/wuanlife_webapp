<template>
<div class="createpostHeader">
  <i class="iconfont icon-goback" @click="$router.go(-1)"></i>
  <span>{{ $route.query.title }}</span>
  <button @click="pushPost()">发表</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { createPost, postEdit } from '../fetch/posts'
import store from '../vuex/store'
import util from '@/util'
export default {
    name: 'createpostHeader',
    data() {
        return {
            
        };
    },
    computed: {
        ...mapState([
            'user'
        ]),
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleIconClick() {

        },
        pushPost() {
//          util.storeWithExpiration.set('user', {username: null})
            if (this.$route.query.edit == true) {
              postEdit({
                postId: this.$route.query.postId,
                title: store.state.postContent.title,
                content: store.state.postContent.content,
              }).then(response => {
                console.log("编辑成功，帖子ID: "+response.id)
                this.$Message.success('编辑成功')
                this.$router.go(-1)
              }).catch(error => {
                console.log("编辑失败: "+error)
                this.$Message.error('编辑失败　'+error)
              })
            } else{
              createPost(this.$route.query.postId, store.state.postContent).then(response => {
                console.log("发帖成功，帖子ID: "+response.id)
                this.$Message.success('发帖成功')
                this.$router.go(-1)
              }).catch(error => {
                console.log("发帖失败: "+error)
                this.$Message.error('发帖失败'+error)
              })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.createpostHeader{
  position: relative;
  height: 51px;
  width: 100%;
  box-sizing: border-box;
  background-color: #5677FC;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.12), 0 8px 8px 0 rgba(0,0,0,0.24);
  text-align: left;
  line-height: 51px;
  i{
    width: 16px;
    height: 16px;
    margin-left: 16px;
    margin-right: 16px;
    color: #fff;
  }
  span{
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }
  button{
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    border: none;
    background-color: #5677FC;
    margin-right: 31px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>