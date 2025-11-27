/////////////// 按钮事件的处理
/**
 *  点击了保存按钮
 * @param {*} _that 
 */
import { Dialog, Notify } from "vant";
import { detail } from "@/api/erp.proposal.js";
import setBtnStatus from "./setBtnStatus";
import { listOaStatus } from "@/api/erp.oa.js";
import { moneyFormat, dateFormat } from "@/utils/format";

/***
 * @param items
 * 金额格式化函数
 */
function formatField(data) {
  data["poDate"] = dateFormat(data["poDate"], "yyyy-MM-dd");
  data["exchRate"] = Number(data["exchRate"]).toFixed(4);
  data["wareDate"] = dateFormat(data["wareDate"], "yyyy-MM-dd");
  if (data.items && data.items.length) {
    data.items.forEach(item => {
      item["unitStdCost"] = moneyFormat(item["unitStdCost"]);
      item["offerDate"] = dateFormat(item["offerDate"], "yyyy-MM-dd");
    });
  }
}
/**
 *  加载数据
 * @param {*} _that 
 */
export function loadDetail(_that) {
  let pkId = _that.docentry;
  if (!pkId) {
    Notify({ type: "danger", message: "没有主键，不可加载表单数据!" });
    return;
  }
  detail({ docEntry: pkId })
    .then(res => {
      formatField(res.data);
      _that.formData = res.data;
      _that.fileItems = _that.formData.fileItems;
      _that.oldFormData = JSON.parse(JSON.stringify(_that.formData));
      loadOaStatus(_that);
      setBtnStatus(_that);
    })
    .catch(res => {
      Notify({ type: "danger", message: res });
    });
}

/**
 *  加载 审批状态
 * @param {*} _that 
 */
export function loadOaStatus(_that) {
  let docentry = _that.formData.docEntry;
  let orderNo = _that.formData.poNo;
  let objectNo = _that.objectNo;
  listOaStatus(objectNo, docentry, orderNo)
    .then(res => {
      _that.oaStatusArr = res.data.reverse();
    })
    .catch(res => {});
}
