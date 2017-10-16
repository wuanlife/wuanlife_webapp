<template>
    <div class="Myplanet">
      <div v-for="(item, index) in items" class="Myplanet_planet" v-if="index > n ? false : true" @click="$router.push({path: `/planet/${item.id}`, query: {name: `${item.name}`}})">
      <img :src="item.image_url"/>
      <p>{{ item.name }}</p>
    </div>
    <div class="Myplanet_planet" @click="$router.push({path: '/universe', query: {title: '全部星球', name: '全部星球'}})">
      <div><i class="iconfont icon-allPlanet"></i></div>
      <p>全部星球</p>
    </div>
    <div class="Myplanet_planet" @click="$router.push({path: '/creatplanet', query: {title: '创建星球'}})">
      <div><i class="iconfont icon-cross"></i></div>
      <p>创建星球</p>
    </div>
    </div>
</template>

<script>
import { groupsList, searchGroup } from '../fetch/groups'
export default {
  name: 'myplanet',
  data () {
    return {
      items: [],
      n: 3,
    }
  },
  mounted: function () {
    let self = this;
    groupsList(0, 20).then(response => {
      this.items = response.data;
    }).catch(error => {
      this.$Message.error(error)
    })
  },

  methods: {
    refresh: function (done) {
      var self = this
      setTimeout(function () {
        var start = self.top - 1
        for (var i = start; i > start - 10; i--) {
          self.items.splice(0, 0, i + ' - keep walking, be 2 with you.');
        }
        self.top = self.top - 10;
        done();
      }, 1500)
    },

    infinite: function (done) {
      var self = this
      setTimeout(function () {
        var start = self.bottom + 1;
        for (var i = start; i < start + 10; i++) {
          self.items.push(i + ' - keep walking, be 2 with you.');
        }
        self.bottom = self.bottom + 10;
        done();
      }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div.Myplanet{
  text-align: left;
  .Myplanet_planet{
    display: inline-block;
    width: 32.7%;
    text-align: center;
    > img{
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin-bottom: 8px;
    }
    > div{
      width: 50px;
      margin: 0 auto;
      height: 50px;
      border-radius: 100%;
      margin-bottom: 8px;
      background-color: rgba(86,119,252,0.87);
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        font-size: 20px;
        color: white;
      }
    }
    > p{
      font-size: 12px;
      color: rgba(41,41,41,0.87);
      margin-bottom: 24px;
      width: 100%;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
