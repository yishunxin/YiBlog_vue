// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './global'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import vueEventCalendar from '../third/calender/index.js'
import '../third/calender/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
Vue.use(vueEventCalendar, {locale: 'zh', className: 'selected-day'})
Vue.use(VueResource)
import 'element-ui/lib/theme-chalk/index.css'

window.$ = require('jquery')
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

var etpl = require('etpl');
Vue.config.productionTip = false
Vue.mixin(global)
Vue.use(ElementUI)
import {emoji} from './utils/emoji.js'

Vue.prototype.emoji = emoji
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    eventBus: new Vue()
  },
  components: {App},
  template: '<App/>'
})
