<template>
  <div class="edit-div"
       v-html="innerText"
       contenteditable="true"
       @focus="isLocked = true"
       @blur="isLocked = false"
       @input="changeText">
  </div>
</template>
<script>
  export default{
    name: 'editDiv',
    props: {
      value: '',
    },
    data(){
      return {
        innerText: this.value,
        isLocked: false
      }
    },
    watch: {
      'value'(){
        if (!this.isLocked || !this.innerText) {
          this.innerText = this.value;
        }
      }
    },
    methods: {
      changeText: function () {
        this.$emit('input', this.$el.innerHTML);
      }
    }
  }
</script>
<style>
  .edit-div {
    height: 70px;
    width: 100%;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    vertical-align: bottom;
    display: block;
    resize: none;
    padding: 5px 15px;
    line-height: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  }
  .edit-div:hover {
    border-color: #c0c4cc;
  }
  .edit-div img{
    vertical-align: middle;
    height: 16px;
    width: 16px;
  }
</style>
