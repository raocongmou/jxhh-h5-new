
import request from '../../../utils/request';
import store from "@/store";

const baseUrl3 = '/api/tscp-enterprise/lcdoc'

// 列表获取
export function getLcdocList(params) {
  return request({
    url: `${baseUrl3}/list`,
    method: 'get',
    params
  })
}
// 详情获取
export function getLcdocInfo(creditNo) {
  return request({
    url: `${baseUrl3}/LcdocInfo?creditNo=${creditNo}`,
    method: 'get',
  })
}