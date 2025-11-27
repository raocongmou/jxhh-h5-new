
import request from '../../../utils/request';

// 列表获取
export function getCustomsDeclarationList(params) {
  return request({
    url: `/api/tscp-enterprise/Dechead/list`,
    method: 'get',
    params
  })
}