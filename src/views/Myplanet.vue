<template>
  <scroller :on-refresh="refresh"
            :on-infinite="infinite"
            style="padding-top: 44px;">
    <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
      {{ item }}
    </div>
  </scroller>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      items: []
    }
  },
  mounted: function () {
    for (var i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.');
    }
    this.top = 1;
    this.bottom = 20;
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
