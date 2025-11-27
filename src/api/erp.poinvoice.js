
import request from '../utils/request'

export function list (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/poinvoice/list',
    method: 'post',
    data
  })
}

export function detail (poInvoiceNo) {
 // data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/poinvoice/detail/' + poInvoiceNo,
    method: 'get',
  })
}
