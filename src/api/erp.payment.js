import request from '../utils/request'

export function list (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/payment/list',
    method: 'post',
    params :data
  })
}


export function detail (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/payment/paymentInfo',
    method: 'post',
    params :data
  })
}


