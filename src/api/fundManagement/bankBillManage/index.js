import request from '@/utils/request';
import store from "@/store";
const baseUrl3 = '/api/tscp-enterprise/settlement'

// 列表获取
export function bankBillManageList(params) {
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
export function bankBillManageInfo(params) {
    return request({
      url:`${baseUrl3}/settlementInfo`,
      method:'post',
      params//docEntry
    })
  }

  // 修改
export function updateBankBillManage(data) {
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
  export function delBankBillManage(idList) {
    return request({
      url:`${baseUrl3}/deleteByList`,
      method:'delete',
      params: {
        idList
      }
    })
  }
  // 删除 docEntry
  export function deleteBankBillManage(params) {
    return request({
      url:`${baseUrl3}/delete`,
      method:'delete',
      params
    })
  }