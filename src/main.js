// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入公共样式
import './assets/css/public/common.css'

// 定义一个全局过滤器实现日期的格式化
import moment from 'moment'
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 定义一个全局过滤器实现日期的格式化
moment.locale('zh-cn')
Vue.filter('datefmt', function (input, fmtstring) {
// 使用momentjs这个日期格式化类库实现日的格式化功能
  return moment(input).format(fmtstring)
})
Vue.filter('maxSlice', function (input, number) {
  let haystack = input.toString()
  return haystack.length > number ? haystack.slice(0, number) + '...' : haystack
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
