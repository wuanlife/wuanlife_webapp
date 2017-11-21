<template>
<div class="myInfo">
  <img :src="saveInfos.avatar_url" @click="pushImg"/>
  <form>
    <div class="myInfoFormList">
      <label class="fontSizeOne textColorTwo">邮箱</label>
      <span class="fontSizeTwo myInfoEmail">{{ backMyInfo.mail }}</span>
      <button v-if="backMyInfo.mail_checked" class="fontSizeThere emailBtn">已验证</button>
      <button v-else class="fontSizeThere emailBtn" @click="toEmailVerification">验证</button>
    </div>
    <div class="myInfoFormList">
      <label class="fontSizeOne textColorOne">昵称</label>
      <input type="text" v-model.lazy="this.saveInfos.name" class="fontSizeTwo myInfoName" />
    </div>
    <div class="myInfoFormList">
      <label class="fontSizeOne textColorOne">性别</label>
      <input @click="sexF(1)" class="myInfoSexF" type="radio" id="one" value="男" v-bind:checked="isChecked1">
      <label class="fontSizeTwo myInfoSex" for="one">男</label>
      <input @click="sexF(2)" class="myInfoSexF" type="radio" id="Two" value="女" v-bind:checked="isChecked2">
      <label class="fontSizeTwo myInfoSex" for="Two">女</label>
      <input @click="sexF(3)" class="myInfoSexF" type="radio" id="There" value="不想透露" v-bind:checked="isChecked3">
      <label class="fontSizeTwo" for="There">不想透露</label>
    </div>
    <div class="myInfoFormList">
      <label class="fontSizeOne textColorOne">生日</label>
      <div class="datas" @click="handleClick">
        <span>{{ year }}年</span><span>{{ mouth }}月</span><span>{{ day }}日</span>
      </div>
      <DatePicker
        :open="open"
        :value="value3"
        confirm
        type="date"
        placement="top-start"
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-ok="handleOk">
        <a href="javascript:void(0)" @click="handleClick" style="opacity: 0;">
            <template v-if="value3 === ''">选择日期</template>
            <template v-else>{{ value3 }}</template>
        </a>
      </DatePicker>
    </div>
  </form>
  <button class="fontSizeTwo" @click="saveInfo">保存</button>
</div>
</template>

<script>
import { getSingleUser, changeUserInfo, emailVerification } from '../fetch/users'
import store from '../vuex/store'
import { UploaderBuilder, Uploader } from 'qiniu4js'
import { getQiniuToken } from '../fetch/qiniu'

// qiniu4js uploader object
  var urlkey='';
  var issuccess= false;
  var uploader = new UploaderBuilder()
    .debug(false)//开启debug，默认false
    .domain({http: "http://upload.qiniu.com", https: "https://up.qbox.me"})
    .retry(2)//设置重传次数，默认0，不重传
    .compress(0.5)//默认为1,范围0-1
    .scale([200,0])  //第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
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
          this.$Message.warning('请上传小于4m的文件');
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
        issuccess = true;
        document.getElementsByTagName("img")[0].src = process.env.QINIU_DOMAIN_URL+urlkey;
      },onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        
      },onTaskRetry(task) {
        //开始重传
        
      },onFinish(tasks){
          //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
              
      }
    }).build();

