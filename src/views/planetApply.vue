<template>
  <div class="planetApply">
  <loadmore @on-pullup='onPullup'
            @on-pulldown='onPullup'
            class="page">
    <ul v-if="applyNoNull" class="planetApply-list">
      <li class="profile-item" v-for="(item, index) in applyList">
        <div class="planetApply-message">
          <img :src="item.message.image_url"/>
          <div>
            <p class="planetApply-name"><span>{{ item.user.name }}</span> 申请加入 <span>{{ item.group.name }}</span></p>
           <p class="planetApply-content">{{ item.message.text }}</p>
          </div>
        </div>
        <div class="planetApply-btns" v-if="item.message.status === 1">
          <button @click="toDel(index, item.message.id, true)">同意</button>
          <button @click="toDel(index, item.message.id, false)">拒绝</button>
        </div>
        <div class="planetApply-text" v-else-if="item.message.status === 2">{{ apply_value1 }}</div>
        <div class="planetApply-text" v-else>{{ apply_value2 }}</div>
      </li>
    </ul>
    <p v-else>还没有收到私密请求哦！</p>
  </loadmore>
  </div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { getAllMessages, delApply } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'planetApply',
  components:{
    loadmore,
  },
  data() {
    return {
      apply_value1: '已同意',
      apply_value2: '已拒绝',
      applyNoNull: false,
      applyList: [],
      i: 0,
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getAllMessages(id, {
      offset: 0,
      limit: 20,
      type: 'apply'
    }).then(response => {
      if (response.data === null) {
        this.applyNoNull = false
      } else {
        this.applyNoNull = true
        this.applyList = response.data
      }
    }).catch(error => {
      console.log(error)
      this.$Message.error('出现错误,请重试')
    })
  },
  methods: {
    onPullup: function (done) {
      let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      let self = this
      self.i += 1 
      setTimeout(function () {
        getAllMessages(id, {
          offset: 20 * self.i,
          limit: 20,
          type: 'apply'
        }).then(function (response) {
          self.applyList = self.applyList.concat(response.data)
        })
        done()
      }, 1500)
    },
    toDel: function (index, mid, val) {
      var id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
      delApply(id, mid, val).then(response => {
        this.$Message.success(response.success)
        if (val) {
          this.applyList[index].message.status = 2
        } else {
          this.applyList[index].message.status = 3
        }
      }).catch(error => {
        this.$Message.error('出现错误，请重试！')
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .planetApply{
    .page{
      height: calc(100vh - 51px);
      position: relative;
      user-select: none;
      .planetApply-list{
      li{
        position: relative;
        margin-left: 20px;
        border-bottom: 1px solid #eff2f4;
        padding: 10px 0;
        height: 95px;
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
              height: 22px;
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
  }
</style>