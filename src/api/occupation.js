import request from '@/utils/request'
// 职业
export function GEToccupation() {
  return request({
    url: 'tree/occupation',
    method: 'get',
  })
}
export function occupation() {
  return request({
    url: 'occupation',
    method: 'get',
  })
}
export function occupationModify(data) {
  return request({
    url: 'Modify/occupation',
    method: 'put',
    data
  })
}
export function occupationRemove(id) {
  return request({
    url: 'Remove/occupation',
    method: 'DELETE',
    data: {
      id
    }
  })
}
export function occupationAdd(data) {
  return request({
    url: 'Add/occupation',
    method: 'POST',
    data
  })
}
