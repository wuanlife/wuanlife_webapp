<template>
  <div class="applyPrivatePlanet">
  	<span>验证信息</span>
  	<input v-model="message" />
  	<button @click="toJoinPrivatePlanet">申请加入</button>
  </div>
</template>

<script>
import { applyJoinPlanet } from '../fetch/groups'
import store from '../vuex/store'

export default {
  name: 'applyPrivatePlanet',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    toJoinPrivatePlanet: function () {
      applyJoinPlanet(this.$route.query.postId, this.message).then(response => {
        this.$Message.success('申请成功')
        this.$router.go(-1)
      }).catch(error => {
        console.log('私密星球申请出错： ' + error)
        this.$Message.error('出现错误！请重试')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.applyPrivatePlanet{
  width: 100%;
  padding: 0 10%;
  span{
    width: 100%;
    display: block;
    padding: 4px 10px;
    text-align: left;
    font-size: 12px;
    line-height: 16.5px;
    color: rgba(86,119,252,0.87);
    margin-top: 7.3vh;
  }
  input{
    width: 100%;
    font-size: 16px;
    line-height: 22.5px;
    padding: 10px 10px;
    border: none;
    border-bottom: 1px solid rgba(86,119,252,0.87);
    outline: none;
    color: rgba(0,0,0,0.87);
    margin-bottom: 21vh;
    &:focus{
      border-bottom: 2px solid rgba(86,119,252,0.87);
    }
  }
  button{
    width: 100%;
    border: none;
    background-color: #5677FC;
    height: 44px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24);
    border-radius: 4px;
    color: rgba(255,255,255,0.87);
    font-size: 16px;
    line-height: 44px;
  }
}
</style>