import request from "@/utils/request";
import store from "@/store";
const baseUrl3 = "/api/tscp-enterprise/recpayRegist";

// 列表获取
export function list(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: `${baseUrl3}/list`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}

// 详情
export function detail(params) {
  return request({
    url: `${baseUrl3}/recpayRegistInfo`,
    method: "post",
    params //docEntry
  });
}

// 修改
export function update(data) {
  return request({
    url: `${baseUrl3}/update`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}

// 修改
export function updateReceiptBill(data) {
  return request({
    url: `${baseUrl3}/update`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
