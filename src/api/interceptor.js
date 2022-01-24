import Vue from "vue";  //引入axios
import axios from 'axios'

// axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/616f73c14351af34a2ddf29a/'
axios.defaults.baseURL = process.env.NODE_ENV==='development'?'http://localhost:8080/api/':'http://120.55.53.66:9394/';
// axios.defaults.baseURL = 'http://localhost:8080/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json';
let instance = axios.create({})
// 当前正在请求的数量
let requestCount = 0;

function showLoading() {
  if (requestCount === 0) {
    Vue.prototype.$store.commit('SET_LOADING', true);
    console.log("加载中")
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    console.log("加载完成")
    Vue.prototype.$store.commit('SET_LOADING', false);
  }
}

// function sleep(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }

// http request 拦截器
instance.interceptors.request.use(
    config => {
      showLoading();
      return config
    },
    err => {
      return Promise.reject(err)
    })

// http response 拦截器
instance.interceptors.response.use(
    (response) => {
      // await sleep(500);
      //拦截响应，做统一处理
      hideLoading();
      console.log("响应")
      return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    async error => {
      hideLoading();
      // return error
      // Vue.prototype.$showMsg("请求出错！");
      // await sleep(500);
      // Vue.prototype.$hiddenMsg();
      return Promise.reject(error) // 返回接口返回的错误信息
    })

export default instance
