import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
// 管理员
export function admin() {
  return request({
    url: 'user/admin',
    method: 'GET'
  })
}
export function adminRemove(id) {
  return request({
    url: 'Remove/admin',
    method: 'DELETE',
    data: {
      id
    }
  })
}
export function adminModify(data) {
  return request({
    url: 'Modify/admin',
    method: 'PUT',
    data
  })
}
export function adminAdd(data) {
  return request({
    url: 'Add/admin',
    method: 'POST',
    data
  })
}
