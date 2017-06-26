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
    
  },

}
</script>

<style lang="scss">
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

button {
  &:focus {
    outline: none;
  }
  &.loading {
    position: relative;
    cursor: default;
    text-shadow: none !important;
    color: transparent !important;
    opacity: 0.8;
    pointer-events: none;
    transition: 
      all 0s linear,
      opacity 0.1s ease
    ;
    &:before {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;

      margin: -0.5em 0 0 -0.5em;
      width: 1em;
      height: 1em;

      border-radius: 500rem;
      border: 0.2em solid rgba(255, 255, 255, 0.15);
    }
    &:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;

      margin: -0.5em 0 0 -0.5em;
      width: 1em;
      height: 1em;

      animation: button-spin 0.6s linear;
      animation-iteration-count: infinite;

      border-radius: 500rem;

      border-color: white transparent transparent;
      border-style: solid;
      border-width: 0.2em;

      box-shadow: 0px 0px 0px 1px transparent;    
    }
  }
}
@keyframes button-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}    

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.divider {
  width: 80%;
  margin:0 auto;
  border-bottom: 1px solid black;
}
</style>
