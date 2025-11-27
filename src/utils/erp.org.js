import Cookies from 'js-cookie'

import {listOrg,orgInfo} from "@/api/erp.org.js"
import Storage from "./storage"
import {getDefaultOrgCoNo} from "./user.setting"

const OrgKey = 'ZhengBang-OrgList'

export async function getOrgList() {
  var orgCoList= Storage.get("OrgCoList");
  
  if(orgCoList && 
    orgCoList!==undefined &&
    orgCoList!==null&&
    orgCoList.length>0){
    return  orgCoList;
  }
   const respData = await listOrg();
   orgCoList =respData.data;
   Storage.set("OrgCoList",orgCoList);
   return orgCoList
}




export async function getOrgInfo() {
  var orgInfo1= Storage.get("defultOrgInfo");
  
  if(orgInfo1 && orgInfo1!==undefined && orgInfo1!==null){
    return  orgInfo1;
  }
  let queryForm = {orgNo:"",userNo:"",orgCoNo:getDefaultOrgCoNo() }
   const respData = await orgInfo(queryForm);
   orgInfo1 =respData.data;
   Storage.set("defultOrgInfo",orgInfo1);
   return orgInfo1
}





export function setOrgList(orgList) {
  return Cookies.set(OrgKey,JSON.parse(JSON.stringify(orgList)))
}

export function removeOrgList() {
  return Cookies.remove(OrgKey)
}
