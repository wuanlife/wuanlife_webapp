<template>
<div class="getPassword">
  <span v-if="isFocus">邮箱 <span>{{ showTitle }}</span></span>
  <span v-else></span>
  <input v-model="getPasswordEmail" type="email" placeholder="邮箱" @click="inputFocus" />
  <button @click="getPasswords">找回密码</button>
</div>
</template>

<script>
import store from '../vuex/store'
import { getUserPassword } from '../fetch/users'
export default {
  name: 'getPassword',
  data(){
    return {
      getPasswordEmail: '', 
      isFocus: false,
      isOk: false,
    }
  },
  methods: {
    inputFocus () {
      this.isFocus = true
    },
    getPasswords () {
      if (this.isOk == true) {
        getUserPassword(this.getPasswordEmail).then(response => {
        console.log(response.success)
        this.$Message.success(response.success)
        this.$router.push({ path: '/setPassword', query: {title: '找回密码'} })
      }).catch(error => {
        console.log(error)
        this.$Message.error(error)
      })
      }
    }
  },
  computed: {
    showTitle: function () {
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (this.getPasswordEmail == '') {
        return '不能为空！'
      }
      if (!reg.test(this.getPasswordEmail)) {
        return '请注意格式，输入合法邮箱！'
      }
      this.isOk = true
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.getPassword{
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
    margin-bottom: 139px;
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
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
  }
}
</style>