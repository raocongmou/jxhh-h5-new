////  设置当前 页面的btn 状态
export default function(_that, audti) {
  // 当前 页面的编辑状态 editStatus  考虑  add  edit  view
  if (_that.editStatus === "add" || _that.editStatus === "edit") {
    _that.btnShow.save = true;
    _that.btnShow.cancel = true;
    _that.btnShow.add = false;
    _that.btnShow.edit = false;
    _that.btnShow.applyAudit = false;
    _that.btnShow.sendSap = false; //提交SAP
    _that.btnShow.changeContract = false; //合同变更按钮
    _that.btnShow.cancelAudit = false;
    _that.btnShow.delete = false;
    _that.btnShow.pdfView = false;
    ////  当前 单据可以 修改
    _that.orderReadOnly = false;
    return;
  }
  ///当前是视图状态，不可编辑
  if (_that.editStatus === "view") {
    _that.btnShow.pdfView = true;
    _that.orderReadOnly = true;
    _that.btnShow.sendSap = false; //提交SAP
    /// 可新增
    _that.btnShow.add = true;
    /// 不可保存、取消
    _that.btnShow.save = false;
    _that.btnShow.cancel = false;
    /// 需要根据，审批状态判断 是否可以编辑、删除、提交审批、撤销审批
    let auditStatu = _that.formData.auditStatus;
    // 未申请审批  ||  同意撤销
    if (auditStatu === "D" || auditStatu === "UN" || auditStatu === "N") {
      _that.btnShow.delete = true;
      _that.btnShow.edit = true;
      _that.btnShow.applyAudit = true;
      _that.btnShow.cancelAudit = false;
      _that.btnShow.changeContract = false;
      // 提交审批  || 审批同意
    } else if (auditStatu === "S") {
      _that.btnShow.delete = false;
      _that.btnShow.edit = false;
      _that.btnShow.cancelAudit = true;
      _that.btnShow.applyAudit = false;
      _that.btnShow.changeContract = false;
      //申请撤销
    } else if (auditStatu === "Y") {
      _that.btnShow.delete = false;
      _that.btnShow.edit = false;
      _that.btnShow.applyAudit = false;
      _that.btnShow.changeContract = true;
      _that.btnShow.cancelAudit = true;
      _that.btnShow.sendSap = true; //提交SAP
    } else if (auditStatu === "SU") {
      _that.btnShow.delete = false;
      _that.btnShow.edit = false;
      _that.btnShow.changeContract = false;
      _that.btnShow.applyAudit = false;
      _that.btnShow.cancelAudit = false;
    }
  }
}
