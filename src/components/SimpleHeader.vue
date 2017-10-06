<template>
<div id="simpleHeader">
    <i class="iconfont icon-goback" @click="$router.go(-1)"></i>
    <p>{{ $route.query.title }}</p>
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
    height: 51px;
    background: #5677fc;
    padding: 0 0.3rem;
    margin-bottom: 6px;
    box-shadow:
        0 0 4px 0 rgba(0,0,0,0.12), 
        0 4px 4px 0 rgba(0,0,0,0.24);

    i.iconfont {
        opacity:0.87;
        font-size:20px;
        color:#ffffff;
        margin-right: 15px;
    }
    p {
        font-size:20px;
        color: rgba(255,255,255,0.87);
    }
}

</style>
