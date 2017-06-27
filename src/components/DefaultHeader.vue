<template>
<div id="defaultHeader">
    <div class="defaultHeader-head">
        <h1>消息</h1>
        <i class="iconfont icon-search"></i>
    </div>
    <ul class="defaultHeader-tabs">
        <li name="1">
            <i class="iconfont icon-home"></i>
        </li>
        <li name="2">
            <i class="iconfont icon-lightPlanet"></i>
        </li>
        <li name="3">
            <i class="iconfont icon-discovery"></i>
        </li>
        <li name="4">
            <i class="iconfont icon-message"></i>
        </li>
        <li name="5">
            <i class="iconfont icon-me"></i>
        </li>
    </ul> 
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
    }
}
</script>

<style style lang="scss" scoped>
@function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
}
#defaultHeader {
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
            color: #c0cbfe;
            i.iconfont {
                font-size: 40px;
            }
        }
    }   
}

</style>
