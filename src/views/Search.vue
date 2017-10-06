<template>
<div class="Search">
  <div class="SearchPlanets">
    <header>星球</header>
    <div class="SearchPlanetsList">
      <div class="SearchPlanet" v-for="(item, index) in groupList" v-if="index > 2 ? false : true" @click="$router.push({path: `/joinplanet/${item.id}`})">
        <img :src="item.image_url"/>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <footer>
      <span>查看更多相关星球</span>
      <i class="iconfont icon-enter"></i>
    </footer>
  </div>
  <div class="SearchCards">
    <header>帖子</header>
    <div class="SearchCardsList">
      <div class="SearchCard" v-for="item in postList">
        <header>{{ item.title }}</header>
        <p>
          {{ item.content }}
        </p>
        <div class="SearchCardImgBox">
          <img v-for="imgs in item.image_url" :src="imgs"/>
        </div>
        <footer>
          <span>{{ item.group.name }}</span>
          <div class="SearchCardTime">
            收藏于 {{ item.create_time }}
          </div>
        </footer>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { searchGroup } from '../fetch/groups'
import { searchPost } from '../fetch/posts'
import store from '../vuex/store'
export default {
  name: 'Search',
  data () {
    return {
      SearchText: '',
      groupList: [],
      postList: [],
    }
  },
  computed: {
    getsearch: function () {
      return store.state.searchContent
    }
  },
  watch: {
    getsearch: function () {
      searchGroup({
        limit: 20,
        offset: 0,
        name: this.getsearch
      }).then(response => {
        this.groupList = response.data
      }).catch(error => {
        console.log(error)
        this.$Message.error('出现错误'+error)
      })
      searchPost({
        limit: 20,
        offset: 0,
        name: this.getsearch
      }).then(response => {
        response.data.forEach(function (el) {
          el.create_time = el.create_time.slice(0, 10) + ' ' + el.create_time.slice(11, 16)
        })
        this.postList = response.data
      }).catch(error => {
        console.log(error)
        this.$Message.error('出现错误'+error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Search{
  width: 100%;
  box-sizing: border-box;
  .SearchPlanets, .SearchCards{
    width: 100%;
    box-sizing: border-box;
  }
  .SearchPlanets{
    padding: 0 20px;
    padding-top: 6px;
    border-bottom: 6px solid rgb(239,239,242);
    > header, > div, > footer{
      width: 100%;
    }
    > header{
      font-size: 20px;
      line-height: 28px;
      color: #5677FC;
      opacity: 0.87;
      text-align: left;
      margin-bottom: 12px;
    }
    > div{
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 12px;
      .SearchPlanet{
        width: 33.3%;
        img{
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }
        span{
          font-size: 12px;
          line-height: 16.5px;
          color: rgba(41,41,41,0.87);
          display: block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 8px;
        }
      }
    }
    > footer{
      width: 100%;
      text-align: left;
      margin-bottom: 6px;
      span{
        font-size: 12px;
        line-height: 16.5px;
        color: rgba(86,119,252,0.54);
      }
      i{
        font-size: 12px;
        line-height: 16.5px;
        color: rgba(86,119,252,0.54);
        float: right;
      }
    }
  }
  .SearchCards{
    > header, .SearchCard{
      padding: 0 20px;
    }
    > header{
      width: 100%;
      font-size: 20px;
      line-height: 28px;
      color: #5677FC;
      opacity: 0.87;
      text-align: left;
      margin-top: 6px;
      margin-bottom: 12px;
    }
    .SearchCardsList{
      width: 100%;
      .SearchCard{
        border-bottom: 6px solid rgb(239,239,242);
        > header{
          width: 100%;
          font-size: 16px;
          line-height: 22.5px;
          color: #2F2F2F;
          opacity: 0.87;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 6px;
          text-align: left;
        }
        > p{
          width: 100%;
          text-align: left;
          font-size: 14px;
          line-height: 20px;
          opacity: 0.54;
          color: #000000;
          letter-spacing: 0;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .SearchCardImgBox{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          img{
            width: 107px;
            height: 107px;
          }
        }
        > footer{
          width: 100%;
          opacity: 0.26;
          color: #000000;
          font-size: 12px;
          line-height: 16.5px;
          text-align: left;
          margin: 6px 0 6px 0;
          div{
            float: right;
          }
        }
      }
    }
  }
}
</style>