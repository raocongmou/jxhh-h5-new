import request from "../../../utils/request";
import store from "@/store";

const baseUrl3 = "/api/tscp-enterprise/Invoice";

// 列表获取
export function getInvoiceList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    // url:`${baseUrl3}/list?orderType=自营` ,
    url: `${baseUrl3}/mobilList?orderType=自营`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}
// 列表获取
// export function getInvoiceList(params) {
//   return request({
//     url:`${baseUrl3}/mobilList` ,
//     method:'post',
//     params
//   })
// }
// 详情
export function getInvoiceInfo(params) {
  return request({
    url: `${baseUrl3}/InvoiceInfo`,
    method: "get",
    params //docentry
  });
}

// 查找出口合同商品
export function findOrderItem(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: "/api/tscp-enterprise/document/findOrderItem", //orgName userNo vendorName
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}

export function findInlandSaleItem(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: "/api/tscp-enterprise/document/findInlandSaleItem", //orgName userNo vendorName
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}

// 查找转口销售合同商品
export function findZkOrderItem(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: "/api/tscp-enterprise/document/findZkOrderItem", //orgName userNo vendorName
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}
// 弹窗公共调用接口封装函数
/***
 * @param params 接口真实参数列表
 * @param partPath 接口拼接地址参数
 */
export function dialogApi(params, partPath) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: `/api/tscp-enterprise/${partPath}`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}
