<template>
<div class="setPassword">
  <span v-if="isFocus1">新密码 <span>{{ showTitle1 }}</span></span>
  <span v-else></span>
  <input v-model="Password1" type="password" placeholder="新密码" @click="inputFocus(1)" />
  <span v-if="isFocus2">确认密码 <span>{{ showTitle2 }}</span></span>
  <span v-else></span>
  <input v-model="Password2" type="password" placeholder="确认密码" @click="inputFocus(2)" />
  <button @click="setPasswords">重置密码</button>
</div>
</template>

<script>
import store from '../vuex/store'
import { setUserPassword } from '../fetch/users'
export default {
  name: 'getPassword',
  data(){
    return {
      Password1: '',
      Password2: '',
      isFocus1: false,
      isFocus2: false,
      isOk: false,
    }
  },
  methods: {
    inputFocus (n) {
      this.isFocus1 = false
      this.isFocus2 = false
      switch (n){
      	case 1:
      	  this.isFocus1 = true
      	  break;
      	case 2:
          this.isFocus2 = true
          break;
      	default:
      	  break;
      }
    },
    setPasswords () {
      let token = JSON.parse(localStorage.getItem("user"))['Access-Token'] || store.state.token
      if (this.isOk == true) {
        setUserPassword(this.Password2, token).then(response => {
        console.log(response.success)
        this.$Message.success(response.success)
        this.$router.push('login')
      }).catch(error => {
        console.log(error)
        this.$Message.error(error)
      })
      }
    }
  },
  computed: {
    showTitle1: function () {
      var reg = /^[a-zA-Z]\w{5,17}$/;
      if (this.Password1 == '') {
        return '不能为空！'
      }
      if (!reg.test(this.Password1)) {
        return '字母开头，长度大于6，字母、数字和下划线组成'
      }
      return ''
    },
    showTitle2: function () {
      if (this.Password1 !== this.Password2) {
        return '密码不一致，请重新输入'
      }
      this.isOk = true
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.setPassword{
  width: 100%;
  box-sizing: border-box;
  padding: 49px 35px 0 35px;
  > input{
    width: 100%;
    font-size: 16px;
    line-height: 22.5px;
    color: rgba(0,0,0,0.87);
    border: none;
    outline: none;
    margin-bottom: 25px;
    padding: 0 8px 9px 8px;
    &:-webkit-input-placeholder{
      color: rgba(0,0,0,0.38);
    }
    border-bottom: 0.5px solid rgba(86,119,252,0.54);
    &:focus{
      border-bottom: 2px solid rgba(86,119,252,0.87);
    }
  }
  > span{
    font-size: 12px;
    line-height: 16.5px;
    height: 16.5px;
    color: rgba(86,119,252,0.87);
    width: 100%;
    display: block;
    padding: 0 8px;
    text-align: left;
    > span{
      color: red;
    }
  }
  > button {
    width: 100%;
    margin-top: 41px;
    border: none;
    background-color: #5677FC;
    font-size: 16px;
    line-height: 22.5px;
    color: #FFFFFF;
    opacity: 0.87;
    border-radius: 4px;
    padding: 11px 0;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
  }
}
</style>