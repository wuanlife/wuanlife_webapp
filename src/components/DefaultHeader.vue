<template>
<div id="defaultHeader">
    <div class="defaultHeader-head">
        <h1>{message}</h1>
        <i>search</i>
    </div>
    <ul class="defaultHeader-tabs">
        <li name="1">
            <p><i class="iconfont icon-profile"></i>fuck</p>
        </li>
        <li name="2">
            <p>fuck</p>
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
#defaultHeader {
    background: #aaaaaa;
    .defaultHeader-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 102px;
    }
    ul.defaultHeader-tabs {
        height: 96px;
        display: flex;
        li {
            flex: 1;
        }
    }   
}

</style>
