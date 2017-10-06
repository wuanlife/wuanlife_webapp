<template>
<div class="Invitation">
  <span>您的邀请码是：</span>
  <span v-if="isCode">{{ code }}</span>
  <span v-else>加载中...</span>
</div>
</template>

<script>
import { getUserInv } from '../fetch/users'
import store from '../vuex/store'
export default {
  name: 'Invitation',
  data () {
    return {
      code: '',
      isCode: false
    }
  },
  mounted () {
    let id = JSON.parse(localStorage.getItem("user")).id || store.state.userInfo.id
    getUserInv(id).then(response => {
      this.isCode = true
      this.code = response.code
    }).catch(error => {
      console.log(error)
      this.$Message.error(error)
    })
  }
}
</script>

<style lang="scss" scoped>
.Invitation{
  padding: 6px 20px 0 20px;
  color: #5677FC;
  text-align: left;
  position: relative;
  span:nth-child(1){
    font-size: 20px;
    line-height: 28px;
  }
  span:nth-child(2){
    font-size: 34px;
    line-height: 47.5px;
    position: absolute;
    top: 203px;
    left: 124px;
  }
}
</style>