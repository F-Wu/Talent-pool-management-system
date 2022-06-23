import request from '@/utils/request'
// 获取教育经历
export function getEducation() {
  return request({
    url: 'get/education',
    method: 'get',
    // params
  })
}
// 编辑
export function Modify(params) {
  return request({
    url: 'Modify/education',
    method: 'put',
    params
  })
}
// 删除
export function Remove(id) {
  return request({
    url: 'Remove/education',
    method: 'delete',
    params: {
      id
    }
  })
}
// 添加
export function createArticle(query) {
  return request({
    url: 'Add/education',
    method: 'post',
    params: query
  })
}
