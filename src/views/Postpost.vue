<template>
<div class="Postpost">
  <span v-if="PostpostTitle">帖子标题</span>
  <span v-else></span>
  <input type="text" placeholder="帖子标题" @click="PostpostTitleF(1)" v-model="postTitle" />
  <span v-if="PostpostThings">在这里写下你的故事</span>
  <span v-else></span>
  <textarea placeholder="在这里写下你的故事" @click="PostpostTitleF(2)" v-model="postContent"></textarea>
  <i @click="addImgs" class="iconfont icon-picture"></i>
</div>
</template>

<script>
import { createPost } from '../fetch/posts'
import { UploaderBuilder, Uploader } from 'qiniu4js'
import store from '../vuex/store'
import { getQiniuToken } from '../fetch/qiniu'

export default {
  name: 'postpost',
  data () {
    return {
      PostpostTitle: false,
      PostpostThings: false,
      postTitle: '',
      postContent: '',
      imgUrls: 'http://7xlx4u.com1.z0.glb.clouddn.com/',
      imgArr: []
    }
  },
  methods: {
    PostpostTitleF (n) {
      let self = this;
      self.PostpostTitle = false;
      self.PostpostThings = false;
      switch (n){
        case 1:
          self.PostpostTitle = true;
          break;
        case 2:
          self.PostpostThings = true;
          break;
      }
    },
    pushPost () {
      createPost(this.$router.params.postId, {
        title: this.postTitle,
        content: this.postContent
      }).then(response => {
        console.log("发帖成功，帖子ID: "+response.id)
        this.$Message.success('发帖成功')
      }).catch(error => {
        console.log("发帖失败: "+error)
        this.$Message.error('发帖失败，请稍后再试')
      })
    },
    addImgs (event) {
      var self = this;
      // qiniu4js uploader object
  var urlkey='';
  var uploader = new UploaderBuilder()
    .debug(false)//开启debug，默认false
    .domain({http: "http://upload.qiniu.com", https: "https://up.qbox.me"})
    .retry(2)//设置重传次数，默认0，不重传
    .compress(0.5)//默认为1,范围0-1
    // .scale([200,0])  //第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
    .size(1024*1024)
    .chunk(true)
    .auto(true)
    .multiple(false)
    .accept(['.gif','.png','.jpg'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/
    .tokenShare(true)
    .tokenFunc(function (setToken,task) {
      getQiniuToken().then(res => {
        setToken(res.uploadToken);
      })
    })
    //任务拦截器
    .interceptor({
        //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
      onIntercept: function (task) {
        return task.file.size > 4 * 1024 * 1024;
      },
      //中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
      onInterrupt: function (task) {
        if (this.onIntercept(task)) {
          self.$Message.warning('请上传小于4m的文件')
          return true;
        }
        else {
          return false;
        }
      }
    }) 
    .listener({
      onReady(tasks) {
          //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
        //选择上传文件确定后,该生命周期函数会被回调。
        
      },onStart(tasks){
          //所有内部图片任务处理后执行
        //开始上传
        console.log('upload start')
        
      },onTaskGetKey(task){
        
      },onTaskProgress: function (task) {
          //每一个任务的上传进度,通过`task.progress`获取
        console.log(task.progress);
        
      },onTaskSuccess(task){
        //一个任务上传成功后回调
        console.log(task.result.key);//文件的key
        urlkey=task.result.key;
        self.imgsAdd(urlkey)
      },onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        
      },onTaskRetry(task) {
        //开始重传
        
      },onFinish(tasks){
          //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
              
      }
    }).build();
      uploader.chooseFile();
      event.stopPropagation();
    },
    imgsAdd (urlkey) {
      var self = this
      if (urlkey !== '') {
          urlkey = "http://7xlx4u.com1.z0.glb.clouddn.com/" + urlkey;
          if (urlkey !== 'http://7xlx4u.com1.z0.glb.clouddn.com/') {
            if (urlkey !== this.imgUrls) {
              self.postContent = self.postContent + "[图片]"
              console.log(self.postContent)
              self.imgArr.push(urlkey)
              self.imgUrls = urlkey
            }
          }
          urlkey = ""
        }
    }
  },
  watch: {
    postContent: function () {
      var contents = this.postContent
      var ind = contents.indexOf('[图片]')
      var i = 0
      while (ind > -1){
      	contents = contents.replace(/\[图片\]/, "<img style='max-width: 100%;' src='" + this.imgArr[i] + "' />")
      	i++
      	ind = contents.indexOf('[图片]')
      }
      store.dispatch('setPostContent', {
        title: this.postTitle,
        content: contents
      })
    }
  },
  mounted () {
    if (this.$route.query.edit == true) {
      this.postTitle = store.state.postEditContent.title
      this.postContent = store.state.postEditContent.content
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
.Postpost{
  padding: 15px 35px 0 35px;
  > span{
    display: block;
    width: 100%;
    height: 16.5px;
    font-size: 12px;
    line-height: 16.5px;
    text-align: left;
    padding-left: 8px;
    color: rgba(86,119,252,0.87);
  }
  input{
    font-size: 16px;
    line-height: 22.5px;
    color: rgba(0,0,0,0.87);
    width: 100%;
    padding: 8px 8px;
    margin-bottom: 17px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-bottom: 0.5px solid rgba(86,119,252,0.54);
    &::-webkit-input-placeholder{
      color: rgba(0,0,0,0.38);
    }
    &:focus{
      border-bottom: 2px solid rgba(86,119,252,0.87);
    }
  }
  textarea{
    box-sizing: border-box;
    background: #FAFAFA;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
    border-radius: 2px;
    width: 100%;
    height: 60vh;
    resize: none;
    margin-top: 9px;
    margin-bottom: 12px;
    padding: 14px 8px 0 8px;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0,0,0,0.87);
    letter-spacing: 0.5px;
    outline: none;
    &::-webkit-input-placeholder{
      color: rgba(0,0,0,0.38);
    }
  }
  > div{
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    font-size: 14px;
  }
  i{
    color: #5677FC;
    display: block;
    margin-left: 8px;
    text-align: left;
  }
}
</style>