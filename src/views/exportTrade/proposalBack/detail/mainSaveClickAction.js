/////////////// 按钮事件的处理
/**
 *  点击了保存按钮
 * @param {*} _that 
 */
import { Dialog, Notify } from "vant";
import { save, update } from "@/api/erp.proposal.js";
// 不可加花括号
import setBtnStatus from "./setBtnStatus";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { genarateDocNo } from "@/api/erp.docno.js";
import { dateFormat, rMoneyFormat } from "@/utils/format";
import { getCookie } from "@/utils/user.setting";

/**
 *  单据 提交之前 需要处理的事件  。包括数据的校验
 * @param {*} _that 
 */
export function beforeDoSave(_that) {
  let temp = _that.formData.employeeNo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "业务员尚未录入!" });
  //   return false;
  // }
  /// 往来单位
  // temp = _that.formData.vendorNo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "往来单位尚未录入!" });
  //   return false;
  // }

  // for (let index = 0; index < _that.formData.items.length; index++) {
  //   const itemPdt = _that.formData.items[index];
  //   if (!itemPdt.pdtNo1) {
  //     Notify({
  //       type: "warning",
  //       message: `第${index + 1}行明细尚未选择销售商品!`,
  //     });
  //     return false;
  //   }
  //   if (!itemPdt.quantity || Number(itemPdt.quantity) <= 0) {
  //     Notify({
  //       type: "warning",
  //       message: `第${index + 1}行明细尚未录入数量!`,
  //     });
  //     return false;
  //   }
  // }
  return true;
}

/**
 *  成功提交之后
 * @param {*} _that 
 * @param {*} res 
 */
export function afterDoSave(_that, res) {
  if (res) {
    _that.formData = res.data;
    _that.docentry = _that.formData.docEntry;
    _that.formData.items = res.data.items;
    _that.oldFormData = JSON.parse(JSON.stringify(_that.formData));
    _that.sendFomData = {};
    _that.editStatus = "view";
    setBtnStatus(_that);
    Notify({ type: "success", message: "询价单保存成功!" });
  }
}

/**
 * 用户在新增的状态下，点击了报错，会有一个编号的弹窗让用户确定编号。
 * 确定之后，就会直接调用insert逻辑。
 *  
 * @param {*} _that  编号确定
 */
export function confirmOrderNo(_that) {
  _that.sendFomData.poNo = _that.tempOrderNo;
  save(_that.sendFomData)
    .then(res => {
      afterDoSave(_that, res);
    })
    .catch(res => {
      console.log("保存单据出错", res);
      Notify({ type: "error", message: "保存单据出错:" + res.message });
    });
}

function formatNumber(items) {
  if (items && items.length) {
    items.forEach(item => {
      item["unitStdCost"] = rMoneyFormat(item["unitStdCost"]);
      item["offerDate"] = dateFormat(item["offerDate"], "yyyy-MM-dd HH:mm:ss");
    });
  }
}
export function mainBtnClickSave(_that) {
  if (!beforeDoSave(_that)) {
    return;
  }
  formatNumber(_that.formData.items);
  _that.sendFomData = _that.formData;
  let docEntry = _that.sendFomData.docEntry;
  // 回填采购员和采购时间
  _that.sendFomData.items.forEach(item => {
    item.offerDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
    item.employeeName = getCookie("loginInfo").realName;
    item.employeeNo = getCookie("loginInfo").userNo;
  });
  _that.sendFomData.poDate = _that.poDate;
  if (docEntry) {
    update(_that.sendFomData)
      .then(res => {
        afterDoSave(_that, res);
        _that.loadDetail();
      })
      .catch(res => {
        console.log("保存单据出错", res);
        Notify({
          type: "danger",
          message: "更新采购询价单错误：" + res
        });
        return;
      });
    return;
  }

  _that.genarareForm.orgCoNo = getDefaultOrgCoNo();
  _that.genarareForm.objectNo = _that.objectNo;
  genarateDocNo(_that.genarareForm)
    .then(res => {
      _that.tempOrderNo = res.data;
      _that.orderNoInputShow = true;
    })
    .catch(res => {
      Notify({
        type: "error",
        message: "创建询价单号错误：" + res.message
      });
      return;
    });
}
