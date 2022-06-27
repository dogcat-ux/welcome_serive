import Vue from 'vue';

let request = Vue.prototype.$axios;

//获取学院简称
function getExcellent() {
  return request({
    url: '/org/excellent',
    method: 'get'
  })
}

export {getExcellent}
