import request from "../../../utils/request";
import store from "@/store";

let baseUrl = "/api/tscp-enterprise/purchaseInvoice";

// 采购合同-列表获取
export function getPurchaseInvoice(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: `${baseUrl}/listForMobile`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}
// export function getPurchaseInvoice(params) {
//   let orgCoNo = store.getters.orgCoNo;
//   return request({
//     url:`${baseUrl}/list`,
//     method:'post',
//     params: {
//       orgCoNo,
//       ...params,
//     }
//   })
// }
// 采购合同-详情
export function getInvoiceInfo(params) {
  return request({
    url: `${baseUrl}/purchaseInvoiceInfo`,
    method: "post",
    params //docNum
  });
}
