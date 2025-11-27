import request from "../utils/request";

export function listOaStatus(objectNo, objId, objNo) {
  // data.clientId = '2DE239C109891D060606E794F195F612'
  return request({
    url: "/api/tscp-enterprise/fileProcess/getOaStatus",
    method: "post",
    params: {
      objectNo,
      objId,
      objNo
    }
  });
}
