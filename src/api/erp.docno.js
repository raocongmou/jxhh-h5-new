import request from '../utils/request'

export function genarateDocNo (data) {
  return request({
    url: '/api/tscp-enterprise/CodeRule/getDocNum',
    method: 'post',
    params :data
  })
}
