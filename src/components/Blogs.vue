<template>
  <div>
    <div v-if="total!=0">
      <blogItem
      v-for="blog in blogList"
      v-bind:id="blog.paper_id"
      v-bind:title="blog.title"
      v-bind:short_content="blog.short_content">
      </blogItem>
      <!--<div v-for="(blog,index) in blogList" class="blog_item">-->
      <!--<p>{{blog.title}}</p>-->
      <!--<div v-html="blog.content"></div>-->
      <!--<div class="menubar">-->
      <!--<div>-->
      <!--<span><el-button type="primary" plain><i class="iconfont">&#xe601;10</i> </el-button></span>-->
      <!--<span><i class="iconfont">&#xe6ba;2条评论</i> </span>-->
      <!--<span><i class="iconfont">&#xe6d5;分享</i> </span>-->
      <!--</div>-->
      <!--<el-button type="text" @click="collapseBlog"><i class="el-icon-arrow-down">阅读全文</i></el-button>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <p v-else>这里空空的，过几天再来看看吧！</p>
    <el-pagination background layout="prev, pager, next" :current-page.sync="currentPage"
                   :total="total" :page-size="limit" @current-change="freshPage"></el-pagination>
  </div>
</template>
<script>
  import blogItem from './blogItem.vue'
  export default{
    components: {blogItem},
    data: function () {
      return {
        blogList: [],
        total: 0,
        currentPage: 1,
        limit: 10
      }
    },
    computed: {},
    methods: {
      init: function () {
        var that = this
        that.getBlogList(0)
      },
      getBlogList: function (start) {
        var that = this
        that.httpGet('/blog/list', {start: start, limit: that.limit}).then(function (data) {
          console.log(data)
          that.total = data.total_num
          that.blogList = data.paper_list
        })
      },
      freshPage: function (value) {
        var that = this
        that.getBlogList((value - 1) * that.limit)
      },
    },
    created: function () {
      this.init()
    }
  }
</script>
<style scoped>
</style>

