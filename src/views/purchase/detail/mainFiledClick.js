import { Dialog, Notify } from "vant";
import { dateFormat } from "@/utils/format";
import { RENDER_LIST } from "@vue/compiler-core";

export function mainFieldClick(_that, fieldName) {
  if (_that.orderReadOnly) {
    Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
    return;
  }
  _that.mainOptionSelect.activeFiled = fieldName;
  resetActionItems(_that, fieldName);
  _that.mainOptionSelect.show = true;
}

export function selectItemAction(_that, selectItem) {
  _that.formData[_that.mainOptionSelect.activeFiled] = selectItem.code;
  _that.mainOptionSelect.activeFiled = "";
  _that.mainOptionSelect.show = false;
}

/**
 *  主表的日期字段 选择日期
 * @param {*} _that 
 * @param {*} fieldName 
 * @returns 
 */
export function mainDateFieldClick(_that, fieldName) {
  if (_that.orderReadOnly) {
    Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
    return;
  }
  if (
    fieldName === "payDate" &&
    _that.formData.payTerm.replace(/\s*/g, "") !== "预付款"
  ) {
    Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
    return;
  }
  _that.mainOptionSelect.activeFiled = fieldName;
  _that.mainOptionSelect.dateShow = true;
}

export function selectDateAction(_that, val) {
  _that.formData[_that.mainOptionSelect.activeFiled] = dateFormat(val);
  _that.mainOptionSelect.activeFiled = "";
  _that.mainOptionSelect.dateShow = false;
}

export function resetActionItems(_that, fieldName) {
  _that.mainOptionSelect.list = [];
  if (fieldName === null || fieldName === "") {
    return;
  }
  if (fieldName === "orderType") {
    _that.mainOptionSelect.title = "请选择贸易方式";
    _that.mainOptionSelect.list = _that.tredeTypeList;
    return;
  }
  if (fieldName === "contractType") {
    _that.mainOptionSelect.title = "请选择合同类型";
    _that.mainOptionSelect.list.push(..._that.contractTypeList);
    return;
  }
  if (fieldName === "payMode") {
    _that.mainOptionSelect.title = "请选择付款方式";
    for (let index = 0; index < _that.fkfsList.length; index++) {
      let item = { name: "", code: "" };
      item.name = _that.fkfsList[index].refValue;
      item.code = _that.fkfsList[index].refValue;
      _that.mainOptionSelect.list[index] = item;
    }
    return;
  }
  if (fieldName === "dlvTerm") {
    _that.mainOptionSelect.title = "请选择交货方式";
    for (let index = 0; index < _that.jhfsList.length; index++) {
      let item = { name: "", code: "" };
      item.name = _that.jhfsList[index].refValue;
      item.code = _that.jhfsList[index].refValue;
      _that.mainOptionSelect.list[index] = item;
    }
    return;
  }
  if (fieldName === "payTerm") {
    _that.mainOptionSelect.title = "请选择收款方式";
    for (let index = 0; index < _that.fklx.length; index++) {
      let item = { name: "", code: "" };
      item.name = _that.fklx[index].refValue;
      item.code = _that.fklx[index].refValue;
      _that.mainOptionSelect.list[index] = item;
    }
    _that.formData.prepayPortion = null;
    _that.formData.prepaySum = null;
    _that.formData.payDate = "";
    return;
  }
  if (fieldName === "currencyCode") {
    _that.mainOptionSelect.title = "请选择币种";
    for (let index = 0; index < _that.currencyCodeList.length; index++) {
      let item = { name: "", code: "" };
      item.name =
        _that.currencyCodeList[index].currencyName +
        "-" +
        _that.currencyCodeList[index].currencyCode;
      item.code = _that.currencyCodeList[index].currencyCode;
      _that.mainOptionSelect.list[index] = item;
    }
    return;
  }
  if (fieldName === "onlineOk") {
    _that.mainOptionSelect.title = "请选择在线签署";
    _that.mainOptionSelect.list = [
      { code: "是", name: "是" },
      { code: "否", name: "否" }
    ];
    return;
  }
  if (fieldName === "printOk") {
    _that.mainOptionSelect.title = "请选择供应商签章";
    _that.mainOptionSelect.list = [
      { code: "是", name: "是" },
      { code: "否", name: "否" }
    ];
    return;
  }
}
