<template>
<div id="SearchHeader">
    <i class="iconfont icon-goback" @click="$router.go(-1)"></i>
    <input v-model="searchtext" type="text" placeholder="搜索星球或帖子" />
    <i class="iconfont icon-search" @click="search()"></i>
</div>
</template>

<script>
import store from '../vuex/store'
export default {
    name: 'SearchHeader',
    data() {
      return {
        searchtext: '',
      }
    },
    methods: {
      search () {
        store.dispatch("Search", {serText: this.searchtext})
      }
    },
    mounted () {
      this.searchtext = store.state.searchContent
    }
}
</script>

<style style lang="scss" scoped>
@function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
}
#SearchHeader {
    display: flex;
    align-items: center;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
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
    i.icon-search{
      position: absolute;
      right: 36px;
      top: 50%;
      margin: 0;
      transform: translateY(-50%);
      color: #5366d3;
    }
    input {
      width: 311px;
      height: 48px;
      border-radius: 2px;
      box-sizing: border-box;
      border-style: inset;
      border: 1px solid rgba(255,255,255,0.04);
      background: #FAFAFA;
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
      outline: none;
      font-size: 14px;
      line-height: 10px;
      padding: 0 16px;
    }
}

</style>
