import request from '@/utils/request'

export function getList() {
  return request({
    url: '/newest',
    method: 'get',
    // params
  })
}
// 编辑 个人信息表
export function Modify(params) {
  return request({
    url: 'Modify/information',
    method: 'put',
    params
  })
}
// 删除
export function Remove(id) {
  return request({
    url: 'Remove/information',
    method: 'delete',
    data: {
      id
    }
  })
}
// 搜索
export function Search(params) {
  return request({
    url: 'user/search',
    method: 'get',
    params
  })
}
// 添加个人信息
export function createInformation(query) {
  return request({
    url: 'Add/information',
    method: 'post',
    data: query
  })
}
