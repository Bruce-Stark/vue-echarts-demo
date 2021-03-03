// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import chinaMap from '../public/js/china.js'
import axios from 'axios'
import ElementUI from 'element-ui'
// console.log(chinaMap)
Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
