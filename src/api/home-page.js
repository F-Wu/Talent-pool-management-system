import request from '@/utils/request'
// 获取用户数 折线图
export function getusers() {
  return request({
    url: 'users',
    method: 'get',
    // params
  })
}
// GETtotals 获取用户数 总数动态显示
export function gettotals() {
  return request({
    url: 'totals',
    method: 'get',
    // params
  })
}
// Hotoccupation 热门职业 扇形图
export function Hotoccupation() {
  return request({
    url: 'Hotoccupation',
    method: 'get',
    // params
  })
}
