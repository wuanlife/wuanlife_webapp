<template>
  <div>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true">
          <el-menu-item index="/village/agriculture"><i class="el-icon-setting"></i>农业</el-menu-item>
          <el-menu-item index="/village/economics"><i class="el-icon-menu"></i>经济</el-menu-item>
          <el-menu-item index="/village/politics"><i class="el-icon-menu"></i>政治</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'village',
    data() {
      return {

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>