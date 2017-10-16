<template>
<div class="NullHeader">
  <i class="iconfont icon-goback" @click="$router.go(-1)"></i>
  <button v-if="this.$store.state.userInfo.id === undefined ? false : true" @click="logout()">退出登录</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import util from '@/util'
export default {
    name: 'header',
    data() {
        return {
            
        };
    },
    computed: {
        ...mapState([
            'user'
        ]),
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleIconClick() {

        },
        logout() {
//          util.storeWithExpiration.set('user', {username: null})
            this.$store.dispatch("Logout")
            console.log("退出成功")
            this.$Message.success('退出成功')
            this.$router.push({path: '/'})
        }
    },
    mounted() {
        this.$store.dispatch("loadUserInfo")
        console.dir(this.$route)
    }
}
</script>

<style lang="scss" scoped>
.NullHeader{
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 17px 16px 0 16px;
  left: 0;
  top: 0;
  box-sizing: border-box;
  i{
    width: 16px;
    height: 16px;
    color: rgba(86,119,252,0.87);
  }
  button{
    font-size: 14px;
    line-height: 20px;
    color: rgba(86,119,252,0.87);
    border: none;
    background-color: #fff;
  }
}
</style>