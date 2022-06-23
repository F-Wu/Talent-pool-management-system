import request from '@/utils/request'

// 添加 人才信息
export function createInformation(query) {
  return request({
    url: 'Add/information',
    method: 'post',
    data: query
  })
}
export function createEducation(query) {
  return request({
    url: 'Add/education',
    method: 'post',
    params: query
  })
}
export function createExpect(query) {
  return request({
    url: 'Add/expect',
    method: 'post',
    params: query
  })
}
export function createProject(query) {
  return request({
    url: 'Add/project',
    method: 'post',
    params: query
  })
}
export function createWork(query) {
  return request({
    url: 'Add/work',
    method: 'post',
    params: query
  })
}
