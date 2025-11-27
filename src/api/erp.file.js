import request from "../utils/request";

export function upload(data) {
  return request({
    url: "/api/ccp-system/file/upload",
    contentType: "multipart/form-data",
    method: "post",
    data
  });
}

export function down(data) {
  return request({
    url: "/api/ccp-system/file/down/" + data,
    responseType: "blob",
    method: "get"
  });
}

export function order2pdf(data) {
  return request({
    url: "/order2pdf/ExportToPdf",
    responseType: "blob",
    method: "get",
    params: data
  });
}

export function updateFile(params) {
  return request({
    url: `/api/tscp-enterprise/purchaseOrder/file/update`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: params //docEntry
  });
}
