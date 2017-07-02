<template>
<div class="login" id="login">
    <form>
        <section class="content">
            <span class="input input--jiro">
                <input class="input__field input__field--jiro" type="text" id="input-10" v-model="email" />
                <label class="input__label input__label--jiro" for="input-10">
                    <span class="input__label-content input__label-content--jiro">email {{email_notice}}</span>
                </label>
            </span>
        </section>
        <section class="content">
            <span class="input input--jiro">
                <input class="input__field input__field--jiro" type="text" id="input-10" v-model="password" />
                <label class="input__label input__label--jiro" for="input-10">
                    <span class="input__label-content input__label-content--jiro">password {{password_notice}}</span>
                </label>
            </span>
        </section>
        <button class="wuan-button" type="button" :class="{loading : isLoading}" @click="login()">登录</button>
        <div class="login-links">
            <router-link :to="'/signup'">signup</router-link>
            <router-link :to="'/reset_pwd'">resetpwd</router-link>
        </div>
    </form>
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
            email: '',
            password: ''
        }
    },
    computed: {
        email_notice: function() {
            if(this.email == '') {
                return 'email为空'
            } else {
                return ''
            }
        },  
        password_notice: function() {
            if(this.password == '') {
                return '密码为空'
            } else {
                return ''
            }
        },
    },
    components:{
        Loading
    },
    methods:{
        //登录逻辑
        login(){
            if(this.account!='' && this.password!=''){
                this.toLogin();
            } else {
                alert('input something')
            }
        },
        //登录请求
        toLogin(){
            let self = this;
            this.isLoading = true;
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
        }
    },
    mounted() {
        if(!this.$route.params.title) {
            this.$route.params.title = '登录'
            console.dir(this.$route); 
        }
    },
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex: 1;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        background-color: #fff;
        .content {
            width: 100%;
        }
        button.wuan-button {
            width: 80%;
            max-width: 611px;
        }
        div.login-links {
            display: flex;
            justify-content: space-around;
            margin-top: 45px;
            width: 80%;
            max-width: 611px;
            a {
                font-size:24px;
                color:rgba(86,119,251,0.87);
            }
        }
    }
}
</style>