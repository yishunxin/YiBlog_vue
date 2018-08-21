<template>
  <div>
    <div class="photos">
      <div v-for="photo in photos" class="photo">
        <el-card :body-style="{ padding: '0px',position:'relative'}" shadow="hover">
          <el-button type="text" class="el-icon-close delete_span" @click="deletePhoto(photo.pid)"></el-button>
          <img :src=photo.file class="thumb">
          <div style="padding: 14px;">
            <span>{{photo.name}}</span>
            <div class="photo_bottom clearfix">
              <time class="time">{{ photo.create_time }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="bottom">
        <el-button icon="el-icon-plus" round class="new_btn" @click="photoUploadVisible =true"></el-button>
      </div>
      <el-dialog title="上传照片" :visible.sync="photoUploadVisible" width="400px">
        <el-upload
          :auto-upload="false"
          :file-list="fileList"
          class="upload-demo"
          drag
          :on-change="handleChange"
          :on-remove	="handleRemove"
          action=""
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="upload_bottom">
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import * as qiniu from 'qiniu-js'
  export default{
    data(){
      return {
        photos: [],
        photoUploadVisible: false,
        fileList: [],
        aid: null
      }
    },
    created: function () {
    },
    mounted: function () {
      this.aid = this.$route.params.aid
      this.getPhotos(this.aid)
    },
    methods: {
      deletePhoto: function (pid) {
        var that = this
        var opreate_type = null
        that.$confirm('删除照片', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '回收',
          cancelButtonText: '彻底删除',
          type: 'warning'
        }).then(() => {
          opreate_type = 'recycle'
          that.httpGet('/photo/delete', {pids: [pid].join(), opreate_type: opreate_type}).then(function () {
            that.getPhotos(that.aid)
          })
        }).catch(action => {
          if (action === 'cancel') {
            opreate_type = 'delete'
            that.httpGet('/photo/delete', {pids: [pid].join(), opreate_type: opreate_type}).then(function () {
              that.getPhotos(that.aid)
            })
          } else {
            return 0
          }
        })
      },
      getPhotos: function (aid) {
        var that = this
        that.httpGet('/photo/list', {aid: aid}).then(function (data) {
          that.photos = data.photos
        })
      },
      handleChange: function (file, fileList) {
        this.fileList = fileList;
      },
      handleRemove:function (file, fileList) {
        this.fileList = fileList;
      },
      filenameSplit: function (filename) {
        var index = (filename.lastIndexOf(".") - 1 >>> 0) + 2
        return [filename.slice(0, index - 1), filename.slice(index)]
      },
      submitUpload: function () {
        var that = this
        var photos = []
        that.httpGet('/upload/token').then(function (data) {
          var token = data.upload_token
          that.fileList.forEach(function (file, index) {
            var filenames = that.filenameSplit(file.name)
            var key = md5(new Date().getTime() + filenames[0]) + '.' + filenames[1]
            var observable = qiniu.upload(file.raw, key, token)
            var observer = {
              next(res){
                // ...
              },
              error(err){
                // ...
              },
              complete(res){
                photos.push({name: file.name, description: null, album_id: that.aid, tag_ids: null, path: key})
                that.httpPost('/photo/save', {
                  name: file.name,
                  description: null,
                  album_id: that.aid,
                  tag_ids: null,
                  path: key
                }, {emulateJSON: true}).then(function () {
                  that.getPhotos(that.aid)
                })
              }
            }
            var subscription = observable.subscribe(observer)
          })
        })

      },
    }
  }
</script>
<style scoped>
  .photo {
    width: 80%;
    margin-bottom: 12px;
  }

  .photos {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .photo:hover .delete_span {
    display: block;
  }

  .upload_bottom {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: -20px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .photo_bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .thumb {
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
    width: 100%;
  }

  .delete_span {
    display: none;
    padding: 0;
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
