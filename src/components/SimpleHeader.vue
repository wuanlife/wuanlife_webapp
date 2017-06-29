<template>
<div id="simpleHeader">
    <i class="iconfont icon-goback"></i>
    <p>{{$route.params.title}}</p>
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
    height: 102px;
    background: #5677fc;
    margin-bottom: 12px;
    box-shadow:
        0 0 8px 0 rgba(0,0,0,0.12), 
        0 8px 8px 0 rgba(0,0,0,0.24);


    .defaultHeader-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 102px;
        padding: 0 0.6rem;

        opacity:0.87;
        font-size:40px;
        color:#ffffff;
        text-align:left;
        h1 {
            font-size: 40px;
        }
        i.iconfont {
            font-size: 40px;
        }
    }
    ul.defaultHeader-tabs {
        display: flex;
        height: 96px;
        li {
            display: flex;
            justify-content: center;
            align-items: center;

            flex: 1;
            a {
                color: #c0cbfe;
                &.router-link-active {
                    text-decoration: none;
                    color: #fff;
                }
            }
            i.iconfont {
                font-size: 40px;
            }
        }
    }   
}

</style>
