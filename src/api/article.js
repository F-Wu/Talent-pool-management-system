import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: 'details',
    method: 'get',
    params: {
      id
    }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: {
      pv
    }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

// 编辑 
export function ModifyInformation(data) {
  return request({
    url: 'Modify/information',
    method: 'put',
    data
  })
}
export function educationModify(data) {
  return request({
    url: 'Modify/education',
    method: "put",
    data
  })
}
export function expectModify(data) {
  return request({
    url: 'Modify/expect',
    method: "put",
    data
  })
}
export function projectModify(data) {
  return request({
    url: 'Modify/project',
    method: "put",
    data
  })
}
export function workModify(data) {
  return request({
    url: 'Modify/work',
    method: "put",
    data
  })
}
// 职业回显
export function occupationID(name, id) {
  return request({
    url: 'get/occupationID',
    method: "get",
    params: {
      name,
      id
    }
  })
}
