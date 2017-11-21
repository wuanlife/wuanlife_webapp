<template>
<div id="defaultHeader">
    <div class="defaultHeader-head">
        <h1>{{title}}</h1>
        <i class="iconfont icon-search" @click="$router.push('search')"></i>
    </div>
    <ul class="defaultHeader-tabs">
        <li name="1">
            <router-link :to="{name:'index', query:{title: '午安网'}}"><i @click="handleIconClick(1)" class="iconfont icon-home"></i></router-link>
        </li>
        <li name="2">
            <router-link :to="{name:'myplanet', query:{title: '星球'}}"><i @click="handleIconClick(2)" class="iconfont icon-lightPlanet"></i></router-link>
        </li>
        <!--<li name="3">
            <router-link :to="{name:'discovery', params:{title: '发现'}}"><i class="iconfont icon-discovery"></i></router-link>
        </li>-->
        <li name="3">
            <router-link :to="{name:'message', query:{title: '消息'}}"><i @click="handleIconClick(3)" class="iconfont icon-message"></i></router-link>
        </li>
        <li name="4">
            <router-link :to="{name:'profile', query:{title: '我的'}}"><i @click="handleIconClick(4)" class="iconfont icon-me"></i></router-link>
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
            title: '午安网'
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
        handleIconClick(n) {
            switch (n) {
                case 1:
                    this.title = '午安网'
                    break;
                case 2:
                    this.title = '星球'
                    break;
                case 3:
                    this.title = '消息'
                    break;
                case 4:
                    this.title = '我的'
                    break;
                default:
                    break;
            }
        },
        logout() {
            util.storeWithExpiration.set('user', {username: null})
            this.$store.dispatch("loadUserInfo")
        }
    },
    mounted() {
        this.$store.dispatch("loadUserInfo")
        console.dir(this.$route)
        if (!this.$route.query.title) {
            this.title = '午安网'
        } else {
          if (this.$route.query.title === '午安网' || this.$route.query.title === '主页') {
            this.title = '午安网'
          }
        }
    }
}
</script>

<style style lang="scss" scoped>
@function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
}
#defaultHeader {
    background: #5677fc;
    margin-bottom: 6px;

    .defaultHeader-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 51px;
        padding: 0 0.3rem;

        opacity:0.87;
        font-size:20px;
        color:#ffffff;
        text-align:left;
        h1 {
            font-size: 20px;
        }
        i.iconfont {
            font-size: 20px;
        }
    }
    ul.defaultHeader-tabs {
        display: flex;
        height: 48px;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);
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
                font-size: 20px;
            }
        }
    }   
}

</style>
