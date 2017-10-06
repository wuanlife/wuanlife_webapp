<template>
<div class="changePwd">
  <form>
    <span v-if="passwordtitle">原密码 <span>{{ oldPassword }}</span></span>
    <span v-else></span>
    <input type="password" placeholder="原密码" v-model="changePwdForm.password" @click="passwordtitleF(1)" />
    
    <span v-if="newpasswordtitle">新密码 <span>{{ sameOldPassword }}</span></span>
    <span v-else></span>
    <input type="password" placeholder="新密码" v-model="changePwdForm.newpassword" @click="passwordtitleF(2)" />
    
    <span v-if="confirmpasswordtitle">确认密码 <span>{{ sameNewPassword }}</span></span>
    <span v-else></span>
    <input type="password" placeholder="确认密码" v-model="changePwdForm.psw" @click="passwordtitleF(3)" />
  </form>
  <button @click="changePassword()" v-bind:class="{'isOk': isMessage}">修改密码</button>
</div>
</template>

<script>
import { changeUserPassword } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'changePwd',
  data () {
    return {
      changePwdForm: {
        password: '',
        newpassword: '',
        psw: '',
      },
      passwordtitle: false,
      newpasswordtitle: false,
      confirmpasswordtitle: false,
      changePasswordMessage: '',
      isoldPassword: false,
      issameOldPassword: false,
      issameNewPassword: false,
      isSuccess: false,
    }
  },
  computed: {
    oldPassword: function () {
      if (this.changePwdForm.password == '') {
        return '原密码不能为空!'
      }
      this.isoldPassword = true
      return ''
    },
    sameOldPassword: function () {
      let reg1 = /^[a-zA-Z]\w{5,17}$/;
      if (this.changePwdForm.newpassword == ''){
        return '新密码不能为空!'
      }
      if (!reg1.test(this.changePwdForm.newpassword)) {
        return '密码只能由不少于6位的数字、字母、下划线组成'
      }
      if (this.changePwdForm.password === this.changePwdForm.newpassword) {
        return '旧密码不能和新密码一样！'
      }
      this.issameOldPassword = true
      return ''
    },
    sameNewPassword: function () {
      if (this.changePwdForm.newpassword == ''){
        return '请再次输入新密码!'
      }
      if (this.changePwdForm.newpassword !== this.changePwdForm.psw) {
        return '两次输入的密码不一致！'
      }
      this.issameNewPassword = true
      return ''
    },
    isMessage: function () {
      if(this.isoldPassword) {
        if(this.issameOldPassword) {
          if (this.issameNewPassword) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    passwordtitleF (n) {
      var self = this;
      self.passwordtitle = false;
      self.newpasswordtitle = false;
      self.confirmpasswordtitle = false;
      switch (n){
        case 1:
          self.passwordtitle = true;
          break;
        case 2:
          self.newpasswordtitle = true;
          break;
        case 3:
          self.confirmpasswordtitle = true;
          break;
        default:
          break;
      }
    },
    changePassword () {
      let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      if (this.isMessage) {
        changeUserPassword(id, this.changePwdForm).then(response => {
          this.$Message.success('修改成功')
        }).catch(error => {
          this.isSuccess = false
          console.log(error)
          this.$Message.error(error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.changePwd{
  form{
    width: 305px;
    margin: 0 auto;
    padding-top: 48.5px;
    > span{
      font-size: 12px;
      color: rgba(86,119,252,0.87);
      display: block;
      margin-left: 7px;
      line-height: 16.5px;
      height: 12.5px;
      width: 100%;
      float: left;
      text-align: left;
      > span{
        color: red;
      }
    }
    input{
      width: 100%;
      border: none;
      border-bottom: 1px solid rgba(86,119,252,0.54);
      padding: 0 7px 8px 7px;
      font-size: 16px;
      line-height: 22.5px;
      margin-bottom: 40.5px;
      outline: none;
      &:focus{
        border-bottom: 2px solid rgba(86,119,252,0.87);
      }
    }
  }
  button{
    width: 305px;
    background: rgba(0,0,0,0.3);
    border-radius: 4px;
    border: none;
    font-size: 16px;
    line-height: 22.5px;
    color: rgba(255,255,255,0.87);
    box-sizing: border-box;
    padding: 10.5px 120px;
    margin-top: 25px;
  }
  .isOk{
    background: #5677FC;
  }
  > p{
    padding: 10px 20px;
    border-top: 6px solid #5677FC;
    color: green;
    background-color: rgba(0,0,0,0.3);
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
  }
  .success{
    animation: success 1.5s;
  }
  @keyframes success{
  	0%{
  	  opacity: 0;
  	}
  	25%{
  	  opacity: 1;
  	}
  	75%{
  	  opacity: 1;
  	}
  	100%{
  	  opacity: 0;
  	}
  }
}
</style>