<template>
  <div class="container">
    <div class="left" tabindex="0" @keyup.38="bookUpdown('up')" @keyup.40="bookUpdown('down')">
      <div class="back">
        <el-button class="back_btn" @click="goMain">返回首页</el-button>
      </div>
      <div class="new_container">
        <div>
          <span class="el-icon-circle-plus-outline" @click="showAddForm=true">&nbsp;&nbsp;新建文集</span>
        </div>
        <div class="add_book" v-show="showAddForm">
          <el-form ref="bookForm" :model="bookForm" id="addForm">
            <el-form-item>
              <el-input placeholder="请输入文集名..." v-model="bookForm.name" clearable></el-input>
              <el-input placeholder="描述..." v-model="bookForm.description" clearable></el-input>

            </el-form-item>
            <el-form-item>
              <el-button class="" @click="addBook"><span>提 交</span></el-button>
              <el-button type="button" class="" @click="showAddForm=false"><span>取 消</span></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-for="book in bookList">
        <li class="book_item" :class="{book_item_active:book.book_id==curBook.book_id}" title="book.name"
          @click="activeBook(book)" ><span>{{ book.name }}</span></li>
      </div>
    </div>

    <div class="middle" tabindex="0" @keyup.38="paperUpdown('up')" @keyup.40="paperUpdown('down')">
      <div class="new_paper" @click="newPaper"><i class="el-icon-circle-plus"></i><span> 新建文章</span></div>
      <div class="paper_list" v-for="paper in paperList">
        <li class="paper_item" :class="{paper_item_active:paper.paper_id==curPaper.paper_id}" title="paper.title"
            @click="activePaper(paper)"><span>{{paper.title}}</span>
        </li>
      </div>
    </div>

    <div class="right" tabindex="0">
      <div v-show="curPaper">
              <div class="save">
        <el-dropdown>
          <span class="el-dropdown-link"><i class="el-icon-more-outline dropdownicon"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="modifyPaper">保存</span></el-dropdown-item>
            <el-dropdown-item disabled>发布</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="write_container">
        <div>
          <input type="text" class="input_title" v-model="curPaper.title" v-if="curPaper">
        </div>
        <div class="editor-container">
          <!--style给定宽度可以影响编辑器的最终宽度-->
          <script type="text/html" id="editor">
          </script>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {
        editorHeight:800,
        editor: null,
        showAddForm: false,
        bookList: [],
        paperList: [],
        curBook: {
          name: null,
          book_id: null,
        },
        curPaper: {
          title: '',
          content:''
        },
        bookForm: {
          name: '',
          description: ''
        },
      }
    },
    computed: {
        ueditorHeight:function () {
          var that = this
          return document.body.clientHeight-100
        }
    },
    watch: {
      curBook: function () {
        var that = this;
        that.getPaperList(that.curBook.book_id)
      },
      curPaper:function () {
          var that =this
        if (that.curPaper){
          that.editor.ready(function () {
            var content = that.curPaper.content?that.curPaper.content:''
            that.editor.setContent(content,false)
        })
        }
      }
    },
    methods: {
      bookDeleteDialog:function (book_id) {
        this.$confirm('删除该笔记本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      bookDelete:function (book_id) {
        this.httpGet()
      },
      bookUpdown:function (param) {
        console.log(param)
        var that = this
        var border = param == 'up'?0:that.bookList.length-1
        that.bookList.some(function (item, index) {
          if (item.book_id == that.curBook.book_id){
              if (index==border){
                  that.curBook = item
              }
              else{
                  that.curBook = that.bookList[index+(param=="up"?-1:1)]
              }
              return true
          }
        })
      },
      paperUpdown:function (param) {
        console.log(param)
        var that = this
        var border = param == 'up'?0:that.paperList.length-1
        that.paperList.some(function (item, index) {
          if (item.paper_id == that.curPaper.paper_id){
              if (index==border){
                  that.curPaper = item
              }
              else{
                  that.curPaper = that.paperList[index+(param=="up"?-1:1)]
              }
              return true
          }
        })
      },
      lastBook:function () {
        var that = this

      },
      nextBook:function () {

      },
      init: function () {
        var that = this
        that.editor = UE.getEditor("editor", {
          autoHeightEnabled: false,
          initialFrameWidth: null,
          initialFrameHeight: that.ueditorHeight,
          elementPathEnabled:false,
          wordCount:false,
            toolbars: [[
            'fullscreen',
            'bold', 'italic', 'underline', 'blockquote','|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist','|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
             'insertcode','|',
            'horizontal'
        ]],
        })
        that.getBookList()
      },
      goMain:function () {
        this.$router.push('/main')
      },
      handleCommand(command) {
          console.log(command)
      },
      addBook: function () {
        var that = this
        that.httpPost('/book/save', that.bookForm, {emulateJSON: true}).then(function (data) {
          that.showAddForm = false
          that.getBookList()
        })
      },
      getBookList: function () {
        var that = this
        that.httpGet('/book/list').then(function (data) {
          that.bookList = data.book_list
          that.curBook = that.bookList[0]

        })
      },
      activeBook: function (book) {
        var that = this
        that.curBook = book
      },
      activePaper: function (paper) {
        var that = this
        that.curPaper = paper
      },
      getPaperList: function (book_id) {
        var that = this
        that.httpGet('/paper/list', {book_id: book_id}).then(function (data) {
          that.paperList = data.paper_list
          that.curPaper = that.paperList[0]
        })
      },
      savePaper: function (paper) {
        return new Promise((resolve,reject)=>{
          this.httpPost('/paper/save', paper, {emulateJSON: true}).then(function (data) {
          var res = data.paper
            resolve(res)
        })
        })
      },
      newPaper: function () {
        var that = this
        var tpaper = {
          paper_id: null,
          title: that.dateFormat("yyyy-MM-dd"),
          author: 'yishunxin',
          conent:'',
          book_id: that.curBook.book_id
        }
        that.savePaper(tpaper).then(function (data) {
            that.curPaper = data
                  that.paperList.splice(0, 0, data)

        })
      },
          modifyPaper:function () {
      var that = this
      that.curPaper.content = that.editor.getContent()
      that.savePaper(that.curPaper).then(function (data) {
        that.curPaper = data
      })
    },
    },

    mounted: function () {
      this.init()
    }
  }
