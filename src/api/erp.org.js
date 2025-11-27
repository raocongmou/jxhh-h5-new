import request from "../utils/request";

export function listEmployee(data) {
  data.clientId = "2DE239C109891D060606E794F195F612";
  return request({
    url: "/api/tscp-enterprise/SysUser/getSysUserByName",
    method: "post",
    //data
    params: data
  });
}

// 获取所有的 平台公司列表
export function listOrg(query) {
  return request({
    url: "/api/tscp-enterprise/SysOrganization/getOrgCoList",
    method: "post",
    params: query
  });
}

////获取 当前平台公司的的基本信息
export function orgInfo(query) {
  return request({
    url: "/api/tscp-enterprise/table3X/getCompanyInfo",
    method: "post",
    params: query
  });
}
