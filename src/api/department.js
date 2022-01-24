import Vue from 'vue';
let request=Vue.prototype.$axios;
  //获取学院简称
function getCollegeAbbr() {
    return request({
      url: '/college/abbr',
      method: 'get'
    })
  }
  //根据学院，获取上级组织
function getParent(collegeId) {
    return request({
      // url: `/department/parent?college-id=${collegeId}`,
      url: `/org/parent?college-id=${collegeId}`,
      method: 'get',
    })
  }
//根据学院id获取社团
function getAssociation(collegeId) {
  return request({
    url: `/org/association/?college-id=${collegeId}`,
    method: 'get',
  })
}
// 根据上级组织获取部门
function getDepartment(parentId) {
    return request({
      // url: `/department/?mark=${mark}&&parent-id=${parentId}`,
      url: `/org/department/?parent-id=${parentId}`,
      method: 'get',
    })
  }
  // 根据 id 获取部门详情
function getOrgDetail(orgId) {
    return request({
      url: `/org/${orgId}`,
      // url: `/department/:${departmentId}`,
      method: 'get',
    })
  }
  //根据部门、社团 id，获取成员列表
function getMember(orgId) {
  return request({
    url: `/member?orgId=${orgId}`,
    method: 'get',
  })
}

export{getCollegeAbbr,getDepartment,getParent,getMember,getOrgDetail,getAssociation}
