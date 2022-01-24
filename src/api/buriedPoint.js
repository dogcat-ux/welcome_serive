import Vue from 'vue';

let request = Vue.prototype.$axios;
const urlHead = "https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103"

function welcomeNum() {
  return request({
    url: `${urlHead}/welcome_num`,
    method: 'get'
  })
}

function welcomePeople() {
  return request({
    url: `${urlHead}/welcome_people`,
    method: 'get'
  })
}

function welcomeXZZZ() {
  return request({
    url: `${urlHead}/welcome_xzzz`,
    method: 'get'
  })
}

function welcomeSTBM() {
  return request({
    url: `${urlHead}/welcome_stbm`,
    method: 'get'
  })
}

function welcomeSearch() {
  return request({
    url: `${urlHead}/welcome_search`,
    method: 'get'
  })
}

function welcomeShare() {
  return request({
    url: `${urlHead}/welcome_share`,
    method: 'get'
  })
}

function welcomeBMXQ(org_name) {
  return request({
    url: `${urlHead}/welcome_bmxq?bm=${org_name}`,
    method: 'get'
  })
}

export {welcomeNum, welcomePeople, welcomeXZZZ, welcomeSTBM, welcomeSearch, welcomeShare, welcomeBMXQ}
