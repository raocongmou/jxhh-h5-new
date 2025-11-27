import request from "../../utils/request";
/**
 * 审批状态
*/
const baseAudit = "/api/tscp-enterprise/table3X";

export function getAuditStatusList(params) {
  return request({
    url: `${baseAudit}/getAuditStatusList`,
    method: "post",
    params
  });
}

export function getCurrencyCodeList(params) {
  return request({
    url: `${baseAudit}/getCurrencyCodeList`,
    method: "post",
    params
  });
}

export function getTable3XByDoc(params) {
  return request({
    url: `${baseAudit}/getTable3XByDoc`,
    method: "post",
    params
  });
}
// 代码表
export function getTable3XByRef(params) {
  return request({
    url: `${baseAudit}/getTable3XByRef`,
    method: "post",
    params
  });
}

export function getDocNum(params) {
  return request({
    url: "/api/tscp-enterprise/CodeRule/getDocNum",
    method: "post",
    params
  });
}

export function getDocStatusList(params) {
  return request({
    url: `${baseAudit}/getDocStatusList`,
    method: "post",
    params
  });
}
// 基础数据-判断是否有菜单权限
// moduleNo/orgCoNo
export function isUserMenuControl(params) {
  return request({
    url: `${baseAudit}/isUserMenuControl`,
    method: "post",
    params
  });
}

const baseUrl3 = "/api/tscp-enterprise/bank";

// 列表获取
export function getBankList(params) {
  return request({
    url: `${baseUrl3}/list`,
    method: "get",
    params
  });
}

// 取汇率
export function getExchangeRate(params) {
  return request({
    url: "/api/tscp-enterprise/acctExchangeRate/getExchangeRate",
    method: "get",
    params
  });
}
/*
* 平台公司修改
*/
export function updateOrgCoNo(params) {
  return request({
    url: `/api/tscp-enterprise/SysOrganization/updateOrgCoNo`,
    method: "post",
    params
  });
}
