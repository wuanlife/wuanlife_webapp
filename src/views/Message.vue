<template>
  <div class="wuan-cards">
    <div class="wuan-briefcard">
      <i class="iconfont icon-privatenotice"></i>
      <div class="content">
        <h1>asdasdafadsfdsfasodfhafhoasdasdafadsfdsfasodfhafhoihewfhohfoghfolghfoiwhfoeihewfhohfoghfolghfoiwhfoe</h1>
        <p>asdasdafadsfdsfasodfhafhoasdasdafadsfdsfasodfhafhoihewfhohfoghfolghfoiwhfoeihewfhohfoghfolghfoiwhfoe</p>
      </div>
    </div>
    <div class="wuan-briefcard">
      <i class="iconfont icon-privatenotice"></i>
      <div class="content">
        <h1>asdasdafadsfdsfasodfhafhoasdasdafadsfdsfasodfhafhoihewfhohfoghfolghfoiwhfoeihewfhohfoghfolghfoiwhfoe</h1>
        <p>asdasdafadsfdsfasodfhafhoasdasdafadsfdsfasodfhafhoihewfhohfoghfolghfoiwhfoeihewfhohfoghfolghfoiwhfoe</p>
      </div>
    </div>
    <div class="wuan-briefcard">
      <i class="iconfont icon-privatenotice"></i>
      <div class="content">
        <h1>asdasdafadsfdsfasodfhafhoasdasdafadsfdsfasodfhafhoihewfhohfoghfolghfoiwhfoeihewfhohfoghfolghfoiwhfoe</h1>
        <p>asdasdafadsfdsfasodfhafhoasdasdafadsfdsfasodfhafhoihewfhohfoghfolghfoiwhfoeihewfhohfoghfolghfoiwhfoe</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wuan-cards {
  .wuan-briefcard {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 30px;
    margin: 0 15px;

    background:#ffffff;
    box-shadow:0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
    border-radius:4px;
    height:126px;
    i.iconfont {
        color: #5677fc;
        font-size: 44px;
        margin-right: 24px;
    }
    div.content {
        flex: 1;
        min-width: 0;
        h1 {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size:32px;
            color:rgba(0,0,0,0.87);
        }
        p {
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size:24px;
            color:rgba(0,0,0,0.54);
        }
    }
  }
  div.wuan-briefcard:not(:first-child) {
    margin-top: 12px;
  }
}
</style>
