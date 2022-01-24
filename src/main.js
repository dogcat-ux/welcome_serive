import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import instance from "./api/interceptor";
import Global from "./Global";
import store from "./store/index";
import MsgFun from "./plugin/index";
// 引入 loading 自定义指令
// axios.defaults.baseURL = 'http://localhost:8080/api'
// axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/616f73c14351af34a2ddf29a/'
// axios.defaults.baseURL = 'http://welcome.fzuhelper.w2fzu.com/'
Vue.prototype.$store = store;
Vue.config.productionTip = false;
Vue.prototype.$axios = instance;
Vue.prototype.$Global = Global;
Vue.use(MsgFun)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
