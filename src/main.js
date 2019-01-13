// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引用全局css样式
import './assets/css/reset.css'
import './assets/css/main.css'
//引用全局css文件

//引用组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from './axios'
require('./mocks/tableData.js');
import pubData from './mocks/PubData.js'
require('./mocks');
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.pubData = pubData; //挂载为全局变量
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: {
    App
  },
  template: '<App/>'
});
