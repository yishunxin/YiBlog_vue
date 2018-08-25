<template>
  <div>
    <div>
      <vue-edit v-model='essay'></vue-edit>
    </div>

    <div class="icon clearfix">
      <div class="essay_panel">
        <span @click="showEmoji = !showEmoji" circle class="iconfont" style="padding: 0;font-size: 20px">&#xe60c;
        </span>
        <el-button type="primary" size="mini" @click="saveEssay">发表</el-button>
      </div>

      <transition name="fade" mode="">
        <div class="emoji-box" v-if="showEmoji">
          <el-button
            class="pop-close"
            :plain="true"
            type="danger"
            size="mini"
            icon="close"
            @click="showEmoji = false"></el-button>
          <vue-emoji
            @select="selectEmoji">
          </vue-emoji>
          <span class="pop-arrow arrow"></span>
        </div>
      </transition>
    </div>
    <div>
      <div v-for="essay in essays">
        <div class="essay_container">
          <div class="essay_header">
            <span>{{essay.create_time}}</span>
            <el-button type="text" class="el-icon-close delete_span" @click.stop="deleteEssay(essay.eid)"></el-button>
          </div>
          <div class="essay_body" v-html="essay.content"></div>
          <div>
            <img :src="photo" v-for="photo in essay.photo_list">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vueEmoji from './emoji.vue'
  import vueEdit from './edit.vue'
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    data: function () {
      return {
        essay: '',
        essays: [],
        showEmoji: false,
        data: [],
      }
    },
    components: {
      ElButton,
      ElInput,
      vueEmoji,
      vueEdit
    },
    created: function () {
      var that = this
      that.getEssays()
    },
    mounted: function () {

    },
    methods: {
      selectEmoji (code) {
        var that = this
        this.showEmoji = false
        this.essay += that.emoji(code)
        this.data.push(code)
      },
      getEssays: function () {
        var that = this
        that.httpGet('/essay/list').then(function (data) {
          that.essays = data.essay_list
        })
      },
      deleteEssay: function (eid) {
        var that = this
        that.httpGet('/essay/delete', {eid: eid}).then(function () {
          that.getEssays()
        })
      },
      saveEssay: function () {
        var that = this
        that.httpPost('/essay/save', {content: that.essay}).then(function () {
          that.getEssays()
        })
      }
    }
  }
</script>
<style>
  .essay_container {
    background: #ffffff;
    padding: 10px;
    margin-top: 10px;
  }

  .essay_header {
    color: gray;
    position: relative;
    font-size: 14px;
  }

  .essay_body {
    margin-top: 10px;
    text-indent: 2em;
    height: auto;
  }

  .essay_body img {
    vertical-align: middle;
    height: 16px;
    width: 16px;
  }

  .essay_container:hover .delete_span {
    display: block;
  }

  .delete_span {
    display: none;
    padding: 0;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .essay_panel {
    display: flex;
    justify-content: space-between;
  }

  .icon {
    position: relative;
    margin-top: 5px;
  }

  .icon .emoji-box {
    position: absolute;
    z-index: 10;
    left: -10px;
    top: 24px;
    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
    background: white;
  }

  .icon .emoji-box .el-button {
    position: absolute;
    border: none;
    color: #ff4949;
    right: 12px;
    top: 12px;
    z-index: 10;
  }

  .icon .emoji-box .arrow {
    left: 10px;
  }

  .icon .submit {
    float: right;
  }

  .comment {
    margin-top: 20px;
  }

  .comment .item {
    margin-top: 20px;
    padding: 10px;
    margin: 0;
    border-top: 1px solid #bfcbd9;
  }

  .clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .fade-move {
    transition: transform 0.4s;
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }

  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute !important;
  }

  .list-move {
    transition: all 0.5s;
  }
</style>
