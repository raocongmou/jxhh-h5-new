import request from '@/utils/request';
import store from "@/store";

const baseUrl3 = '/api/tscp-enterprise/quotaConfig'
// 列表获取
export function getQuotaApplyList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url:`${baseUrl3}/list`,
    method:'post',
    params: {
      orgCoNo,
      ...params,
    }
  })
}

// 详情
export function getQuotaApplyInfo(params) {
  return request({
    url:`${baseUrl3}/quotaConfigInfo`,
    method:'post',
    params//docEntry
  })
}

// 新增
export function addQuotaApply(data) {
  return request({
    url:`${baseUrl3}/add`,
    method:'post',
    headers: {
      'Content-Type':'application/json'
    },
    data
  })
}
// 修改
export function updateQuotaApply(data) {
  return request({
    url:`${baseUrl3}/update`,
    method:'post',
    headers: {
      'Content-Type':'application/json'
    },
    data
  })
}
// 批量删除
export function delQuotaApply(idList) {
  return request({
    url:`${baseUrl3}/deleteByList`,
    method:'delete',
    params: {
      idList
    }
  })
}

// 删除 docEntry
export function deleteQuotaApply(params) {
  return request({
    url:`${baseUrl3}/delete`,
    method:'delete',
    params
  })
}

// 申请审批 docEntry
export function apply(params) {
  return request({
    url:`${baseUrl3}/apply`,
    method:'post',
    params
  })
}

// 撤销审批
// docEntry
// cancelReason
export function undoApply(params) {
  return request({
    url:`${baseUrl3}/undoApply`,
    method:'post',
    params
  })
}