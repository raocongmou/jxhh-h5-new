import request from "../../../utils/request";
import store from "@/store";

const baseUrl3 = "/api/tscp-enterprise/poProposal";

// 列表获取
export function getProposalBackList(params) {
  let orgCoNo = store.getters.orgCoNo;
  return request({
    url: `${baseUrl3}/backListForMobile`,
    method: "post",
    params: {
      orgCoNo,
      ...params
    }
  });
}

// 申请审批 docEntry
export function apply(params) {
  return request({
    url: `${baseUrl3}/apply`,
    method: "post",
    params
  });
}

// docEntry
// cancelReason
export function undoApply(params) {
  return request({
    url: `${baseUrl3}/undoApply`,
    method: "post",
    params
  });
}
// export function getProposalBackList(params) {
//   let orgCoNo = store.getters.orgCoNo;
//   return request({
//     url:`${baseUrl3}/backList`,
//     method:'post',
//     params: {
//       orgCoNo,
//       ...params,
//     }
//   })
// }
