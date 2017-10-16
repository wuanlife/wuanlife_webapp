<template>
  <div class="allplanet">
    <loadmore @on-pullup='onPullup'
            @on-pulldown='onPullup'
            class="page">
    <ul class="allplanet-list">
      <li v-for="item in items" class="profile-item" @click="$router.push({path: `/planet/${item.id}`, query: {name: `${item.name}`}})">
        <img :src="item.image_url"/>
        <div>
          <p class="title">{{ item.name }}</p>
          <p class="postContent">{{ item.introduction }}</p>
        </div>
      </li>
    </ul>
  </loadmore>
  </div>
</template>

<script>
import loadmore from '@/components/Loadmore/pull-to-refresh'
import { groupsList, searchGroup } from '../fetch/groups'
export default {
  name: 'allplanet',
  components:{
    loadmore,
  },
  data() {
    return {
      items: [],
      i: 0,
    }
  },
  created () {
    document.title = this.$route.query.name + ' - 午安网 - 过你想过的生活'
  },
  mounted () {
    let self = this;
    console.log(this.$route.query)
    if (this.$route.query.serachText) {
      searchGroup({
        limit: 20,
        offset: 0,
        name: this.$route.query.serachText
      }).then(response => {
        this.items = response.data
      }).catch(error => {
        console.log(error)
        this.$Message.error('出现错误'+error)
      })
    } else {
      groupsList(0, 20).then(response => {
        this.items = response.data;
      }).catch(error => {
        console.log(error)
        this.$Message.error(error)
      })
    }
  },
  methods: {
    onPullup: function (done) {
      let self = this
      self.i += 1
      if (this.$route.query.serachText) {
        setTimeout(function () {
          searchGroup({
            limit: 20 * self.i,
            offset: 0,
            name: this.$route.query.serachText
          })
          done()
        }, 1500)
      } else {
        setTimeout(function () {
          groupsList(20 * self.i, 20).then(function (response) {
            self.items = self.items.concat(response.data)
          })
          done()
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .allplanet{
    .page{
      height: calc(100vh - 51px);
      position: relative;
      user-select: none;
      .allplanet-list{
      li{
        position: relative;
        margin-left: 20px;
        border-bottom: 1px solid #eff2f4;
        padding: 10px 0;
        height: 70px;
        
        img{
          width: 50px;
          height: 50px;
          border-radius: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        div{
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          p{
            text-align: left;
            margin-left: 58px;
            width: 284px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .title{
            font-size: 15px;
            color: #292929;
          }
          .postContent{
            font-size: 11px;
            color: rgba(0,0,0,0.36);
          }
        }
      }
    }
    }
  }
</style>