<template>
  <div class="wuan-cards">
    <div class="wuan-card">
      <div class="header">
        <img src="">
        <p>My name is long</p>
        <p>2017-21-213</p>
      </div>
      <div class="body">
        <div class="title">
          <p>asdasdasdsad</p>
        </div>
        <div class="brief">
          <p>asdfasdfasdasodfasdf</p>
        </div>
        <div class="imgs">
          <img src="">
          <img src="">
        </div>
      </div>
      <div class="footer">
        <button><i class="iconfont icon-talk"></i>999+</button>
        <button><i class="iconfont icon-good"></i>999+</button>
        <button><i class="iconfont icon-star"></i>999+</button>
      </div>
    </div>
    <div class="wuan-card">
      <div class="header">
        <img src="">
        <p>My name is long</p>
        <p>2017-21-213</p>
      </div>
      <div class="body">
        <div class="title">
          <p>asdasdasdsad</p>
        </div>
        <div class="brief">
          <p>asdfasdfasdasodfasdf</p>
        </div>
        <div class="imgs">
          <img src="">
          <img src="">
        </div>
      </div>
      <div class="footer">
        <button><i class="iconfont icon-talk"></i>999+</button>
        <button><i class="iconfont icon-good"></i>999+</button>
        <button><i class="iconfont icon-star"></i>999+</button>
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
  .wuan-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    .header {
      display: flex;
      align-items: center;
      flex: 0 0 60px;
      padding: 0 40px;
      margin: 12px 0 6px 0;
      img {
        height: 60px;
        width: 60px;
        margin-right: 12px;
        border-radius: 30px;
      }
      p {
        color: #000000;
        opacity: 0.25;
        font-size: 24px;
      }
      p:last-child {
        margin-left: auto;
      }
      
    }
    .body {
      padding: 0 40px;
      margin: 6px 0 18px 0;
      .title {
        p {
          text-align: left;
          opacity:0.87;
          font-size:32px;
          color:#2f2f2f;
        }
      }
      .brief {
        p {
          text-align: left;
          opacity:0.54;
          font-size:28px;
          color:#000000;
        }
      }
      .imgs {
        text-align: left;
        img {
          width:204px;
          height:204px;
        }
        img:not(:first-child) {
          margin-left: 14px;
        }
      }
    }
    .footer {
      display: flex;
      border-top: 1px solid #c8c8c8;
      button {
        flex: 1;
        height: 33px;
        border: none;
        background-color: transparent;
        padding: 0 66px 0 66px;
        margin: 13px 0 13px 0;
        opacity: 0.54;

        font-size:24px;
        color:#5677fc;
        i.iconfont {
          font-size:24px;
          margin-right: 17px;
        }
      }
      button:not(:first-child) {
        border-left: 1px solid #000000;
      }
    }
  }
  div.wuan-card:not(:first-child) {
    margin-top: 12px;
  } 
}
</style>
