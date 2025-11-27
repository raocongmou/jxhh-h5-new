
import request from '../../../utils/request';
import store from "@/store";

let baseUrl = "/api/tscp-enterprise/isInvoice";

// 列表获取
export function getInvoiceList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url:`${baseUrl}/list`,
    method:'post',
    params: {
      orgCoNo,
      ...params,
    }
  })
}
// 详情
export function getInvoiceInfo(params) {
  return request({
    url:`${baseUrl}/isInvoiceInfo`,
    method:'post',
    params//docEntry
  })
}