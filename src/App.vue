<template>
  <div id="app">
    <router-view name="header"></router-view>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'//使用状态管理里的mapActions来传递方法，mapGetters来展示数据
import util from 'util'
export default {
  name: 'app',
  components:{
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions([
       
    ]),
    change() {
      this.dialogTableVisible = true
      console.log("fuck")
    }
  },
  mounted() {
    util.setREM()
  },

}
</script>

<style lang="scss">
@import "../static/style/public.scss";
@import '../static/iconfont/iconfont.css';

body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } 
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
h1, h2, h3, h4, h5, h6{ font-size:100%; } 
address, cite, dfn, em, var { font-style:normal; } 
code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
small{ font-size:12px; } 
ul, ol { list-style:none; } 
a { text-decoration:none; } 
a:hover { text-decoration:underline; } 
sup { vertical-align:text-top; } 
sub{ vertical-align:text-bottom; } 
legend { color:#000; } 
fieldset, img { border:0; } 
button, input, select, textarea { font-size:100%; } 
table { border-collapse:collapse; border-spacing:0; }


#app {
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Medium, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #d9d9dc;
  min-height: 100%;
}
.divider {
  width: 80%;
  margin:0 auto;
  border-bottom: 1px solid black;
}
</style>
