<template>
<div class="login" id="login">
    <form>
      <span v-if="LoginEmail">邮箱 {{email_notice}}</span>
      <span v-else></span>
      <input type="email" placeholder="邮箱" v-model="email" @click="LoginTitle(1)" />
      <span v-if="LoginPassWord">密码 {{password_notice}}</span>
      <span v-else></span>
      <input type="password" placeholder="密码" v-model="password" @click="LoginTitle(2)" />
      <button @click="login()">登录</button>
      <div>
        <button @click="$router.push({path: '/signup', query: {title: '注册帐号'}})">注册帐号</button>
        <button @click="$router.push({path: '/getPassword', query: {title: '找回密码'}})">找回密码</button>
      </div>
    </form>
</div>
</template>

<script>
import util from '../util'
import store from '../vuex/store'
export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            LoginEmail: false,
            LoginPassWord: false,
        }
    },
    computed: {
        email_notice: function() {
            let reg1 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(this.email == ''){
              return '邮箱为空'
            }
            if (!reg1.test(this.email)) {
              return '格式不正确'
            }
            return ''
        },  
        password_notice: function() {
            if(this.password == '') {
                return '密码为空'
            } else {
                return ''
            }
        },
    },
    methods:{
        //登录逻辑
        login(){
            if(this.email!='' && this.password!=''){
                this.toLogin();
            } else {
                this.$Message.warning('请填写表单！')
            }
        },
        //登录请求
        toLogin(){
            let self = this;
            store.dispatch('Login', {
              mail: this.email,
              password: this.password
            })
//          api.Login({
//            mail: this.email,
//            password: this.password
//          }).then(function (response) {
//            self.loading = false;
//            console.log("登录成功" + response['Access-Token']);
//            util.storeWithExpiration.set('user', response, 600000)
//            self.$store.dispatch("loadUserInfo", response)
//            console.log("user:   "+self.$store.state.user)
//            self.$router.push({path: '/'})
//          }).catch(function (error) {
//            console.log("err： " + error);
//          })
            /*
            api.Login({
                user_email: this.account,
                password: this.password,
            }).then(function(response) {
                self.isLoading = false;
                util.storeWithExpiration.set('user', response, 600000)
                self.$store.dispatch("loadUserInfo")
                self.$router.push({path: '/'})
            }).catch(function(error) {
                self.isLoading = false;
                console.log(error);
            })
            */
        },
        LoginTitle (n) {
          var self = this;
          self.LoginEmail = false;
          self.LoginPassWord = false;
          switch (n){
            case 1:
              self.LoginEmail = true;
              break;
            case 2:
              self.LoginPassWord = true;
              break;
          }
        }
    },
    mounted() {
        if(this.$route.query.title == '返回') {
          this.$Message.warning('没有登录，请登录！')
        }
    },
}
</script>

<style lang="scss" scoped>
.login {
  form{
    padding: 0 35px;
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin-top: 48px;
    span{
      font-size: 12px;
      line-height: 16.5px;
      height: 16.5px;
      padding-left: 8px;
      color: rgba(86,119,252,0.87);
      width: 100%;
      display: block;
      text-align: left;
    }
    input{
      width: 100%;
      padding: 8px;
      margin-bottom: 42px;
      outline: none;
      font-size: 16px;
      line-height: 22.5px;
      box-sizing: border-box;
      color: rgba(0,0,0,0.87);
      &::-webkit-input-placeholder{
        color: rgba(0,0,0,0.38);
      }
      border: none;
      border-bottom: 0.5px solid rgba(86,119,252,0.54);
      &:focus{
        border-bottom: 2px solid rgba(86,119,252,0.87);
      }
    }
    > button{
      border: none;
      font-size: 16px;
      line-height: 22.5px;
      color: rgba(255,255,255,0.87);
      background: #5677FC;
      border-radius: 4px;
      width: 100%;
      height: 44px;
      margin-top: 24px;
      margin-bottom: 22px;
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
    }
    > div{
      width: 100%;
      display: flex;
      justify-content: space-around;
      > button{
        font-size: 12px;
        line-height: 16.5px;
        color: rgba(86,119,252,0.87);
        background-color: #fff;
        border: none;
      }
    }
  }
}
</style>