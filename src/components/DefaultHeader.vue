<template>
<div id="defaultHeader">
    <div class="defaultHeader-head">
        <h1>{message}</h1>
        <i>search</i>
    </div>
    <div class="defaultHeader-tabs">
        <Menu mode="horizontal" active-name="1">
            <Menu-item name="1">
                <p>fuck</p>
            </Menu-item>
            <Menu-item name="2">
                <p>fuck</p>
            </Menu-item>
        </Menu>
    </div> 
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
.defaultHeader-head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 102px;

    h1 {

    }
    i {

    }
}
.defaultHeader-tabs {
    height: 96px;
    ul {
        display: flex;
        li {
            flex: 1;
        }
    }
}
</style>
