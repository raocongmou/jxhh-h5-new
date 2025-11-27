import request from "@/utils/request";
import store from "@/store";
let baseURL = "/api/tscp-enterprise/Product";
export function findProductByName(params) {
  return request({
    url: `${baseURL}/findProductByName`,
    method: "post",
    params
  });
}
