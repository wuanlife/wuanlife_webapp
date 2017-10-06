<template>
<div class="signUp">
  <span v-if="isFocus1">邮箱 <span>{{ showTitle1 }}</span></span>
  <span v-else></span>
  <input v-model="email" type="email" placeholder="邮箱" @click="inputFocus(1)" />
  
  <span v-if="isFocus2">昵称 <span>{{ showTitle2 }}</span></span>
  <span v-else></span>
  <input v-model="name" type="text" placeholder="昵称" @click="inputFocus(2)" />
  
  <span v-if="isFocus3">密码 <span>{{ showTitle3 }}</span></span>
  <span v-else></span>
  <input v-model="password" type="password" placeholder="密码" @click="inputFocus(3)" />
  
  <span v-if="isFocus4">邀请码 <span>{{ showTitle4 }}</span></span>
  <span v-else></span>
  <input v-model="code" type="text" placeholder="邀请码" @click="inputFocus(4)" />
  <button @click="toSigup">注册</button>
</div>
</template>

<script>
import store from '../vuex/store'
import { signUp } from '../fetch/users'
export default {
  name: 'signUp',
  data(){
    return {
      email: '',
      name: '',
      password: '',
      code: '',
      isFocus1: false,
      isFocus2: false,
      isFocus3: false,
      isFocus4: false,
    }
  },
  methods: {
    inputFocus (n) {
      this.isFocus1 = false
      this.isFocus2 = false
      this.isFocus3 = false
      this.isFocus4 = false
      switch (n){
      	case 1:
      	  this.isFocus1 = true
          break;
        case 2:
          this.isFocus2 = true
          break;
        case 3:
          this.isFocus3 = true
          break;
        case 4:
          this.isFocus4 = true
          break;
      	default:
      	  break;
      }
    },
    toSigup () {
      signUp({
        name: this.name,
        mail: this.email,
        password: this.password,
        code: this.code
      }).then(response => {
        console.log("注册成功")
        this.$Message.success('注册成功')
        store.dispatch('SignUp', response)
      }).catch(error => {
        this.$Message.error('注册失败'+error)
      })
    }
  },
  computed: {
    showTitle1: function () {
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (this.email == '') {
        return '邮箱不能为空'
      }
      if (!reg.test(this.email)) {
        return '邮箱格式不正确'
      }
    },
    showTitle2: function () {
      if (this.name == '') {
        return '昵称不能为空'
      }
    },
    showTitle3: function () {
      var reg = /^[a-zA-Z]\w{5,17}$/
      if (this.password == '') {
        return '密码不能为空'
      }
      if (!reg.test(this.password)) {
        return '字母开头，只能包含字母、数字和下划线'
      }
    },
    showTitle4: function () {
      if (this.code == '') {
        return '邀请码不能为空'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.signUp{
  width: 100%;
  box-sizing: border-box;
  padding: 25px 35px 0 35px;
  > input{
    width: 100%;
    font-size: 16px;
    line-height: 22.5px;
    color: rgba(0,0,0,0.87);
    border: none;
    outline: none;
    margin-bottom: 24px;
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
    border: none;
    background-color: #5677FC;
    font-size: 16px;
    line-height: 22.5px;
    color: #FFFFFF;
    opacity: 0.87;
    border-radius: 4px;
    padding: 11px 0;
    margin-top: 42px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
  }
}
</style>