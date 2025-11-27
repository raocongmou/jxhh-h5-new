import request from "../utils/request";

export function list(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/purchaseOrder/listForMobile",
    // url: "/api/tscp-enterprise/purchaseOrder/list",
    method: "post",
    //data
    params: data
  });
}

// 合同变更 docEntry
export function orderChange(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/orderChange`,
    method: "post",
    params
  });
}

// 提交SAP
// docEntry
export function submitToSap(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/submitToSap`,
    method: "post",
    params
  });
}

// 查询采购合同
export function findPurchaseOrder(data) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/findPurchaseOrder`,
    method: "post",
    params: data
  });
}

export function detail(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/purchaseOrder/purchaseOrderInfo",
    method: "post",
    //data
    params: data
  });
}

export function save(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/add`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: params //docEntry
  });
}

export function update(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/update`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: params //docEntry
  });
}

export function deleteDocentry(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/purchaseOrder/delete",
    method: "delete",
    //data
    params: data
  });
}

export function undoApply(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/undoApply`,
    method: "post",
    params //docEntry
  });
}
export function apply(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/apply`,
    method: "post",
    params //docEntry
  });
}
