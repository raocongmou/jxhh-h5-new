import request from "../utils/request";

export function listVendorByUser(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/Vendor/getVendorByUser",
    method: "post",
    //data
    params: data
  });
}

export function list(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/list",
    method: "get",
    //data
    params: data
  });
}

export function info(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/VendorApplyInfo",
    method: "get",
    //data
    params: data
  });
}

export function add(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/add",
    method: "post",
    //data
    data
  });
}

export function update(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/update",
    method: "post",
    //data
    data
  });
}

export function unitCodeInfo(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/UnitCodeInfo",
    method: "get",
    //data
    params: data
  });
}

export function apply(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/apply",
    method: "post",
    //data
    params: data
  });
}

export function deleteVd05(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/deleteByList",
    method: "delete",
    //data
    params: data
  });
}

export function applySap(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/vendorApply/submitToSap",
    method: "post",
    //data  docEntry=409
    params: data
  });
}

export function findVendorByName(params) {
  return request({
    url: `/api/tscp-enterprise/Vendor/findVendorByName`, //orgName userNo vendorName
    method: "post",
    params
  });
}

//vendorApply/
