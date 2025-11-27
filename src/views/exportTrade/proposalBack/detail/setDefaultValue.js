/**
 * 
 * 
 *  新增一个单据的时候，需要给表单默认值
 *  
 * */ 

import { getDefaultOrgCoNo } from "@/utils/user.setting";

export default function(_that) {
    _that.formData = {};
    _that.formData.auditStatus = "D";
    _that.formData.currencyCode = "CNY";
    _that.formData.poStatus = "U";
    _that.formData.exchRate = 1.0000;
    _that.formData.items = [];
    _that.formData.fileItems = [];
    _that.formData.orgCoNo = getDefaultOrgCoNo(); 
}