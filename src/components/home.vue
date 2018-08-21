<template>
  <div>
    <div>
      <vue-edit v-model='essay'></vue-edit>
    </div>

    <div class="icon clearfix">
      <el-button type="success" @click="showEmoji = !showEmoji"></el-button>
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
        <el-card :body-style="{ padding: '0px' ,position:'relative'}" shadow="hover">
          <el-button type="text" class="el-icon-close delete_span" @click.stop="deleteAlbum(essay.eid)"></el-button>
          <img :src="[album.cover?album.cover:'/static/img/bg.jpg']" class="cover">
          <div style="padding: 14px;">
            <span>{{album.name}}</span>
            <div class="album_bottom clearfix">
              <time class="time">{{ album.create_time }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
  import vueEmoji from './emoji.vue'
  import vueEdit from './edit.vue'
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  export default{
    data: function () {
      return {
        essay: '',
        essays: [],
        showEmoji: false,
        data: []
      }
    },
    components: {
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
        that.httpGet('/essay/delete').then(function () {
          that.getEssays()
        })
      },
      saveEssay: function (essay) {
        that.httpPost('/essay/save', essay).then(function () {
          that.getEssays()
        })
      }
    }
  }
</script>
<style scoped>
  .icon {
    position: relative;
    margin-top: 20px;
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
