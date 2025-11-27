/**
 *  主表的按钮列表点击事件 
 * 
 */

import { Dialog, Notify } from "vant";
import {
  detail,
  save,
  update,
  apply,
  deleteDocentry,
  submitToSap,
  undoApply
} from "@/api/erp.purchase.js";
// 不可加花括号
import setBtnStatus from "./setBtnStatus";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { genarateDocNo } from "@/api/erp.docno.js";
import { getOrgInfo } from "@/utils/erp.org.js";
import { dateFormat, rMoneyFormat, moneyFormat, clone } from "@/utils/format";
import { getDocNum } from "@/api/common";
import { getCookie } from "@/utils/user.setting";

/**
 *  【新增】按钮
 * @param {*} _that 
 */
export function addOrder(_that) {
  _that.tabActive = 0;
  _that.formData = {};
  _that.formData.docVersion = 1;
  _that.formData.fileItems = [];
  _that.formData.items = [];
  _that.formData.filterFileItems = [];
  _that.formData.filterItems = [];
  _that.formData.objectItems = [];
  _that.formData.changeList = [];
  _that.formData.contactItems = [];
  for (const key in (_that.contactForm, _that.clientContactForm)) {
    _that.contactForm[key] = "";
    _that.clientContactForm[key] = "";
  }
  _that.formData.contactItems.push(_that.contactForm, _that.clientContactForm);
  //   _that.formData.fileItems = fieldFormData().formData.fileItems;
  _that.fileItems.splice(0, 0);
  _that.formData.signSite = "南昌";
  _that.formData.cmfSite = "中国";
  _that.formData.poStatus = "U"; //执行状态
  _that.formData.orgCoNo = getCookie("loginInfo").orgCoNo;
  let docDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
  _that.dateForm.poDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
  _that.dateForm.signDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
  _that.formData.poDate = dateFormat(new Date(), "yyyy-MM-dd");
  _that.formData.signDate = dateFormat(new Date(), "yyyy-MM-dd");
  _that.formData.prmyScny = "C";
  _that.formData.auditStatus = "D";
  _that.formData.effectFlag = 1;
  _that.formData.docVersion = 1;
  _that.formData.currentVersion = 0;
  _that.formData.versionDate = dateFormat(new Date(), "yyyy-MM-dd");
  _that.versionDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
  _that.formData.currencyCode = "CNY";
  _that.formData.exchRate = Number(1).toFixed(4);
  _that.formData.shipTo = "";
  _that.formData.ordTypNo = "1";
  _that.formData.orderType = "自营出口";
  _that.formData.partialShip = "N";
  _that.formData.earlyShip = "N";
  _that.formData.needInsepect = "Y";

  _that.formData.objectNo = "成品";
  _that.formData.poType = 1;
  _that.formData.refNoTitle1 = "";
  _that.formData.refNoTitle2 = "";
  _that.formData.titleName = "";
  _that.formData.contractType = "格式合同";

  _that.formData.empName = getCookie("loginInfo").realName;
  _that.formData.empNo = getCookie("loginInfo").userNo;
  _that.formData.employeeNo = getCookie("loginInfo").userNo;
  _that.formData.employeeName = getCookie("loginInfo").realName;
  _that.formData.orgNo = getCookie("loginInfo").orgNo;
  _that.formData.orgName = getCookie("loginInfo").orgName;
  _that.contactForm.controlA = "B"; //我方
  _that.clientContactForm.controlA = "V"; //客户

  // 控制预付比例录入
  _that.formData.payTerm = "";

  // 我方联系信息
  getOrgInfo({
    orgNo: "",
    userNo: "",
    orgCoNo: getDefaultOrgCoNo()
  }).then(res => {
    if (res) {
      _that.contactForm.coName = res.coName;
      _that.contactForm.coNameE = res.coNameE;
      _that.contactForm.state = res.state;
      _that.contactForm.stateE = res.stateE;
      _that.contactForm.city = res.city;
      _that.contactForm.cityE = res.cityE;
      _that.contactForm.deptName = res.deptName;
      _that.contactForm.deptNameE = res.deptNameE;
      _that.contactForm.contactPerson = res.contactPerson;
      _that.contactForm.zipCode = res.zipCode;
      _that.contactForm.phone = res.phone;
      _that.contactForm.fax = res.fax;
      _that.contactForm.email = res.email;
      _that.contactForm.addr = res.addr;
      _that.contactForm.addrE = res.addrE;
      _that.contactForm.title = res.title;
    }
  });
  // poNo赋值
  getDocNum({
    objectNo: "PM02",
    orgCoNo: getDefaultOrgCoNo()
  }).then(res2 => {
    if (res2.data) {
      _that.formData.poNo = res2.data;
    }
  });
  _that.editStatus = "add";
  setBtnStatus(_that);
}
// export function addOrder(_that) {
//     _that.tabActive = 0;
//     _that.formData = {};
//     _that.formData.docVersion = 1;
//     _that.formData.fileItems = [];
//     //   _that.formData.fileItems = fieldFormData().formData.fileItems;
//     _that.fileItems.splice(0, 0);
//     _that.formData.auditStatu = "S";
//     _that.formData.auditStatusName = "未申请审批";
//     _that.formData.signSite = "南昌";
//     _that.formData.signDate = dateFormat(new Date());
//     _that.formData.saptype = "未提交";
//     _that.formData.delivery = "";
//     _that.formData.specs = "";
//     _that.formData.others = "";
//     _that.formData.cfmComment = "";
//     _that.formData.contactItems = [];
//     getOrgInfo().then((res) => {
//         _that.formData.contactItems.push({
//             controlA: "B",
//             addr: res.addr,
//             addrE: res.addrE,
//             zipCode: res.zipCode,
//         });
//     });

