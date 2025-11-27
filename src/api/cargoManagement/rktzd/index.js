import request from "@/utils/request";
import store from "@/store";

const baseUrl3 = "/api/tscp-enterprise/warehouseRktzd";
// const baseUrl3 = "/api/tscp-enterprise/wareHouse";
// 出库单列表获取
export function getWareHouseList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    // url: `${baseUrl3}/list`,
    url: `${baseUrl3}/listForMobile`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}

// 详情
export function getWareHouseInfo(params) {
  return request({
    url: `${baseUrl3}/warehouseInfo`,
    method: "post",
    params //docEntry
  });
}
