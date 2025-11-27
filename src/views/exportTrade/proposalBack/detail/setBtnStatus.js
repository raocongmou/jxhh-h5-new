////  设置当前 页面的btn 状态
export default function(_that) {
  // 当前 页面的编辑状态 editStatus  考虑  add  edit  view
  if (_that.editStatus === "edit") {
    _that.btnShow.save = true;
    _that.btnShow.cancel = true;
    _that.btnShow.edit = false;
    _that.btnShow.applyAudit = false;
    _that.btnShow.cancelAudit = false;
    ////  当前 单据可以 修改
    _that.orderReadOnly = false;
    return;
  }
  ///当前是视图状态，不可编辑
  if (_that.editStatus === "view") {
    console.log("_that.editStatus", _that.editStatus);
    _that.orderReadOnly = true;
    /// 可新增
    // _that.btnShow.add = true;
    /// 不可保存、取消
    _that.btnShow.save = false;
    _that.btnShow.cancel = false;
    /// 需要根据，审批状态判断 是否可以编辑、删除、提交审批、撤销审批
    let auditStatu = _that.formData.auditStatus;

    // 未申请审批  ||  同意撤销
    if (
      auditStatu !== "D" &&
      auditStatu !== "D1" &&
      auditStatu !== "UN" && //同意撤销
      auditStatu !== "N"
    ) {
      _that.btnShow.edit = false;
    } else {
      _that.btnShow.edit = true;
    }
    if (auditStatu === "D" || auditStatu === "UN" || auditStatu === "N") {
      _that.btnShow.edit = true;
      _that.btnShow.applyAudit = true;
      _that.btnShow.cancelAudit = false;
      // 提交审批  || 审批同意
    } else if (
      auditStatu === "S" ||
      auditStatu === "Y" ||
      auditStatu === "Up"
    ) {
      _that.btnShow.edit = false;
      _that.btnShow.applyAudit = false;
      _that.btnShow.cancelAudit = true;
      console.log("_that.btnShow.cancelAudit", _that.btnShow.cancelAudit);
      //申请撤销
    } else if (auditStatu === "SU") {
      _that.btnShow.edit = false;
      _that.btnShow.applyAudit = false;
      _that.btnShow.cancelAudit = false;
    }
  }
}