export default {
  name: 'myInfo',
  data () {
    return {
      backMyInfo: {},
      open: false,
      value3: '',
      year: '',
      mouth: '',
      day: '',
      saveInfos: {
        name: '',
        avatar_url: '',
        sex: '',
        birthday: ''
      },
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getSingleUser(id).then(response => {
      this.backMyInfo = response
      this.saveInfos.name = response.name
      this.saveInfos.avatar_url = response.avatar_url
      this.saveInfos.sex = response.sex
      this.saveInfos.birthday = response.birthday
      this.year = response.birthday.slice(0, 4)
      this.mouth = response.birthday.slice(5, 7)
      this.day = response.birthday.slice(8, 10)
      this.setSexF(response.sex)
    }).catch(error => {
      this.$Message.error(error)
    })
  },
  methods: {
    sexF: function (n) {
      this.isChecked1 = false
      this.isChecked2 = false
      this.isChecked3 = false
      switch (n){
        case 1:
          this.saveInfos.sex = "man"
          this.isChecked1 = true
          break;
        case 2:
          this.saveInfos.sex = "woman"
          this.isChecked2 = true
          break;
        case 3:
          this.saveInfos.sex = "secret"
          this.isChecked3 = true
          break;
        default:
          this.saveInfos.sex = "man"
          this.isChecked1 = true
          break;
      }
    },
    setSexF (isSex) {
      this.isChecked1 = false
      this.isChecked2 = false
      this.isChecked3 = false
      switch (isSex){
        case "man":
          this.isChecked1 = true
          break;
        case "woman":
          this.isChecked2 = true
          break;
        case "secret":
          this.isChecked3 = true
          break;
        default:
          this.isChecked1 = true
          break;
      }
    },
    handleClick () {
      this.open = !this.open;
    },
    handleChange (date) {
      this.value3 = date;
    },
    handleClear () {
      this.open = false;
    },
    handleOk () {
      this.open = false;
      this.year = this.value3.slice(0, 4)
      this.mouth = this.value3.slice(5, 7)
      this.day = this.value3.slice(8)
      this.saveInfos.birthday = this.value3
    },
    saveInfo () {
      let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      if (issuccess) {
        this.saveInfos.avatar_url = process.env.QINIU_DOMAIN_URL+urlkey
      }
      console.log(this.saveInfos)
      changeUserInfo(id, this.saveInfos).then(response => {
        this.$Message.success(response.success)
      }).catch(error => {
        console.log(error)
        this.$Message.error('保存失败'+ error)
      })
    },
    pushImg (event) {
      var self = this;
      this.imgShow = false;
      uploader.chooseFile();
      event.stopPropagation();
    },
    toEmailVerification () {
      let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      emailVerification(id).then(response => {
        this.$Message.success('验证邮件已发送，请注意查收')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  button, input, select{
    outline: none;
  }
  .myInfo{
    img{
      width: 70px;
      height: 70px;
      border-radius: 100%;
      margin-top: 26px;
      margin-bottom: 21.5px;
    }
    form{
      .myInfoFormList{
        width: 304px;
        margin: 0 auto;
        margin-bottom: 21px;
        padding-left: 17.5px;
        box-sizing: border-box;
        text-align: left;
        > div.datas{
          width: 100%;
          border: none;
          margin-left: -16.5px;
          > span{
            font-size: 16px;
            line-height: 22.5px;
            height: 22.5px;
            display: inline-block;
            color: #212121;
            border-bottom: 1px solid rgba(86,119,252,0.87);
            padding: 0 16.5px;
            margin-right: 15px;
          }
        }
        .fontSizeOne{
          display: block;
        }
        .myInfoEmail{
          color: rgba(0,0,0,0.56);
        }
        > button.emailBtn{
          width: 63px;
          height: 25px;
          border: none;
          border-radius: 4px;
          background: #5677FC;
          color: #FFFFFF;
          float: right;
        }
        .myInfoName{
          color: rgba(0,0,0,0.87);
          border: none;
        }
        input.myInfoSexF{
          width: 10px;
          height: 10px;
          box-sizing: border-box;
          appearance: none;
          position: relative;
          border: 2px solid #9a9a9a;
          border-radius: 100%;
          &:checked{
            border: 3.5px solid #6c89fc;
            border-radius: 100%;
          }
        }
        .myInfoSex{
          display: inline-block;
          margin-right: 40.5px;
        }
      }
      div:nth-child(2){
        border-bottom: 1px solid rgba(86,119,252,0.87);
      }
    }
    > button {
      width: 304px;
      border: none;
      background-color: #5677FC;
      font-size: 16px;
      line-height: 22.5px;
      color: rgba(255,255,255,0.87);
      padding: 11px 136px;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
      margin-top: 44px;
    }
  }
  .fontSizeOne, .fontSizeThere{
    font-size: 12px;
    line-height: 16.5px;
  }
  .fontSizeOne{
    margin-bottom: 6px;
  }
  .fontSizeTwo{
    font-size: 16px;
    line-height: 27.5px;
  }
  .textColorOne{
    color: rgba(86,119,252,0.87);
  }
  .textColorTwo{
    color: rgba(0,0,0,0.38);
  }
  select{
    border: none;
    border-bottom: 1px solid rgba(86,119,252,0.87);
    -webkit-appearance:none;
    appearance:none;
    margin-right: 15px;
  }
  select:nth-of-type(1){
    width: 90px;
    box-sizing: border-box;
    padding-left: 16.5px;
    margin-left: -16.5px;
  }
  select:nth-of-type(2), select:nth-of-type(3){
    width: 60px;
    box-sizing: border-box;
    padding-left: 13.5px;
  }
</style>