
import request from '../utils/request'

export function listProduct (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/Product/getProductByName',
    method: 'post',
    //data
    params :data
  })
}


export function list (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/Product/list',
    method: 'get',
    //data
    params :data
  })
}

export function pdtInfo (data) {

  return request({
    url: '/api/tscp-enterprise/Product/ProductInfo',
    method: 'get',
    //data
    params :data
  })
}
