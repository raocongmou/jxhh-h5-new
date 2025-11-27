/////////////// 按钮事件的处理
/**
 *  点击了保存按钮
 * @param {*} _that 
 */
import { Dialog, Notify } from "vant";
import { deleteDocentry } from "@/api/erp.proposal.js";
import {setBtnStatus }from "./setBtnStatus"; 
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { genarateDocNo } from "@/api/erp.docno.js";

/**
 *  删除单据
 * @param {*} _that 
 */
export function deleteOrder(_that){
  Dialog.confirm({
    title: `确定删除当前询价单吗?`,
    message: `询价单【${_that.formData.poNo}】一旦删除，则无法恢复!`,
  })
    .then(() => {
      deleteDocentry({ docEntry: _that.formData.docEntry })
        .then((res) => {
          if (res.code === 1) {
            Notify({ type: "success", message: "删除成功!" });
            // 返回
            _that.$router.go(-1); //返回上一层
          } else {
            Notify({ type: "danger", message: "删除单据失败!" + res.msg });
          }
        })
        .catch((res) => {
          Notify({ type: "danger", message: "删除单据失败!" + res });
        });
    })

    .catch(() => {});
}

/**
 *  单据提交审批 
 * @param {*} _that 
 */
export function applyAuditOrder(_that){
  apply({ docEntry: _that.formData.docEntry })
  .then((res) => {
    if (res.code === 1) {
      Notify({ type: "success", message: "提交审批成功!" });
      _that.loadDetail();
      _that.activeTabIndex = 0;
    } else {
      Notify({ type: "danger", message: "提交审批失败!" + res.msg });
    }
  })
  .catch((res) => {
    Notify({ type: "danger", message: "提交审批失败!" + res });
  });
}

/**
 *  单据 提交之前 需要处理的事件  。包括数据的校验
 * @param {*} _that 
 */
export function cancelAuditOrder(_that){
  _that.cancelAuditShow = true;
}

export function doCancelAuditOrder(_that){
  undoApply({
    docEntry: _that.formData.docEntry,
    cancelReason: _that.cancelAuditReason,
  })
    .then((res) => {
      Notify({ type: "success", message: "申请撤销成功!" });
      _that.editStatus = "view";
      _that.loadDetail();
    })
    .catch((res) => {
      Notify({ type: "danger", message: "撤销审批失败:" + res });
    });
}
