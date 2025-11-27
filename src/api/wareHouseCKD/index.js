import request from "../../utils/request";
import store from "@/store";

//仓库信息
const baseUrl3 = "/api/tscp-enterprise/wareHouseLoc";

// 列表获取
export function getWareHouseLocList(params) {
  // let orgCoNo = store.getters.orgCoNo;
  // console.log("orgCoNo", orgCoNo);
  return request({
    url: `${baseUrl3}/list`,
    method: "post",
    params: {
      // orgCoNo,
      ...params
    }
  });
}

//销售合同查询
export function findInlandSale(params) {
  return request({
    url: `/api/tscp-enterprise/wareHouse/findInlandSale`,
    method: "post",
    params
  });
}
// 2出库单 - 查找出口发票、转口销售
export function findInvoiceSelect(params) {
  return request({
    url: `/api/tscp-enterprise/wareHouse/findInvoiceSelect`,
    method: "post",
    params
  });
}

const base = "/api/tscp-enterprise/Vendor";
// 出库单 往来单位vendorno1
export function getVendorInfo(params) {
  return request({
    url: `${base}/VendorInfo`, //orgName userNo vendorName
    method: "get",
    params
  });
}

const baseUrl2 = "/api/tscp-enterprise/wareHouse";

// 出库单 - 获取销售合同我方联系信息
// orgCoNo
// isNo
export function findSaleContactInfo(params) {
  return request({
    url: `${baseUrl2}/findSaleContactInfo`,
    method: "post",
    params
  });
}

export function findInvContactInfo(params) {
  return request({
    url: `${baseUrl2}/findInvContactInfo`,
    method: "post",
    params
  });
}

// 出库单修改
export function updateWareHouse(data) {
  return request({
    url: `${baseUrl2}/updateCKD`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}

// 出库单新增
export function addWareHouse(data) {
  return request({
    url: `${baseUrl2}/addCKD`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}

// 批量删除
export function delWareHouse(params) {
  return request({
    url: `${baseUrl2}/delete`,
    method: "delete",
    params
  });
}

// 申请审批 wareHsId
export function apply(params) {
  return request({
    url: `${baseUrl2}/apply`,
    method: "post",
    params
  });
}

// 撤销审批 wareHsId
export function undoApply(params) {
  return request({
    url: `${baseUrl2}/undoApply`,
    method: "post",
    params
  });
}

// 提交SAP
// docEntry
export function applySap(params) {
  return request({
    url: `${baseUrl2}/submitToSap`,
    method: "post",
    params
  });
}
