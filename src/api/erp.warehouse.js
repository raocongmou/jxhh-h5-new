import request from '../utils/request'

/**
 * 查询 出入库单据列表
 * @param {*} data 
 * @returns 
 */

// export function list (data) {
//   data.clientId = '2DE239C109891D060606E794F195F612'
//   return request({
//     url: '/api/tscp-enterprise/wareHouse/list',
//     method: 'post',
//     //data
//     params :data
//   })
// }

const baseUrl3 = '/api/tscp-enterprise/wareHouse';

export function list (data) {
  data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/wareHouse/listForMobile',
    method: 'post',
    //data
    params :data
  })
}
export function detail (params) {
  // data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: '/api/tscp-enterprise/wareHouse/wareHouseInfo',
    method: 'post',
    //data
    params
  })
}
// 出库商品清单列表
export function getAccountList(params) {
  return request({
    url:`/api/tscp-enterprise/wareHouse/accountList`,
    method:'post',
    params
  })
}

// 3批量获取商品基础信息
export function findBasePdtInfoByList(params) {
  return request({
    url:`${baseUrl3}/findBasePdtInfoByList`,
    method:'post',
    params
  })
}

// 4根据平台公司、销售合同号查询销售合同商品
export function getIsNoPdtListByNo(params) {
  return request({
    url: `${baseUrl3}/inlandSaleItemInfoByNo`,
    method:'post',
    params
  })
}

// 4根据平台公司、销售合同号查询销售合同商品
export function getInvNoPdtListByNo(params) {
  return request({
    url: `${baseUrl3}/findInvoiceItemSelect`,
    method:'post',
    params
  })
}

// 5获取销售合同销售单价
export function getsaleItemUnitPrice(params) {
  return request({
    url: `${baseUrl3}/findSaleItemUnitPrice`,
    method:'post',
    params
  })
}

// 出口单证的商品单价
export function getInvPdtUnitPrices(params) {
  return request({
    url: `${baseUrl3}/findInvPdtInfoList`,
    method:'post',
    params
  })
}

// 详情
export function getwareHouseLocInfo(params) {
  return request({
    url:`/api/tscp-enterprise/wareHouseLoc/wareHouseLocInfo`,
    method:'get',
    params//docEntry
  })
}