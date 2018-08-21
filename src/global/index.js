/**
 * Created by yishunxin on 2018/7/4.
 */
import config from './config'
import axios from 'axios'
export default {
  methods: {
    getUrl: function (path) {
      if (process.env.NODE_ENV == 'production') {
        return config.PRODUCTION_SERVER + path
      } else {
        path = 'http://' + config.DEV_SERVER + path
        return path
      }
    },
    httpGet: function (path, params) {
      if (!params) {
        params = {}
      }
      var that = this
      var url = this.getUrl(path)
      return new Promise(function (resolve, reject) {
        axios.get(url + "?token=" + localStorage.getItem('user_token'), {
          params: params
        }).then(function (response) {
          var res = response.data
          if (res.code == 0) {
            resolve(response.data)
          } else if (res.code == 1005) {
            that.$router.push({
              path: '/login'
            })
          } else {
            reject(res)
            console.log('status code:' + res.code, url)
          }
        }, function (response) {
          // that.$alert('服务异常，请检查网络或联系客服', '提示', {
          //   confirmButtonText: '重新加载'
          // })
          that.$alert('服务异常，请检查网络或联系客服', '提示', {
            confirmButtonText: '重新加载'
          }).then(
            () => {
              window.location.reload();
            }
          ).catch(
            () => {
              window.location.reload();
            }
          );
        })
      })
    },
    httpPost: function (path, body, option = {emulateJSON: true}) {
      var url = this.getUrl(path)
      var that = this
      return new Promise(function (resolve, reject) {
        axios.post(url + "?token=" + localStorage.getItem('user_token'), body, option).then(function (response) {
          var res = response.data
          if (res.code == 0) {
            resolve(response.data)
          } else if (res.code == 1005) {
            that.$router.push({
              path: '/login'
            })
          } else {
            reject(res)
            console.log('status code:' + res.code)
          }
        }, function (response) {
          reject(response)
          // that.$alert('服务异常，请检查网络或联系客服', '提示', {
          //   confirmButtonText: '重新加载',
          // })

          that.$alert('服务异常，请检查网络或联系客服', '提示', {
            confirmButtonText: '重新加载'
          }).then(
            () => {
              window.location.reload();
            }
          ).catch(
            () => {
              window.location.reload();
            }
          );

        })
      })
    },
    dateFormat: function (format) {
      var date = new Date()
      var args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds()
      };
      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
      }
      return format;
    }
  }
}

