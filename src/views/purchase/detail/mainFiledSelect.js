import { Dialog, Notify } from "vant";

/**
 * 选框点击事件
 * 
 * @param {*} _that 
 * @param {*} fieldName 
 * @returns 
 */
export function mainFieldSelect(_that, fieldName) {
  if (_that.orderReadOnly) {
    Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
    return;
  }
  if (fieldName === "vendor") {
    _that.employeeNoVendor = _that.formData.employeeNo;
    if (
      !_that.employeeNoVendor ||
      _that.employeeNoVendor === "" ||
      _that.employeeNoVendor === undefined
    ) {
      Notify({ type: "danger", message: "请先选择业务员" });
      return;
    }
  }
  _that.popupShow[fieldName] = true;
  _that.mainOptionSelect.fieldName = fieldName;
}

/**
 *  选择了一个 条目
 * @param {*} _that 
 * @param {*} item   条目的内容
 */
export function mainFieldSelectItem(_that, item) {
  let fieldName = _that.mainOptionSelect.fieldName;
  if (fieldName === "employee") {
    // 将之前选择的供货商所赋值的字段都设置为空
    _that.resetVendorItem(null);
    let userNo = item.userNo;
    if (!_that.formData.employeeNo || userNo === _that.formData.employeeNo) {
      _that.formData.employeeName = item.userName;
      _that.formData.employeeNo = item.userNo;
      _that.formData.orgNo = item.orgNo;
      _that.formData.orgName = item.orgName;
    } else if (_that.formData.employeeNo) {
      Dialog.confirm({
        title: "修改业务员",
        message: "该操作将会重置你所选择的往来单位以及商品明细,是否继续?"
      })
        .then(res => {
          _that.formData.employeeName = item.userName;
          _that.formData.employeeNo = item.userNo;
          _that.formData.orgNo = item.orgNo;
          _that.formData.orgName = item.orgName;
          _that.formData.items = [];
          _that.formData.vendorName = "";
          _that.formData.vendorNo = "";
        })
        .catch(res => {});
    }
  } else if (fieldName === "vendor") {
    _that.formData.vendorName = item.coNameE;
    _that.formData.vendorNo = item.vendorNo1;
    ///往来单位的 数据 需要处理进 联系信息中

    for (let i = 0; i < _that.formData.contactItems.length; i++) {
      if (_that.formData.contactItems[i].controlA === "V") {
        _that.formData.contactItems[i].addr = item.addr2;
        _that.formData.contactItems[i].city = item.city;
        _that.formData.contactItems[i].zipCode = item.zipCode;
        _that.formData.contactItems[i].title = item.title;
        _that.formData.contactItems[i].contact = item.contact;
        _that.formData.contactItems[i].fax = item.fax;
        _that.formData.contactItems[i].email = item.email;
        _that.formData.contactItems[i].addr = item.addr2;
      }
    }
  } else if (fieldName === "warehouse") {
    _that.formData.shipTo = item.wareLoc;
    // _that.formData.shipTo = item.wareName;
    _that.formData.wareLocNo = item.wareLocNo;
  }

  _that.popupShow[fieldName] = false;
  _that.mainOptionSelect.fieldName = "";
}
