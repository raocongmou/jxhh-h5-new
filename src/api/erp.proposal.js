import request from "../utils/request";

// export function list (data) {
//   data.clientId = '2DE239C109891D060606E794F195F612'
//   return request({
//     url: '/api/tscp-enterprise/poProposal/list',
//     method: 'post',
//     //data
//     params :data
//   })
// }

export function list(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/poProposal/listForMobile",
    method: "post",
    //data
    params: data
  });
}

export function detail(params) {
  return request({
    url: `/api/tscp-enterprise/poProposal/poProposalInfo`,
    method: "post",
    params //docEntry
  });
}
export function save(params) {
  return request({
    url: `/api/tscp-enterprise/poProposal/add`,
    method: "post",
    data: params //docEntry
  });
}
//update  更新

export function update(params) {
  return request({
    url: `/api/tscp-enterprise/poProposal/update`,
    method: "post",
    data: params //docEntry
  });
}

export function deleteDocentry(params) {
  return request({
    url: `/api/tscp-enterprise/poProposal/delete`,
    method: "delete",
    params //docEntry
  });
}
