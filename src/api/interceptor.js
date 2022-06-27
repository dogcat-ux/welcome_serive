import Vue from "vue";  //引入axios
import axios from 'axios'

// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/' : 'http://120.55.53.66:9394/';
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/' : 'http://150.158.181.63:8080/';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/' : 'https://welcome.fzuhelper.w2fzu.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
let instance = axios.create({})
// 当前正在请求的数量
let requestCount = 0;

function showLoading() {
  if (requestCount === 0) {
    Vue.prototype.$store.commit('SET_LOADING', true);
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
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
