/**
 * 
 * 
 *  新增一个单据的时候，需要给表单默认值
 *  
 * */

import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { dateFormat } from "@/utils/format";
import { getDocNum } from "@/api/common";
import { getCookie } from "@/utils/user.setting";

export default function(_that) {
  // _that.formData = {};
  // _that.formData.auditStatus = "D";
  // _that.formData.currencyCode = "CNY";
  // _that.formData.poStatus = "U";
  // _that.formData.exchRate = 1.0;
  // _that.formData.soType = 0;
  // _that.formData.items = [];
  // _that.formData.fileItems = [];
  _that.formData.orgCoNo = getDefaultOrgCoNo();
  for (let key in _that.formData) {
    _that.formData[key] = _that.initFormData[key];
  }
  _that.formData.orgCoNo = getDefaultOrgCoNo();
  _that.formData.ordTypNo = "1";
  _that.formData.orderType = "自营出口";
  _that.formData.poDate = dateFormat(new Date(), "yyyy-MM-dd");
  _that.poDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
  _that.formData.poStatus = "U";
  _that.formData.currencyCode = "CNY";
  _that.formData.exchRate = 1.0;
  _that.formData.auditStatu = "D";
  _that.formData.prmyScny = "C";
  _that.formData.effectFlag = 0;

  _that.formData.shipTo = "";
  _that.formData.partialShip = "N";
  _that.formData.earlyShip = "N";
  _that.formData.needInspect = "Y";
  _that.formData.objectNo = "成品";
  _that.formData.poType = "1";
  _that.formData.empNo = getCookie("loginInfo").userNo;
  _that.formData.empName = getCookie("loginInfo").realName;
  _that.formData.employeeNo = getCookie("loginInfo").userNo;
  _that.formData.employeeName = getCookie("loginInfo").realName;
  _that.formData.orgNo = getCookie("loginInfo").orgNo;
  _that.formData.orgName = getCookie("loginInfo").orgName;
  // poNo赋值
  getDocNum({
    objectNo: "PM021",
    orgCoNo: getCookie("loginInfo").orgCoNo
  }).then(res2 => {
    if (res2.data) {
      _that.formData.poNo = res2.data;
    }
  });
}