</script>
<style scoped>
  .container {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .left {
    width: 17%;
    height: 100%;
    background-color: #404040;
    color: #f2f2f2;
  }

  .back {
    padding: 30px 18px 5px;
    text-align: center;
  }

  .back_btn {
    /* border-radius: 20px; */
    padding: 12px 23px;
    background: transparent;
    /* display: block; */
    font-size: 15px;
    /* padding: 9px 0; */
    color: #ec7259;
    border: 1px solid rgba(236, 114, 89, .8);
    border-radius: 20px;
  }

  .new_container {
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .book_item {
    position: relative;
    line-height: 40px;
    list-style: none;
    font-size: 15px;
    color: #f2f2f2;
    background-color: #404040;
    padding: 0 15px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: padding .2s;
    -o-transition: padding .2s;
    transition: padding .2s;
  }

  .book_item_active {
    background-color: #666666;
    border-left: 3px solid #ec7259;
  }

  .book_item:hover {
    background-color: #666666;
  }

  .new_paper {
    line-height: 20px;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0 20px 25px;
    cursor: pointer;
    color: #595959;
  }

  .middle {
    width: 25%;
    overflow-y: scroll;
    height: 100%;
  }

  .right {
    width: 60%;
    height: 100%;
    padding-top: 20px;
  }

  .paper_list {
    position: relative;
    margin-bottom: 0;
    background-color: #efe9d9;
    border-top: 1px solid #d9d9d9;
  }

  .paper_item:hover {
    background-color: #e6e6e6;
  }

  .paper_item {
    position: relative;
    height: 90px;
    color: #595959;
    background-color: #fff;
    margin-bottom: 0;
    padding: 15px 10px 15px 60px;
    -webkit-box-shadow: 0 0 0 1px #d9d9d9;
    box-shadow: 0 0 0 1px #d9d9d9;
    border-left: 5px solid transparent;
    list-style: none;
    line-height: 60px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .paper_item_active {
    border-left-color: #ec7259;
  }

  .save {
    font-size: 20px;
    color: #a9a7a7;
    position: absolute;
    right: 20px;
    top: 2px;
  }

  .dropdownicon {
    font-size: 30px;
  }

  .write_container {
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .input_title {
    width: 100%;
    padding: 0 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .editor-container{
    height:100%;
    overflow-y: hidden;
  }

</style>
