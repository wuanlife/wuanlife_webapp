<template>
<div class="creatPlanet">
  <form>
    <span v-if="creatPlanetNameTitle">星球名称</span>
    <span v-else></span>
    <input class="creatPlanetName" v-model.lazy="creatPlanetForm.planetName" placeholder="星球名称" @click="creatPlanetNameTitleF(1)" />
    <label>星球头像（选填）</label>
    <div class="val">
      <div v-show="imgShow" class="addImg" @click="focusStyleF()">
        <i class="iconfont icon-cross"></i>
      </div>
      <img id="ImgUrl" v-model.lazy="creatPlanetForm.img_url"  @click="focusStyleF()"/>
    </div>
    <span v-if="planetIntroductionTitle">星球介绍（选填）</span>
    <span v-else></span>
    <textarea v-model="creatPlanetForm.planetIntroduction" placeholder="星球介绍（选填）"  @click="creatPlanetNameTitleF(2)"></textarea>
    <div class="creatPlanetSelect">
      <select v-model.lazy="creatPlanetForm.selected">
    	  <option disabled value="">加入星球的方式</option>
    	  <option>允许任何人加入</option>
    	  <option>验证水电费</option>
      </select>
      <div></div>
    </div>
  </form>
  <button @click="createPlanet">创建星球</button>
</div>
</template>

<script>
import { createGroup } from '../fetch/groups'
import { UploaderBuilder, Uploader } from 'qiniu4js'
import store from '../vuex/store'
import { getQiniuToken } from '../fetch/qiniu'

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
          console.log('请上传小于4m的文件');
          return true;
        }
        else {
          return false;
        }
      }
    }) 
    .listener({
      onTaskProgress: function (task) {
          //每一个任务的上传进度,通过`task.progress`获取
        console.log(task.progress);
        
      },onTaskSuccess(task){
        //一个任务上传成功后回调
        console.log(task.result.key);//文件的key
        urlkey=task.result.key;
        document.getElementById("ImgUrl").src = "http://7xlx4u.com1.z0.glb.clouddn.com/"+urlkey;
      },
    }).build();

export default {
  name: 'creatPlanet',
  data () {
    return {
      creatPlanetForm: {
        selected: '',
        planetName: '',
        img_url: 'http://7xlx4u.com1.z0.glb.clouddn.com/'+urlkey,
        planetIntroduction: '',
      },
      creatPlanetNameTitle: false,
      planetIntroductionTitle: false,
      imgShow: true,
    }
  },
  computed: {
    isSelect: function () {
      if (this.creatPlanetForm.selected == '允许任何人加入') {
        return false
      }
      if (this.creatPlanetForm.selected == '验证水电费') {
        return true
      }
    }
  },
  methods: {
    creatPlanetNameTitleF (n) {
      var self = this;
      self.creatPlanetNameTitle = false;
      self.planetIntroductionTitle = false;
      switch (n){
        case 1:
          self.creatPlanetNameTitle = true;
          break;
        case 2:
          self.planetIntroductionTitle = true;
          break;
      }
    },
    focusStyleF () {
      document.getElementsByTagName("label")[0].className = "focusStyle";
      this.isImgUrl = false;
      this.pushImg();
    },
    createPlanet () {
      var self = this
      this.creatPlanetForm.img_url = 'http://7xlx4u.com1.z0.glb.clouddn.com/'+urlkey
      this.creatPlanetForm.selected = this.isSelect
      createGroup(this.creatPlanetForm).then(response => {
        console.log("星球创建成功： id = "+ response.id)
        this.$Message.success('星球创建成功')
        this.$router.push({path: `/planet/${response.id}`, query: {name: `${self.creatPlanetForm.planetName}`}})
      }).catch(error => {
        console.log(error)
        this.$Message.error(error)
      })
    },
    pushImg (event) {
      var self = this;
      this.imgShow = false;
      uploader.chooseFile();
      //event.stopPropagation();
    }
  }
}
</script>

<style lang="scss" scoped>
.creatPlanet{
  padding: 0 36px;
  form{
    > span{
      width: 100%;
      height: 16.5px;
      display: block;
      font-size: 12px;
      line-height: 16.5px;
      color: rgba(86,119,252,0.87);
      margin-bottom: 2px;
      padding-left: 8px;
      text-align: left;
      box-sizing: border-box;
    }
    .creatPlanetName{
      font-size: 16px;
      line-height: 22.5px;
      border: none;
      box-sizing: border-box;
      display: block;
      padding: 8px 8px;
      width: 100%;
      color: rgba(0,0,0,0.87);
      &::-webkit-input-placeholder{
        color: rgba(0,0,0,0.38);
      }
      border-bottom: 1px solid rgba(86,119,252,0.54);
      outline: none;
      &:focus{
        border-bottom: 2px solid rgba(86,119,252,0.87);
      }
    }
    label{
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.38);
      display: block;
      margin-top: 25px;
      text-align: left;
      padding-left: 8px;
      &.focusStyle{
        font-size: 12px;
        line-height: 16.5px;
        color: rgba(86,119,252,0.87);
      }
    }
    .val{
      width: 100%;
      position: relative;
      > .addImg, img{
      width: 70px;
      height: 70px;
      border-radius: 100%;
      display: block;
      margin: 15px auto 18px auto;
      background: #FAFAFA;
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
    }
    > .addImg{
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        color: #5677FC;
      }
    }
    }
    textarea{
      width: 100%;
      height: 20vh;
      padding: 14px 8px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0,0,0,0.87);
      background: #FAFAFA;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
      border-radius: 2px;
      outline: none;
      resize: none;
      &::-webkit-input-placeholder{
        color: rgba(0,0,0,0.38);
      }
    }
    .creatPlanetSelect{
      width: 100%;
      box-sizing: border-box;
      position: relative;
      margin-top: 30px;
      margin-bottom: 32px;
      select{
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      border: none;
      background: #FAFAFA;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
      border-radius: 2px;
      outline: none;
      font-size: 14px;
      line-height: 20px;
      padding-left: 8px;
      color: rgba(0,0,0,0.87);
      appearance: none;
      }
      > div{
        width: 0;
        height: 0;
        border-left: 14px solid rgba(0,0,0,0.54);
        border-radius: 3px;
        border-top:  7px solid transparent;
        border-bottom:  7px solid transparent;
        position: absolute;
        top: 50%;
        right: 26px;
        transform: translateY(-50%);
      }
      > div.creatPlanetSelectAinmate{
        animation: selectMove 2s;
        border-top: 14px solid rgba(0,0,0,0.54);
        border-left:  7px solid transparent;
        border-right:  7px solid transparent;
        border-bottom: none;
      }
      @keyframes selectMove{
      	0%{
      	  border-left: 14px solid rgba(0,0,0,0.54);
      	  border-top:  7px solid transparent;
          border-bottom:  7px solid transparent;
      	}
      	50%{
          border-left: 7px solid rgba(0,0,0,0.54);
          border-top:  7px solid rgba(0,0,0,0.54);
          border-bottom:  7px solid rgba(0,0,0,0.54);
          border-right:  7px solid rgba(0,0,0,0.54);
        }
      	100%{
      	  border-top: 14px solid rgba(0,0,0,0.54);
          border-left:  7px solid transparent;
          border-right:  7px solid transparent;
          border-bottom: none;
      	}
      }
    }
  }
  button{
    background: #5677FC;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    line-height: 22.5px;
    color: rgba(255,255,255,0.87);
    height: 44px;
    border: none;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
  }
}
</style>