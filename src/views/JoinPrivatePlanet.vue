<template>
<div class="JoinPrivatePlanet">
  <div class="planetIntroduction">
    <img src=""/>
    <span>影视分享</span>
    <span>成员 1234<span></span>话题 9996</span>
    <button>加入</button>
  </div>
  <div class="JoinPrivatePlanetCardsList">
    <div class="JoinPrivatePlanetCard" v-if="isJoined">
      <header>
        <img src=""/>
        <span>名字那么长可以吗</span>
        <span>2017-01-17 22:34</span>
      </header>
      <h2>Ubuntu开荒笔记</h2>
      <p>
        Ubuntu开荒笔记Ubuntu开荒笔记Ubuntu开荒笔记Ubuntu开荒笔记Ubuntu开荒笔记Ubuntu开荒笔记Ubuntu开荒笔记Ubuntu开荒笔记
      </p>
      <div class="JoinPrivatePlanetCardImgBox">
        <img src=""/>
        <img src=""/>
        <img src=""/>
      </div>
      <footer>
        <button><i class="iconfont icon-talk"></i>999+</button>
        <button><i class="iconfont icon-good"></i>999+</button>
        <button><i class="iconfont icon-star"></i>999+</button>
      </footer>
    </div>
    <div class="noJoinContent" v-else>加入该星球后方可浏览内容</div>
  </div>
  <button @click="$router.push('postpost')"  v-if="isJoined"><i class="iconfont icon-cross"></i></button>
</div>
</template>

<script>
export default {
  name: 'JoinPrivatePlanet',
  data () {
    return {
      isJoined: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.JoinPrivatePlanet{
  width: 100%;
  .planetIntroduction, .JoinPrivatePlanetCardsList{
    width: 100%;
  }
  .planetIntroduction{
    text-align: center;
    border-bottom: 6px solid rgb(239,239,242);
    > img{
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin: 24px auto 12px auto;
      display: block;
    }
    > span:nth-of-type(1){
      display: block;
      font-size: 17px;
      line-height: 24px;
      color: #292929;
      margin-bottom: 4px;
    }
    > span:nth-of-type(2){
      display: block;
      font-size: 13px;
      line-height: 18.5px;
      color: #7B7B7B;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      > span{
        width: 2px;
        height: 2px;
        line-height: 2px;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #7B7B7B;
        border-radius: 100%;
        margin: 0 11px;
      }
    }
    > button{
      width: 70px;
      height: 30px;
      border-radius: 4px;
      border: none;
      background-color: #5677FC;
      font-size: 12px;
      line-height: 16.5px;
      color: #FFFFFF;
      box-shadow:  0 0 4px 0 rgba(0,0,0,0.24),0 4px 4px 0 rgba(0,0,0,0.24);
      margin-bottom: 16px;
    }
  }
  .JoinPrivatePlanetCardsList{
    .JoinPrivatePlanetCard{
      width: 100%;
      border-bottom: 6px solid rgb(239,239,242);
      > header{
        padding: 0 20px;
        width: 100%;
        text-align: left;
        margin-top: 8px;
        box-sizing: border-box;
        > img{
          width: 30px;
          height: 30px;
          border-radius: 100%;
        }
        span{
          opacity: 0.26;
          font-size: 12px;
          line-height: 16.5px;
          color: #000000;
        }
        span:nth-of-type(1){
          margin-left: 6px;
        }
        span:nth-of-type(2){
          float: right;
        }
      }
      > h2{
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 22.5px;
        opacity: 0.87;
        color: #2F2F2F;
        text-align: left;
        margin-top: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > p{
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        opacity: 0.54;
        text-align: left;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .JoinPrivatePlanetCardImgBox{
        padding: 0 20px;
        box-sizing: border-box;
        margin: 8px 0 6px 0;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        > img{
          width: 102px;
          height: 102px;
          margin-right: 7px;
        }
      }
      > footer{
        width: 100%;
        padding: 8px 0 6px 0;
        border-top: 0.5px solid rgba(0,0,0,0.26);
        display: flex;
        justify-content: space-between;
        button{
          font-size: 12px;
          line-height: 16.5px;
          color: #5677FC;
          opacity: 0.54;
          width: 33.3%;
          border: none;
          border-right: 0.5px solid rgba(0,0,0,0.26);
          background-color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            margin-right: 9px;
          }
        }
        button:nth-of-type(3){
          border: none;
        }
      }
    }
    .noJoinContent{
      font-size: 20px;
      line-height: 28px;
      color: rgba(86,119,252,0.38);
      margin-top: 133px;
    }
  }
  > button{
    position: fixed;
    right: 33px;
    bottom: 40px;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 100%;
    background: #5677FC;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.12), 0 12px 12px 0 rgba(0,0,0,0.24);
    color: #FFFFFF;
    font-size: 14px;
    
  }
}
</style>