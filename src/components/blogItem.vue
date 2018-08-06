<template>
  <div class="blog_item">
    <p class="title">{{title}}</p>
    <div v-show="collapse" class="short_content">{{short_content}}</div>
    <div v-if="!collapse" v-html="content" class="content"></div>
    <div class="menubar">
      <div>
        <button class="zanBtn"><i class="iconfont">&#xe601;10</i></button>
        <span class="comment"><i class="iconfont">&#xe6ba;2条评论</i> </span>
        <span><i class="iconfont">&#xe6d5;分享</i> </span>
      </div>
      <el-button type="text" @click="collapseBlog"><i
        :class="[collapse?'el-icon-arrow-down':'el-icon-arrow-up']">{{collapse ? '阅读全文' : "收起"}}</i></el-button>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'blogItem',
    props: ['id', 'title', 'short_content'],
    data: function () {
      return {
        collapse: true,
        content: ''
      }
    },
    methods: {
      collapseBlog: function () {
        var that = this
        console.log('id', that.id, 'collapse', that.collapse)
        if (that.collapse) {
          that.httpGet('/blog/detail', {blog_id: that.id}).then(function (data) {
            that.content = data.blog.content
          })
        }
        that.collapse = !that.collapse
      },

    }
  }
</script>
<style scoped>
  .blog_item {
    background: #FFFFFF;
    overflow-y: hidden;
    padding: 16px 20px 5px 20px;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    box-sizing: border-box;
  }

  .menubar {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
  }

  .short_content {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 10px;
  }

  .content {
    margin-top: 10px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
    color: #1a1a1a;
  }

  .zanBtn {
    margin-right: 10px;
    color: #0084ff;
    background: rgb(229, 242, 255);
    line-height: 30px;
    padding: 0 12px;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 3px;
  }

  .zanBtn:focus {
    outline: None;
  }

  .zanBtn:hover {
    background-color: rgba(0, 132, 255, .15);
  }
  .comment{
    margin-right: 5px;
  }
</style>
