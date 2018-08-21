<template>
  <div class="">
    <div class="albums">
      <div v-for="album in albums" class="album" @click="goPhotos(album.aid)">
        <el-card :body-style="{ padding: '0px' ,position:'relative'}" shadow="hover">
          <el-button type="text" class="el-icon-close delete_span" @click.stop="deleteAlbum(album.aid)"></el-button>
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
    <div class="bottom">
      <el-button icon="el-icon-plus" round class="new_btn" @click="albumFormVisible=true"></el-button>
    </div>
    <el-dialog title="再来一个" :visible.sync="albumFormVisible">
      <el-form :model="album">
        <el-form-item label="名称">
          <el-input v-model="album.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="album.description"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="album.tag_ids"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumFormVisible=false">取消</el-button>
        <el-button type="primary" @click="createAlbum(album)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        albums: [],
        albumFormVisible: false,
        album: {
          aid: null,
          name: null,
          description: null,
          create_time: null,
          tag_ids: null,
          cover: null
        }
      }

    },
    created: function () {
      this.getAlbums()

    },
    methods: {
      deleteAlbum: function (aid) {
        var that = this
        var opreate_type = null
        that.$confirm('删除相册', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '回收',
          cancelButtonText: '彻底删除',
          type: 'warning'
        }).then(() => {
          opreate_type = 'recycle'
          that.httpGet('/album/delete', {aids: aid, opreate_type: opreate_type}).then(function () {
            that.getAlbums()
          })
        }).catch(action => {
          if (action === 'cancel') {
            opreate_type = 'delete'
            that.httpGet('/album/delete', {aid: aid, opreate_type: opreate_type}).then(function () {
              that.getAlbums()
            })
          } else {
            return 0
          }
        })
      },
      goPhotos: function (aid) {
        var that = this
        that.$router.push({name: 'photos', params: {aid: aid}})
      },
      getAlbums: function () {
        var that = this;
        that.httpGet('/album/list').then(function (data) {
          that.albums = data.albums
        })
      },
      createAlbum: function (album) {
        var that = this
        that.httpPost('/album/save', album, {emulateJSON: true}).then(function () {
          that.albumFormVisible = false
          that.getAlbums()
        })
      }
    }
  }
</script>
<style scoped>

  .album {
    width: 80%;
    margin-bottom: 12px;
  }

  .album:hover .delete_span {
    display: block;
  }

  .albums {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .album_bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .cover {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .new_btn {
    width: 80%;

  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .delete_span {
    display: none;
    padding: 0;
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
