<template>
<div class="login" id="login">

</div>
</template>

<script>
import Loading from '../components/Loading.vue'
import util from '../util'
import api from '../fetch/api'
export default {
  name: 'Login',
  data(){
    return {
        isLoading: false,
        account: '',
        password: ''
    }
  },
  components:{
    Loading
  },
  methods:{
    //登录逻辑
    login(){
        if(this.account!='' && this.password!=''){
            this.toLogin();
        }
    },
    //登录请求
    toLogin(){
        let self = this;
        this.isLoading = true;
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
    }
  },
  mounted() {
    if(!this.$route.params.title) {
        this.$route.params.title = '登录'
        console.dir(this.$route); 
    }
  }
}
</script>

<style lang="scss" scoped>
.login {

}
</style>