
import request from '../../../utils/request';
import store from "@/store";

let baseUrl = "/api/tscp-enterprise/payment";

// 付款通知单-列表获取
export function getPaymentList(params) {
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
export function getPaymentInfo(params) {
  return request({
    url:`${baseUrl}/paymentInfo`,
    method:'post',
    params//docEntry
  })
}
// 新增
export function addPayment(data) {
  return request({
    url:`${baseUrl}/add`,
    method:'post',
    headers: {
      'Content-Type':'application/json'
    },
    data
  })
}
// 修改
export function updatePayment(data) {
  return request({
    url:`${baseUrl}/update`,
    method:'post',
    headers: {
      'Content-Type':'application/json'
    },
    data
  })
}
// 批量删除
export function delPayment(idList) {
  return request({
    url:`${baseUrl}/deleteByList`,
    method:'delete',
    params: {
      idList
    }
  })
}
// 删除 docEntry
export function deletePayment(params) {
  return request({
    url:`${baseUrl}/delete`,
    method:'delete',
    params
  })
}
// 申请审批 docEntry
export function apply(params) {
  return request({
    url:`${baseUrl}/apply`,
    method:'post',
    params
  })
}

// 提交SAP
// docEntry
export function submitToSap(params) {
  return request({
    url:`${baseUrl}/submitToSap`,
    method:'post',
    params
  })
}

// 附件列表获取
export function getPaymentFileList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url:`${baseUrl}/file/list`,
    method:'post',
    params: {
      orgCoNo,
      ...params,
    }
  })
}
// 修改附件
export function updatePaymentFile(data) {
  return request({
    url:`${baseUrl}/file/update`,
    method:'post',
    headers: {
      'Content-Type':'application/json'
    },
    data
  })
}