<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 723896 */
    src: url('//at.alicdn.com/t/font_723896_isz61w9hnfj.eot');
    src: url('//at.alicdn.com/t/font_723896_isz61w9hnfj.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_723896_isz61w9hnfj.woff') format('woff'),
    url('//at.alicdn.com/t/font_723896_isz61w9hnfj.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_723896_isz61w9hnfj.svg#iconfont') format('svg');
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    transform: transition3d(0, 0, 0);
    -webkit-transform: transition3d(0, 0, 0);
  }

  p {
    margin: 0;
    padding: 0;
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 15px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
