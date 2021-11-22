import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import Global from "./Global";

axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/616f73c14351af34a2ddf29a/'
// axios.defaults.baseURL = 'http://welcome.fzuhelper.w2fzu.com/'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$Global = Global

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