//     _that.formData.contactItems.push({ controlA: "V" });
//     _that.formData.items = [];
//     _that.initAmountFeeList();
//     _that.formData.transAndFee =
//         "运输方式及费用由供方负责，供方负责将货物按时运抵需方指定收货地点，其后货物毁损灭失等风险由需方承担。";
//     _that.formData.packageDesc = "包装物不回收。";
//     _that.formData.cfmComment = "符合国家标准或企业标准";
//     _that.formData.currencyCode = "RMB";
//     _that.formData.tradType = "N";
//     _that.formData.orderMode = "格式合同";
//     _that.formData.orgCoNo = getDefaultOrgCoNo();
//     _that.formData.preProportion = 0.0;
//     _that.formData.preSum = 0.0;
//     _that.editStatus = "add";
//     setBtnStatus(_that);
// }

/**
 *  【删除】按钮
 * @param {*} _that 
 */
export function deleteOrder(_that) {
  Dialog.confirm({
    title: `确定删除当前采购合同吗?`,
    message: `采购合同【${_that.formData.poNo}】一旦删除，则无法恢复!`
  })
    .then(() => {
      deleteDocentry({ docEntry: _that.formData.docEntry })
        .then(res => {
          if (res.code === 1) {
            Notify({ type: "success", message: "删除成功!" });
            // 返回
            _that.$router.go(-1); //返回上一层
          } else {
            Notify({ type: "danger", message: "删除单据失败!" + res.msg });
          }
        })
        .catch(res => {
          Notify({ type: "danger", message: "删除单据失败!" + res });
        });
    })
    .catch(() => {});
}

/**
 *  【编辑】按钮
 * @param {*} _that 
 * @returns 
 */
export function editOrder(_that) {
  let status = _that.editStatus;
  if (status !== "view") {
    return;
  }
  status = _that.formData.auditStatus;
  if (status !== "D" && status !== "UN" && status !== "N") {
    return;
  }
  _that.editStatus = "edit";
  setBtnStatus(_that);
}

/**
 *  【取消】按钮
 * @param {*} _that 
 */
export function cancelOrder(_that) {
  Dialog.confirm({
    title: "取消对单据的操作",
    message: "当前操作将不会保存您对单据的修改!"
  })
    .then(() => {
      if (_that.oldFormData && _that.oldFormData.docEntry) {
        _that.formData = _that.oldFormData;
        _that.orderReadOnly = true;
        _that.editStatus = "view";
        setBtnStatus(_that);
      } else {
        _that.$router.go(-1); //返回上一层
      }
    })
    .catch(() => {});
}
function formatNumber(items, formData) {
  if (items && items.length) {
    items.forEach(item => {
      item["unitStdCost"] = rMoneyFormat(item["unitStdCost"]);
      item["subSumValue"] = rMoneyFormat(item["subSumValue"]);
      item["sapPrice"] = rMoneyFormat(item["sapPrice"]);
    });
  }
  if (Object.keys(formData).length) {
    formData["totalPoValue"] = rMoneyFormat(formData["totalPoValue"]);
    formData["totalPoValueS"] = rMoneyFormat(formData["totalPoValueS"]);
    formData["prepaySum"] = rMoneyFormat(formData["prepaySum"]);
  }
}
/**
 * 【保存】按钮 
 * @param {*} _that 
 */
