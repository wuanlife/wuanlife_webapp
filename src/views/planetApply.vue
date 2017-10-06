<template>
  <div class="planetApply">
  <loadmore @on-pullup='onPullup'
            @on-pulldown='onPullup'
            class="page">
    <ul v-if="applyNull" class="planetApply-list">
      <li class="profile-item" @click="$router.push('myinfo')">
        <div class="planetApply-message">
          <img src=""/>
          <div>
            <p class="planetApply-name"><span>格子</span> 申请加入 <span>午安煎饼计划UI组</span></p>
           <p class="planetApply-content">大家好，希望加入UI组，一起学习</p>
          </div>
        </div>
        <div class="planetApply-btns" v-if="applyValue">
          <button>同意</button>
          <button>拒绝</button>
        </div>
        <div class="planetApply-text" v-else>{{ apply_value }}</div>
      </li>
    </ul>
    <p v-else>还没有收到私密请求哦！</p>
  </loadmore>
  </div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { getAllMessages } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'planetApply',
  components:{
    loadmore,
  },
  data() {
    return {
      applyValue: true,
      apply_value: '已拒绝',
      applyMessage: {},
      applyNoNull: false,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getAllMessages(id, {
      offset: 0,
      limit: 20,
      type: 'apply'
    }).then(response => {
      this.applyMessage = response.data.apply === null ? [] : response.data.apply
    }).catch(error => {
      console.log(error)
      this.$Message.error('出现错误,请重试')
    })
  }
}
</script>

<style lang="scss" scoped>
  .planetApply{
    .planetApply-list{
      li{
        position: relative;
        margin-left: 20px;
        border-bottom: 1px solid #eff2f4;
        padding: 10px 0;
        height: 75px;
        div.planetApply-message{
          position: absolute;
          top: 10px;
          left: 0;
          width: 100%;
          height: 50px;
          img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
          > div{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            p{
              text-align: left;
              margin-left: 58px;
              width: 282px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .planetApply-name{
              font-size: 15px;
              color: #292929;
            }
            .planetApply-content{
              font-size: 14px;
              color: rgba(0,0,0,0.54);
            }
          }
        }
        div.planetApply-btns{
          padding-left: 58px;
          position: absolute;
          bottom: 10px;
          button{
            background: #5677FC;
            border-radius: 4px;
            border: none;
            width: 100px;
            height: 25px;
            font-size: 12px;
            color: #ffffff;
          }
          button:nth-child(2){
            margin-left: 33px;
          }
        }
        div.planetApply-text{
          padding-left: 58px;
          position: absolute;
          bottom: 10px;
          font-size: 12px;
          color: rgba(0,0,0,0.38);
        }
      }
    }
    > p{
      font-size: 16px;
      color: #d2d2d2;
      margin-top: 20px;
    }
  }
</style>