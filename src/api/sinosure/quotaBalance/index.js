import request from '@/utils/request';

// 列表获取
export function getQuotaBalanceList(params) {
  return request({
    url:`/api/tscp-enterprise/ediQuotaBalanceInfo/list`,
    method:'post',
    params
  })
}