export function saveOrder(_that) {
  if (!beforeDoSave(_that)) {
    return;
  }
  formatNumber(_that.formData.items, _that.formData);
  // 处理计算问题
  _that.handlerComputed();
  _that.sendFomData = _that.formData;
  let docEntry = _that.sendFomData.docEntry;
  _that.formData.versionDate = _that.versionDate;
  _that.formData.poDate = _that.dateForm.poDate;
  _that.formData.signDate = _that.dateForm.signDate;
  // 联系信息
  _that.formData.contactItems = [];
  _that.formData.contactItems.push(_that.contactForm, _that.clientContactForm);
  // versionDate 变更日期
  _that.formData.changeList.forEach((item, index) => {
    item.versionDate = _that.versionDates[index];
  });
  if (docEntry) {
    update(_that.sendFomData)
      .then(res => {
        afterDoSave(_that, res);
        loadDetail(_that);
        Notify({ type: "success", message: "采购合同修改成功!" });
      })
      .catch(res => {
        Notify({
          type: "danger",
          message: "更新采购合同错误：" + res
        });
        return;
      });
    return;
  }
  let genarareForm = { orgCoNo: "", objectNo: "" };
  genarareForm.orgCoNo = getDefaultOrgCoNo();
  genarareForm.objectNo = _that.objectNo;
  genarateDocNo(genarareForm)
    .then(res => {
      _that.createOrder.tempOrder = res.data;
      _that.createOrder.show = true;
    })
    .catch(res => {
      Notify({
        type: "error",
        message: "创建采购合同号错误：" + res.message
      });
      return;
    });
}
/**
 *  单据 提交之前 需要处理的事件  。包括数据的校验
 * @param {*} _that 
 */
export function beforeDoSave(_that) {
  // let temp = _that.formData.employeeNo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "业务员尚未录入!" });
  //   return false;
  // }
  // /// 往来单位
  // temp = _that.formData.vendorNo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "供应商尚未录入!" });
  //   return false;
  // }
  // // 线上签署
  // temp = _that.formData.onlineOk;
  // if (!temp) {
  //   Notify({ type: "warning", message: "线上签署字段，尚未录入!" });
  //   return false;
  // }
  // ///签章
  // temp = _that.formData.printOk;
  // if (!temp) {
  //   Notify({ type: "warning", message: "供应商签章字段，尚未录入!" });
  //   return false;
  // }
  // // 合同有效日期
  // temp = _that.formData.validTo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "合同有效日期字段，尚未录入!" });
  //   return false;
  // }
  // temp = _that.formData.shipTo;
  // if (!temp) {
  //   Notify({ type: "warning", message: "交货地点字段，尚未录入!" });
  //   return false;
  // }
  // temp = _that.formData.msd;
  // if (!temp) {
  //   Notify({ type: "warning", message: "交货日期字段，尚未录入!" });
  //   return false;
  // }
  // temp = _that.formData.payMode;
  // if (!temp) {
  //   Notify({ type: "warning", message: "付款方式字段，尚未录入!" });
  //   return false;
  // }
  // if (_that.formData.items.length === 0) {
  //   Notify({ type: "warning", message: "商品信息不能为空!" });
  //   return;
  // }
  return true;
}

/**
 * 用户在新增的状态下，点击了报错，会有一个编号的弹窗让用户确定编号。
 * 确定之后，就会直接调用insert逻辑。
 *  
 * @param {*} _that  编号确定
 */
