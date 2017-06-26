<template>
  <div class="agriculture">
    <div>
      <h1>Agriculture</h1>
      <p>asd</p>      
    </div>
    <div class="divider"></div>
    <div>
      <p>you can produce <el-input v-model="input" placeholder="请输入内容"></el-input>farmers</p>
      <p>{{ food }}</p>
      <p>you now have {{ farmer }} farmers</p>
      <el-button-group>
        <el-button type="primary" @click="produceFarmer">Produce 1</el-button>
        <el-button type="primary">Produce 1</el-button>
        <el-button type="primary" @click="produceFarmerMax">Produce Max</el-button>
      </el-button-group>
    </div>
  </div>
</template>


<script>
import { mapMutations } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input: ''
    }
  },
  computed: {
    food () {
      return this.$store.state.food
    },
    farmer () {
      return this.$store.state.farmers
    }
  },
  methods: {
    ...mapMutations({
      addFarmer: 'PRODUCE_FARMER'
    }),
    produceFarmer: function() {
      this.addFarmer(1)
    },
    produceFarmerMax: function() {
      this.addFarmer(Math.floor(this.$store.state.food/10))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agriculture {
  margin: 50px;
}
.el-input {
  width: 110px;
}
.el-button-group {
  display: flex;
}
.el-button-group > .el-button{
  flex: 1;
}
</style>
