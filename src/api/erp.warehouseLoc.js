import request from '../utils/request'

export function wareHouseLocList (params = {}) {
  params.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/wareHouseLoc/list',
    method: 'post',
    params
  })
}
