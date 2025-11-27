import request from "@/utils/request";
import store from "@/store";

const baseUrl3 = "/api/tscp-enterprise/warehouseCktzd";
// const baseUrl3 = "/api/tscp-enterprise/wareHouse";
// 出库单列表获取
export function getWareHouseList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: `${baseUrl3}/listForMobile`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}
// export function getWareHouseList(params) {
//   let orgCoNo = store.getters.orgCoNo;
//   return request({
//     url: `${baseUrl3}/list`,
//     method: "post",
//     params: {
//       orgCoNo,
//       ...params
//     }
//   });
// }
// 详情
export function getWareHouseInfo(params) {
  return request({
    url: `${baseUrl3}/warehouseInfo`,
    method: "post",
    params //docEntry
  });
}
// 新增
export function addWareHouse(data) {
  return request({
    url: `${baseUrl3}/add`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
// 修改
export function updateWareHouse(data) {
  return request({
    url: `${baseUrl3}/update`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
// 批量删除
// export function delWareHouse(idList) {
//   return request({
//     url: `${baseUrl3}/deleteByList`,
//     method: "delete",
//     params: {
//       idList
//     }
//   });
// }
export function delWareHouse(params) {
  return request({
    url: `${baseUrl3}/delete`,
    method: "delete",
    params
  });
}
// 申请审批 wareHsId
export function apply(params) {
  return request({
    url: `${baseUrl3}/apply`,
    method: "post",
    params
  });
}

// 撤销审批 wareHsId
export function undoApply(params) {
  return request({
    url: `${baseUrl3}/undoApply`,
    method: "post",
    params
  });
}

// 详情
export function ckTz(params) {
  return request({
    url: `${baseUrl3}/ckTz`,
    method: "post",
    params //docEntry
  });
}
