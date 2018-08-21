<template>
  <div class="container">
    <div class="header">
      <img src='/static/img/logo.png' class="logo">
      <el-dropdown>
        <span class="el-dropdown-link"><span class="iconfont">&#xe600;&nbsp;写点什么</span><i
          class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span class="iconfont" @click="goWrite">&#xe652;&nbsp;写文章</span></el-dropdown-item>
          <el-dropdown-item><span class="iconfont">&#xe64f;&nbsp;发想法</span></el-dropdown-item>
          <el-dropdown-item><span class="iconfont">&#xe64c;&nbsp;传照片</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main">
      <div class="left"></div>
      <div class="main_panel">
        <el-carousel indicator-position="none" height="400px" class="mycarousel">
          <el-carousel-item v-for="item in carousel_photos" :key="item">
            <img :src="item" style="width: 100%;height: 100%">
          </el-carousel-item>
        </el-carousel>
        <el-menu class="el-menu-demo menunavibar" mode="horizontal" router>
          <el-menu-item index="/main/home" class="menu_item">首页</el-menu-item>
          <el-menu-item index="/main/blogs"  class="menu_item">技术仓库</el-menu-item>
          <el-menu-item index="3" class="menu_item">个人随笔</el-menu-item>
          <el-menu-item index="/main/albums" class="menu_item">相册</el-menu-item>
        </el-menu>
        <div class="">
          <router-view></router-view>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        carousel_photos: ["/static/img/bg.jpg", "/static/img/banner.jpg"],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created: function () {
      this.getConfig()
    },
    methods: {
      goWrite: function () {
        this.$router.push('/blogwrite')
      },
      getConfig: function () {
        var that = this
        that.httpGet('/config/get').then(function (data) {
          var configs = data.configs
          localStorage.setItem('file_pre', configs.file_pre)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu_item {
    height: 45px;
    line-height: 45px;
  }

  .menunavibar {
    margin-bottom: 10px;
    margin-top: -45px;
    opacity: 0.8;
  }

  .container {
    width: 100%;
    background-color: #f6f6f6;
    height: 100%;
    overflow: hidden;
  }

  .main {
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    height: 100%;
  }

  .header {
    z-index: 999;
    width: 100%;
    position: fixed;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    top: 0;
  }

  .main_panel {
    margin: 50px;
    width: 700px;
  }

  .mycarousel {
    z-index: 0;
  }

  .logo {
    height: 40px;
  }
</style>
