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
import { isCanAddItems } from "../methods/common-methods";
import { dateFormat, rMoneyFormat } from "@/utils/format";

/**
 *  单据 提交之前 需要处理的事件  。包括数据的校验
 * @param {*} _that 
 */
export function beforeDoSave(_that) {
  let temp = _that.formData.employeeNo;
  if (!temp) {
    Notify({ type: "warning", message: "业务员尚未录入!" });
    return false;
  }
  /// 往来单位
  // temp = _that.formData.vendorNo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "客户尚未录入!" });
  //   return false;
  // }
  if (_that.formData.items.length === 0) {
    Notify({
      type: "warning",
      message: "商品信息不能为空！"
    });
    return;
  }
  const items = _that.formData.items;
  const isResult = isCanAddItems(_that.validateField, items);
  if (isResult) return;
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
      Notify({ type: "danger", message: "保存单据出错:" + res });
    });
}
function formatNumber(data, _that) {
  data["poDate"] = dateFormat(data["poDate"], "yyyy-MM-dd HH:mm:ss");
  data["poDate"] = _that.poDate;
  data;
  if (data.items && data.items.length) {
    data.items.forEach(item => {
      item["unitStdCost"] = rMoneyFormat(item["unitStdCost"]);
      item["offerDate"] = dateFormat(item["offerDate"], "yyyy-MM-dd HH:mm:ss");
    });
  }
}
/***
 * @param ---_that---组件的
 */
export function mainBtnClickSave(_that) {
  if (!beforeDoSave(_that)) {
    return;
  }
  formatNumber(_that.formData, _that);
  _that.sendFomData = _that.formData;
  let docEntry = _that.sendFomData.docEntry;
  if (docEntry) {
    update(_that.sendFomData)
      .then(res => {
        afterDoSave(_that, res);
        _that.loadDetail();
      })
      .catch(res => {
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
        message: "创建询价单号错误：" + res
      });
      return;
    });
}
