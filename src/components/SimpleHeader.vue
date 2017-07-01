<template>
<div id="simpleHeader">
    <i class="iconfont icon-goback" @click="$router.go(-1)"></i>
    <p>登录</p>
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
            util.storeWithExpiration.set('user', {username: null})
            this.$store.dispatch("loadUserInfo")
        }
    },
    mounted() {
        this.$store.dispatch("loadUserInfo")
        console.dir(this.$route)
    }
}
</script>

<style style lang="scss" scoped>
@function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
}
#simpleHeader {
    display: flex;
    align-items: center;
    height: 102px;
    background: #5677fc;
    padding: 0 0.6rem;
    margin-bottom: 12px;
    box-shadow:
        0 0 8px 0 rgba(0,0,0,0.12), 
        0 8px 8px 0 rgba(0,0,0,0.24);

    i.iconfont {
        opacity:0.87;
        font-size:40px;
        color:#ffffff;
        margin-right: 30px;
    }
    p {
        opacity:0.87;
        font-size:40px;
        color:#ffffff;
    }
}

</style>