export function confirmOrderNo(_that) {
  let newOrderNo = _that.createOrder.tempOrder;

  // if (newOrderNo === '' || newOrderNo === null) {
  //     Notify({ type: "error", message: "单据号不可修改为空!" });
  //     return;
  // }

  _that.createOrder.show = false;
  _that.sendFomData.poNo = newOrderNo;
  save(_that.sendFomData)
    .then(res => {
      afterDoSave(_that, res);
      Notify({ type: "success", message: "采购合同新增成功!" });
      _that.docentry = res.data.docEntry;
      loadDetail(_that);
    })
    .catch(res => {
      Notify({ type: "danger", message: "保存单据出错:" + res });
    });
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
  }
}
function formatField(items, data) {
  if (items && items.length) {
    items.forEach(item => {
      item["unitStdCost"] = moneyFormat(item["unitStdCost"]);
      item["subSumValue"] = moneyFormat(item["subSumValue"]);
      item["sapPrice"] = moneyFormat(item["sapPrice"]);
      item["quantity"] = Number(item["quantity"]).toFixed(2);
      item["sapQtty"] = Number(item["sapQtty"]).toFixed(2);
    });
  }
  if (Object.keys(data).length) {
    data["totalPoValue"] = moneyFormat(data["totalPoValue"]);
    data["totalPoValueS"] = moneyFormat(data["totalPoValueS"]);
    data["prepaySum"] = moneyFormat(data["prepaySum"]);
    data["prepayPortion"] = Number(data["prepayPortion"]).toFixed(2);
  }
}
function autoComputed(items, data) {
  items.forEach(({ subSumValue, sapPrice, sapQtty }, index) => {
    items[index][sapPrice] =
      Number(rMoneyFormat(items[index][subSumValue])) /
      Number(rMoneyFormat(items[index][sapQtty]));
  });
  data["totalPoValue"] = items.reduce((pre, { subSumValue }) => {
    return Number(rMoneyFormat(pre)) + Number(rMoneyFormat(subSumValue));
  }, 0);
  // 预付金额 = 合同金额 * 预付比例
  // totalPoValue(合同金额) prepayPortion(预付比例) prepaySum(预付金额)
  // data["prepaySum"] = data["totalPoValue"] * data["prepayPortion"] * 0.01;
  data["totalPoValueS"] =
    Number(rMoneyFormat(data["totalPoValue"])) *
    Number(data["exchRate"]).toFixed(4);
}
export function loadDetail(_that) {
  detail({ docEntry: _that.docentry }).then(res => {
    autoComputed(res.data.items, res.data);
    formatField(res.data.items, res.data);
    res.data.changeList.forEach(item => {
      _that.versionDates.push(item.versionDate);
      item.versionDate = dateFormat(item.versionDate, "yyyy-MM-dd");
    });
    // _that.versionDate = res.data.versionDate;
    // res.data.versionDate = dateFormat(res.data.versionDate, "yyyy-MM-dd");
    _that.dateForm.poDate = res.data.poDate;
    _that.dateForm.signDate = res.data.signDate;
    res.data.poDate = dateFormat(res.data.poDate, "yyyy-MM-dd");
    res.data.signDate = dateFormat(res.data.signDate, "yyyy-MM-dd");
    res.data.exchRate = Number(res.data.exchRate).toFixed(4);
    res.data.items.forEach(item => {
      item.atr = Number(item.atr).toFixed(2);
    });
    res.data.contactItems.forEach(item => {
      // 我方
      if (item.controlA && item.controlA.trim() === "B") {
        for (const key in _that.contactForm) {
          _that.contactForm[key] = item[key];
        }
      } else if (item.controlA && item.controlA.trim() === "V") {
        for (const key in _that.clientContactForm) {
          _that.clientContactForm[key] = item[key];
        }
      }
    });
    _that.formData = res.data;
    _that.fileItems = _that.formData.fileItems;
    _that.oldFormData = JSON.parse(JSON.stringify(_that.formData));
    _that.loadOaStatus();
    setBtnStatus(_that);
  });
}

/**
 *  单据提交审批 
 * @param {*} _that 
 */
export function auditOrder(_that) {
  apply({ docEntry: _that.formData.docEntry })
    .then(res => {
      if (res.code === 1) {
        Notify({ type: "success", message: "提交审批成功!" });
        loadDetail(_that);
        _that.activeTabIndex = 0;
      } else {
        Notify({ type: "danger", message: "提交审批失败!" + res.msg });
      }
    })
    .catch(res => {
      Notify({ type: "danger", message: "提交审批失败!" + res });
    });
}

/**
 *  单据 提交之前 需要处理的事件  。包括数据的校验
 * @param {*} _that 
 */
export function cancelAuditOrder(_that) {
  _that.cancelAuditShow = true;
}
/**
 *  处理实际的撤销逻辑
 * @param {*} _that 
 */
export function doCancelAuditOrder(_that) {
  undoApply({
    docEntry: _that.formData.docEntry,
    cancelReason: _that.cancelAuditReason
  })
    .then(res => {
      Notify({ type: "success", message: "申请撤销成功!" });
      loadDetail(_that);
    })
    .catch(res => {
      Notify({ type: "danger", message: "撤销审批失败:" + res });
    });
}

/**
 *  提交SAP 的逻辑
 * @param {*} _that 
 */
export function sapOrder(_that) {
  // undoApply({
  //   docEntry: _that.formData.docEntry,
  //   cancelReason: _that.cancelAuditReason
  // })
  //   .then(res => {
  //     Notify({ type: "success", message: "申请撤销成功!" });
  //     loadDetail(_that);
  //   })
  //   .catch(res => {
  //     Notify({ type: "danger", message: "撤销审批失败:" + res });
  //   });
  submitToSap({ docEntry: _that.formData.docEntry })
    .then(res => {
      Notify({ type: "success", message: "提交SAP成功!" });
      // loadDetail(_that);
    })
    .catch(res => {
      Notify({ type: "danger", message: res });
    });
}
