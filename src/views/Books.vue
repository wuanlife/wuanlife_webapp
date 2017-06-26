<template>
  <div>
    <el-row id="books">
      <div class="books-sidebar">
        <el-menu class="books-categories" @open="handleOpen" @close="handleClose" :router="true">
          <el-menu-item class="category" index="/books/computer-science">
            <i class="el-icon-setting"></i>
            <p>Computer Science</p>
          </el-menu-item>
          <el-menu-item class="category" index="/books/economics">
            <i class="el-icon-menu"></i>
            <p>Economics</p>
          </el-menu-item>
          <el-menu-item class="category" index="/books/politics">
            <i class="el-icon-menu"></i>
            <p>Politics</p>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="books-content">
        <router-view></router-view>
      </div>
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


<style lang="scss" scoped>
#books {
    display: flex;
}
.books-categories {
    height: 100%;
    p {
        display: inline-block;
        margin: auto;
    }
}
.category {
    display: flex;
    justify-content: center;
    align-items: center;
}
.books-sidebar {
    width: 180px;
}
.books-content {
}
</style>