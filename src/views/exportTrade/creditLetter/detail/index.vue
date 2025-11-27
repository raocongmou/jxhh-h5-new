<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              v-model="computedOrgCo"
              input-align="left"
              label="平台公司"
              readonly
            />
            <van-field
              input-align="left"
              v-model="formData.creditNo"
              readonly
              label="信用证号"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.refNo"
              label="公司编号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.getDate"
              label="收件日期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.issueDate"
              label="开证日期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.issuingbank"
              label="开证银行"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.negobank"
              label="通知行"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.empName"
              label="管理员"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.contractNo"
              label="出口合同"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.orderNo"
              label="出口定单"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoiceNo"
              label="出口发票"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.custNo"
              label="客户号"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.coNamee"
              label="客户名称"
            />
            <!-- <van-field
              input-align="left"
              readonly
              v-model="formData.coNamee"
              name="客户简称"
              label="客户简称"
            /> -->
            <van-field
              input-align="left"
              readonly
              v-model="formData.portdes"
              label="目的港"
            />
            
            <van-field
              readonly
              input-align="left"
              label="截止装运期"
              v-model="formData.lastshipDate"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.pdtName"
              label="货物名称"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.noticeNo"
              label="信用证通知编号"
            />
            <van-field
              readonly
              input-align="left"
              label="信用证有效期"
              v-model="formData.expDate"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.recieveDate"
              label="到证日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.expadd"
              label="信用证有效地址"
            />
            
            
            <van-field
              input-align="left"
              v-model="formData.orgName"
              label="信用证所有者部门"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.employeeName"
              label="信用证所有者"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sendDate"
              label="送出日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="getStatusFlag"
              label="领用标识"
            />
            <van-field
              readonly
              input-align="left"
              v-model="getCurrencyCode"
              label="币种"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.lcamount"
              label="开证金额"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.exchrate"
              label="USD汇率"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.lcamountUsd"
              label="开证金额(USD)"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.auditDate"
              label="审证日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.auditvalue"
              label="审证记录"
            />
            <RcmSelect
              :select-label="'text'"
              :select-value="'id'"
              :valueKey="'text'"
              :options="auditStatusList"
              :label="'审证状态'"
              :placeholder="'审证状态'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.auditstaus"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.auditorName"
              label="审证人"
            />
            <RcmSelect
              :select-label="'text'"
              :select-value="'id'"
              :valueKey="'text'"
              :options="packFlagList"
              :label="'打包标识'"
              :placeholder="'打包标识'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.packFlag"
              @change="({label, value}) => changeRcmSelect({label, value}, 'packFlag')"
            />
            <van-field
              readonly
              input-align="left"
              v-model="getPacksum"
              label="打包金额"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.packbank"
              label="打包银行"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.remark"
              label="备注"
            />
          </van-form>
        </Scroll>
      </van-tab>
    </van-tabs>

    <van-dialog
      v-model:show="isNoInputShow"
      title="生成的销售合同号(可修改)"
      @confirm="confirmIsNo()"
    >
      <van-field label="销售合同号:" v-model="tempIsNo"></van-field>
    </van-dialog>

    <van-dialog
      v-model:show="undoApplyShow"
      title="撤销原因"
      @confirm="doCancelApply()"
      show-cancel-button
    >
      <van-field
        type="textarea"
        v-model="cancelReason"
        class="border-bottom: 1px solid rgb(134, 154, 232);"
      ></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { getLcdocInfo } from "@/api/exportTrade/creditLetter";
import { 
  getTable3XByDoc, 
  getDocStatusList, 
  getCurrencyCodeList, 
  getTable3XByRef, 
  getAuditStatusList,
  getBankList 
} from "@/api/common";

import { listOaStatus as getOaStatus } from "@/api/erp.oa.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload, down } from "@/api/erp.file.js";

import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";

import fieldFormData from "./cloumn";

export default {
  name: "PurchaseInvoiceDetail",
  components: {
    NavBar,
    Scroll,
  },
  data() {
    return {
      packFlagList: [
        { id: 'Y', text: '是' },
        { id: 'N', text: '否' },
      ],
      bankList: [], // 银行代码表
      cmmsnsign1List: [
        { refValue: "明佣", refValueCode: "Y" },
        { refValue: "暗佣", refValueCode: "N" },
      ], // 佣金类型
      negotiationflagList: [
        { refValue: "是", refValueCode: "Y" },
        { refValue: "否", refValueCode: "N" },
      ],
      invoiceTypeList: [
        { refValue: "议付", refValueCode: 1 },
        { refValue: "报关", refValueCode: 2 },
        { refValue: "议付+报关", refValueCode: 3 },
      ],
      // 领用标识
      statusFlagList: [
        {id: "Y", text: "已经送出"},
        {id: "N", text: "未送出"},
        {id: "L", text: "注销"},
      ],
      heightIndex: "20px",
      // 审证状态
      auditStatusList: [
        {id: "Y", text: "已经审证"},
        {id: "N", text: "审证有问题"},
        {id: "U", text: "未审证"},
      ],
      objectNo: "PM03",
      tileName: "销售合同详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      baseDetail: fieldFormData().baseDetail,
      sapItemsDetail: fieldFormData().sapItemsDetail,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      oaStatusArr: [],
      genarareForm: {
        objectNo: "PM03",
        orgCoNo: "",
      },
      // 分类
      acctCodeList: [
        { name: "费用", code: "1"},
        { name: "货款", code: "0"},
      ],
      // 紧急程度
      importantList: [
        { id: 0, text: "正常" },
        { id: 1, text: "重要" },
        { id: 2, text: "紧急" }
      ],
      // 单据类型
      docTypeList: [
        { id: "PM02", text: "内采合同" },
        { id: "PM03", text: "销售合同" },
        { id: "SD01", text: "出口发票" },
        { id: "SM07", text: "出口定单" },
        { id: "OTHER", text: "其他" },
        { id: "SM07A", text: "转口销售" }
      ],
      employeeNoVendor: "",
      ///   默认的状态
      editStatus: "view",
      /// 当前单据 是否只读
      orderReadOnly: true,
      /// 当前是哪一个 tab 活跃
      tabActive: 0,
      pullup: false,
      ////  枚举类型的 上滑选项是否 显示
      actionShow: false,
      ////  枚举类型的 上滑选项 集合
      actionItems: [],
      ///   枚举类型的活跃字段
      activeFormFiled: "",
      ///   枚举类型标题说明
      actionDesc: "",
      /// 明细折叠，当前打开的  明细行字段
      pdtItemsActiveIndex: 0,
      /// 联系信息折叠
      contactInfoActiveIndex: 1,
      elementChangeFlag: 0,

      contractTermIndex: 10,
      contractTermIndex1: 11,
      activeNames: 1,
      goodsItemActIndex: 0,
      ////   成本分析，折叠框，默认
      feeAmountActiveIndex: 0,
      orgNo: "",
      activePdtItemIndex: null,
      ////  主表的按钮是否可见
      btnDeleteShow: false,
      btnAddShow: false,
      btnSaveShow: false,
      btnEditShow: false,
      btnAuditShow: false,
      btnCancelAuditShow: false,
      btnSapShow: false,
      btnCancelShow: false,
      btnPdfView: false,
      ///   侧滑窗口是否显示
      showVendorSelect: false,
      showEmploeeySelect: false,
      showItemPdtSelect: false,
      ////  时间选择
      selectTimeShow: false,
      ////  站位
      divEmpty: true,
      ///销售合同确认框
      isNoInputShow: false,
      /// 取消审批原因框
      undoApplyShow: false,
      tempIsNo: "",
      cancelReason: "",
      orgList: [],
      tredeTypeList: [],
      saleTypeList: [],
      recTypeList: [],
      orderModeList: [{ name: "格式合同" }, { name: "非格式合同" }],
      recMethodList: [],
      currencyCodeList: [],
      fileItems: [],
      payItemList: [], // 付款项目
      payModeList: [], // 预付款方式
      payTypeList: [], // 付款类型
      flag2List: [], // 贸易方式
      flag1List: [
        { refValue: "未核销", refValueCode: "0" },
        { refValue: "部分核销", refValueCode: "1" },
        { refValue: "全部核销", refValueCode: "2" },
      ],
      conformList: [
        { refValue: "√", refValueCode: "Y" },
        { refValue: "", refValueCode: "N" },
      ],
      acctFlagList: [
        { refValue: "√", refValueCode: 1 },
        { refValue: "", refValueCode: 0 },
      ],
      transtoolList: [], // 运输方式
    };
  },
  created() {
    this.docentry = this.$route.query.creditNo;
    getBankList({}).then(res => {
      this.bankList.push(...res.data);
    })
    // 贸易方式
    getTable3XByRef({
      objRef: "InlandPurchase"
    }).then(res => {
      this.flag2List.push(...res.data);
    });
    getTable3XByDoc({
      objRef: "recMode",
      objectNo: "PM09"
    }).then(res => {
      this.payTypeList.push(...res.data);
    })
    getTable3XByDoc({
      objRef: "costfee",
      objectNo: "PM09",
      sortId: "4"
    }).then(res => {
      this.payItemList.push(...res.data);
    })
    // 运输方式(报关用)
    getTable3XByRef({
      objRef: "transtool"
    }).then(res => {
      this.transtoolList.push(...res.data);
    })
    getTable3XByDoc({
      objRef: "payTerm",
      objectNo: "PM09"
    }).then(res => {
      this.payModeList.push(...res.data);
    })
    // getAuditStatusList({}).then(res => {
    //   this.auditStatusList.push(...res.data);
    // })
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });

    getTredeType().then((res) => {
      this.tredeTypeList.push(...res);
    });

    getSaleType().then((res) => {
      this.saleTypeList.push(...res);
    });
    getRecType().then((res) => {
      this.recTypeList.push(...res);
    });
    getRecMethod().then((res) => {
      this.recMethodList.push(...res);
    });
    getCurrencyCodeList().then((res) => {
      this.currencyCodeList.push(...res.data);
    });
    if (this.docentry) {
      this.loadDetail();
    }
  },
  methods: {
    // 下拉框选择改变
    changeRcmSelect({ value }, field) {
      this.formData[field] = value;
    },
    /// 设置 按钮的状态
    setBtnStatus() {
      // 当前 页面的编辑状态 editStatus  考虑  add  edit  view
      if (this.editStatus === "add") {
        this.btnSaveShow = true;
        this.btnCancelShow = true;

        this.btnAddShow = false;
        this.btnEditShow = false;
        this.btnAuditShow = false;
        this.btnSapShow = false;
        this.btnCancelAuditShow = false;
        this.btnDeleteShow = false;

        this.orderReadOnly = false;
      } else if (this.editStatus === "view") {
        this.btnPdfView = true;
        this.orderReadOnly = true;
        this.btnAddShow = true;
        this.btnSaveShow = false;
        this.btnCancelShow = false;
        /////
        this.btnSapShow = false;
        let auditStatu = this.formData.auditStatu;
        if (auditStatu === "D") {
          this.btnDeleteShow = true;
          this.btnEditShow = true;
          this.btnAuditShow = true;
          this.btnCancelAuditShow = false;
        } else if (auditStatu === "S") {
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = true;
        } else if (auditStatu === "Y") {
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = true;
          this.btnSapShow = true;
        } else if (auditStatu === "SU") {
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = false;
          this.btnSapShow = false;
        } else if (auditStatu === "UN") {
          this.btnDeleteShow = true;
          this.btnEditShow = true;
          this.btnAuditShow = true;
          this.btnCancelAuditShow = false;
          this.btnSapShow = false;
        }
      } else if (this.editStatus === "edit") {
        /// 修改状态下，只有删除和保存
        this.btnSaveShow = true;
        this.btnCancelShow = true;
        this.orderReadOnly = false;
        this.btnAddShow = false;
        this.btnDeleteShow = false;
        this.btnAuditShow = false;
        this.btnCancelAuditShow = false;
        this.btnSapShow = false;
      }
    },
    formatterAudit(value) {
      this.auditStatusList.forEach(item => {
        if(item.statusCode === value) {
          value = item.statusName;
        }
      })
      return value;
    },
    collapseChange(index) {
      if (index || index === 0) {
        this.heightIndex = "20px";
        this.heightIndex = Number(this.heightIndex.replace(/px/g, ""))*index + 'px'
        // this.goodsItemActIndex = index;
      }
    },
    onClickTab(title) {
      console.log(title);
      if (title === 0) {
        this.$nextTick((_) => {
          this.$refs.main.refresh();
        });
      }
      else if (title === 3) {
        this.$nextTick((_) => {
          this.$refs.file.refresh();
        });
      }
    },
    // 过滤器  数量
    formatterAmount(item) {
      if (!item || item === undefined) {
        return "0.00";
      }
      if (item.includes(",")) {
        return item;
      }
      return moneyFormat(item);
    },
    ///当前页面切换了平台公司
    setChangeNewOrgCo() {
      this.$router.go(-1); //返回上一层
    },
    initAllStatus(items, data) {
      // invoice1Items
      this.auditStatusList.forEach(item => {
        if(data.auditStatu === item.statusCode) {
          data.auditStatu = item.statusName;
        }
      })
      this.bankList.forEach(item => {
        if(data.negobank === item.bankCode) {
          data.negobank = item.bankNameC;
        }
      })
      this.currencyCodeList.forEach(item => {
        if(data.currencyCode === item.currencyCode) {
          data.currencyCode = item.currencyName;
        }
      })
      // this.transtoolList.forEach(item => {
      //   if(data.transtool === item.refValueE) {
      //     data.transtool = item.refValue;
      //   }
      // })
      this.negotiationflagList.forEach(item => {
        if(data.negotiationFlag === item.refValueCode) {
          data.negotiationFlag = item.refValue;
        }
        if(data.transhipment === item.refValueCode) {
          data.transhipment = item.refValue;
        }
        if(data.partialshipment === item.refValueCode) {
          data.partialshipment = item.refValue;
        }
      })
      this.cmmsnsign1List.forEach(item => {
        if(data.cmmsnsign1 === item.refValueCode) {
          data.cmmsnsign1 = item.refValue;
        }
      })
      items.forEach(itex => {
        this.acctCodeList.forEach(item => {
          if(itex.acctCode === item.code) {
            itex.acctCode = item.name;
          }
        });
        // (商品)核销
        this.flag1List.forEach(item => {
          if(itex.flag1 == item.refValueCode) {
            itex.flag1 = item.refValue;
          }
        });
        this.docTypeList.forEach(item => {
          if(itex.objectNo === item.id) {
            itex.objectNo = item.text;
          }
        });
        this.payModeList.forEach(item => {
          if(itex.payMode === item.refValueCode) {
            itex.payMode = item.refValue;
          }
        });
      });
      this.invoiceTypeList.forEach(item => {
        if(data.invoiceType === item.refValueCode) {
          data.invoiceType = item.refValue;
        }
      });
      this.flag2List.forEach(item => {
        if(data.flag2 == item.refValueCode) {
          data.flag2 = item.refValue;
        }
      });
      this.flag1List.forEach(item => {
        if(data.flag1 == item.refValueCode) {
          data.flag1 = item.refValue;
        }
      });
      this.conformList.forEach(item => {
        if(data.conform == item.refValueCode) {
          data.conform = item.refValue;
        }
      });
      this.acctFlagList.forEach(item => {
        if(data.acctFlag == item.refValueCode) {
          data.acctFlag = item.refValue;
        }
      });
    },
    // 移除字段空字符串
    removeBlankStr(data) {
      for(let key in data) {
        if(typeof data[key] === 'string') {
          data[key] = data[key].replace(/\s+/g, "")
        }
      }
      return data;
    },
    ///重新加载所有的数据
    loadDetail() {
      getLcdocInfo(this.docentry)
      .then((res) => {
        if(res.data.items) {
          this.initAllStatus(res.data.items, res.data)
        }
        this.formData = this.removeBlankStr(res.data);
        this.fileItems = this.formData.fileItems;
      })
      .catch((res) => {
        Notify({ type: "danger", message: res });
      });
    },
    // /////用户确认了销售合同号  insert 逻辑的延续
    // confirmIsNo() {
    //   this.sendFomData.isNo = this.tempIsNo;
    //   save(this.sendFomData)
    //     .then((res) => {
    //       this.doAfterSave(res);
    //     })
    //     .catch((res) => {
    //       Notify({ type: "error", message: "保存单据出错:" + res.message });
    //     });
    // },
    /// 合同预览
    mainBtnClickPDFView() {
      let keyValue = this.formData.docEntry;
      let keyName = "docEntry";
      let moduleName = "d_pm03_jxhh";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
        },
      });
    },
    downFileItem(index) {
      //if (this.formData.fileItems[index].objId) {
        let pkid = this.formData.fileItems[index].pkId;
        this.$router.push({
          path: "/pdf",
          query: { pkId: pkid },
        });
      // } else {
      //   Notify({ type: "warn", message: "当前附件尚未保存,无法预览!" });
      // }
    },
    deleteFileItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除!" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除当前附件吗?",
      })
        .then(() => {
          this.doDeleteFileItem(index);
        })
        .catch((res) => {});
    },
    doDeleteFileItem(index) {
      if (this.formData.fileItems[index].objId) {
        // 是原有的
        var len = this.formData.filterFileItems.length;
        this.formData.filterFileItems[len] = this.formData.fileItems[index];
      }
      this.formData.fileItems.splice(index, 1);
    },
    // 删除明细
    deletePdtItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除!" });
        return;
      }

      Dialog.confirm({
        title: "提示",
        message: "确认删除当前商品吗?",
      })
        .then(() => {
          this.doDeletePdtItem(index);
        })
        .catch((res) => {});
    },

    doDeletePdtItem(index) {
      if (this.formData.items[index].isMid) {
        // 是原有的
        var len = this.formData.filterItems.length;
        this.formData.filterItems[len] = this.formData.items[index];
      }
      this.formData.items.splice(index, 1);
      this.computeAllQuantiy();
      this.computeAllAmount();
    },

    changePdtItemNum(index, changeField) {
      let quantity = this.formData.items[index].quantity;
      let unitPrice = this.formData.items[index].unitPrice;
      let amount = this.formData.items[index].amount;
      let sapUnitRate = this.formData.items[index].sapUnitRate;
      let sapQtty = this.formData.items[index].sapQtty;
      let sapPrice = this.formData.items[index].sapPrice;
      ///   改变的数量，重新计算 单价 或者 金额
      if (changeField === "quantity") {
        if (unitPrice && unitPrice > 0) {
          this.formData.items[index].amount = quantity * unitPrice;
          this.computeAllAmount();
        } else if (amount) {
          this.formData.items[index].unitPrice = amount / quantity;
          this.formData.items[index].sapPrice =
            (amount / quantity) * sapUnitRate;
        }
        if (sapUnitRate && sapUnitRate > 0) {
          ///重新计算 sap的销售数量
          this.formData.items[index].sapQtty = quantity / Number(sapUnitRate);
        }
        this.computeAllQuantiy();
      }
      //// 单价的修改
      else if (changeField === "unitPrice") {
        ///// 该表的是 单价，
        if (quantity && quantity > 0) {
          this.formData.items[index].amount = quantity * unitPrice;
          this.computeAllAmount();
        } else if (amount) {
          this.formData.items[index].quantity = amount / unitPrice;
        }
        if (sapUnitRate && sapUnitRate > 0) {
          ///重新计算 sap的销售数量
          this.formData.items[index].sapPrice = unitPrice * Number(sapUnitRate);
        }
      }
      //// sap单价的修改  ,
      else if (changeField === "sapPrice") {
        this.formData.items[index].unitPrice = sapPrice / Number(sapUnitRate);
        if (amount && amount > 0) {
          this.formData.items[index].sapQtty = amount / sapPrice;
          this.formData.items[index].quantity =
            amount / (sapPrice / Number(sapUnitRate));
          this.computeAllQuantiy();
        } else {
          // 不存在金额，则计算金额 sap 销售单价 sap 单位
          if (sapQtty && sapQtty > 0) {
            this.formData.items[index].amount = sapPrice * sapQtty;
            this.computeAllAmount();
          }
        }
      }
      //// sapQtty sap 数量的修改
      else if (changeField === "sapQtty") {
        this.formData.items[index].quantity = sapQtty * Number(sapUnitRate);
        if (sapPrice && sapPrice > 0) {
          this.formData.items[index].amount = sapQtty * sapPrice;
          this.computeAllAmount();
        }
        this.computeAllQuantiy();
      }
      //// 金额的修改
      else if (changeField === "amount") {
        if (quantity && quantity > 0) {
          /// 数量存在，  计算 单价 以及sap 单价
          this.formData.items[index].unitPrice = amount / quantity;
          this.formData.items[index].sapPrice =
            (amount / quantity) * sapUnitRate;
        }

        this.computeAllAmount();
      }
    },

    ///   预收款比列 计算
    changePreProPortion() {
      let totalIsValue = Number(this.formData.totalIsValue);
      let rate = Number(this.formData.preProportion);
      if (totalIsValue && rate) {
        ///   修改预收款比例
        this.formData.preSum = (totalIsValue * rate) / 100;
      }
    },
    /// 重新计算主表的总数量
    computeAllQuantiy() {
      let quantity = 0;
      for (let index = 0; index < this.formData.items.length; index++) {
        const element = this.formData.items[index];

        if (element && element.quantity) {
          quantity = quantity + Number(element.quantity);
        }
      }
      this.formData.quantity = quantity;
    },
    ///  重新计算主表的总金额
    computeAllAmount() {
      let amount = 0;
      for (let index = 0; index < this.formData.items.length; index++) {
        const element = this.formData.items[index];
        if (element && element.amount) {
          amount = amount + Number(element.amount);
        }
      }
      this.formData.totalIsValue = amount;
      this.changePreProPortion();
    },

    uploadFile(file) {
      //文件读取完毕。执行 上传文件的操作
      const form = new FormData();
      // 文件对象
      //form.append("file", file.content);
      form.append("file", file.file);
      upload(form)
        .then((res) => {
          let resFileList = res.data;
          if (resFileList && resFileList.length > 0) {
            let newFileItem = {
              fileDesc: resFileList[0].fileName,
              fileName: resFileList[0].fileName,
              pkId: resFileList[0].fileId,
            };
            if (
              !this.formData.fileItems ||
              this.formData.fileItems.length === 0
            ) {
              this.formData.fileItems = [];
            }
            let len = this.formData.fileItems.length;
            this.formData.fileItems[len] = newFileItem;
            //// 是否直接关联 文件
            this.updateFileAfter(newFileItem);
          }
        })
        .catch();
    },
    // updateFileAfter(fileItem) {
    //   //let aduitStatus = this.form
    //   let auditStatus = this.formData.auditStatus;
    //   if (this.orderReadOnly) {
    //     console.log("当前表单是非编辑状态，需要自动提交附件");
    //     let fileList = [];
    //     fileList[0] = fileItem;
    //     let tempForm = {
    //       docEntry: this.formData.docEntry,
    //       isNo: this.formData.isNo,
    //       fileItems: fileList,
    //     };
    //     updateFile(tempForm).then((res) => {
    //       console.log("自动提交附件", res);
    //     });
    //     return;
    //   }
    //   console.log("当前表单是编辑状态，无需自动提交数据");
    // },
    goodsItemColl(index) {
      if (index || index === 0) {
        this.heightIndex = "20px";
        this.heightIndex = Number(this.heightIndex.replace(/px/g, ""))*index + 'px'
        this.goodsItemActIndex = index;
      }
    },
  },

  computed: {
    // 打包金额
    getPacksum() {
      return moneyFormat(this.formData.packsum);
    },
    // 领用标识
    getStatusFlag() {
      this.statusFlagList.forEach(item => {
        if(item.id === this.formData.statusFlag) {
          this.formData.statusFlag = item.text;
        }
      })
      return this.formData.statusFlag
    },
    // 币种格式化
    getCurrencyCode() {
      this.currencyCodeList.forEach(item => {
        if(item.currencyCode === this.formData.currencyCode) {
          this.formData.currencyCode = item.currencyName;
        }
      })
      return this.formData.currencyCode;
    },
    // 计算高度
    goodsDetailHeight: function () {
      /// const height = window.innerHeight;
      let goodsItemActIndex = this.goodsItemActIndex;
      console.log("当前展开行", goodsItemActIndex);
      if (goodsItemActIndex || goodsItemActIndex === 0) {
        //长度
        let len = this.formData.items.length;

        /// 商品明细展开行 序号
        //let
        let bflen = goodsItemActIndex + 1;
        let aftlen = -1;
        let bfh = bflen * 35;
        let afth = aftlen * 35;

        const searchBarHeight = 1 * 35;
        console.log("计算高度", searchBarHeight);
        //  可视高度    -  上部分 固定栏的高度
        return `calc(100vh  - 137.93px + ${bfh}px  +  ${afth}px -  ${searchBarHeight}px`;
      } else {
        return `calc(100vh  - 137.93px - 35px`;
      }
    },
    ///// 计算平台名称
    computedOrgCo: function () {
      let orgCono = this.formData.orgCoNo;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
          return this.orgList[i].orgName;
        }
      }
      return "";
    },
    ///// 计算贸易类型
    computedTrade: function () {
      let tradType = this.formData.tradType;
      for (var i = 0; i < this.tredeTypeList.length; i++) {
        if (this.tredeTypeList[i].tradeTypeNo === tradType) {
          return this.tredeTypeList[i].tradeType;
        }
      }
      return "";
    },

    ///// 计算销售类型
    computedSaleType: function () {
      let saleType = this.formData.saleType;
      for (var i = 0; i < this.saleTypeList.length; i++) {
        if (this.saleTypeList[i].refId == saleType) {
          return this.saleTypeList[i].refValue;
        }
      }
      return "";
    },
  },
  setup() {
    provide("title", "出口信用证详情");
  },
};
</script>

<style scoped lang="less">
::v-deep {
  .van-tab--active {
    color: #1fa2e8;
    font-weight: 900;
    //background-color: darkseagreen;
  }

  .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 6.2em;
    margin-right: 0.12rem;
    color: #646566;
    text-align: left;
    word-wrap: break-word;
  }
  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.14667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.84rem;
    background-color: #fff;
    .textarea {
      border-bottom: 1px solid rgb(134, 154, 232);
    }
  }
  textarea.van-field__control {
    border: 1px solid rgb(134, 154, 232);
    padding-left: 9px;
  }
}
.update-load {
  width: 100%;
  flex: display;

  .update-btn {
    width: 30%;
  }
  .update-tip {
    margin-top: 10px;
    width: 69%;
    font-size: 12px;
    color: red;
    margin-left: 20px;
    .span {
      color: red;
    }
  }
}
.textarea_1 {
  background-color: #fff;
  padding-left: 15px;
}
.class_textarea {
  border: 1px;
}
.delete-button {
  height: 100%;
}
.empty {
  background: transparent;
  height: 280px;
}
.percent {
  height: 100%;
  padding-top: 10px;
  font-size: 14px;
  background: #fff;
}

.pdt_bt {
  // display: flex;
  height: 35px;
  width: 100%;
  button {
    float: right;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.copy {
  width: 100%;
  display: flex;
  button {
    flex: 1;
    height: 27px;
    margin: 0 17px;
  }
}
.wrappers {
  background-color: #eeeeee;
  height: calc(100vh - 137.93px + 47.95px);
  // height: calc(100vh - 137.93px);
  width: 100%;
  overflow: hidden;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 95vw;
      margin: 10px auto;
      border-radius: 5px;
      font-size: 14px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      .contact-number,
      .company-money {
        margin-left: 20px;
      }
    }
  }
}
.wrappers-contact {
  // height: calc(100vh - 194.43px);
  height: calc(100vh - 192.93px - v-bind(heightIndex));
}
.wrappers-goods-detail {
  height: calc(100vh - 192.93px - v-bind(heightIndex));
}
.wrappers-status-detail {
  height: calc(100vh - 137.93px);
  background-color: #ffffff;
}
.wrappers-file-detail {
  height: calc(100vh - 137.93px);
  background-color: #ffffff;
}
.fileFromClass {
  margin-top: 15px;
}
.class_uploader {
  width: 400%;
  height: 40px;

  button {
    height: 35px;
    margin-bottom: 20px;
    margin-left: 15px;
  }
}
.list_bt {
  width: 100%;
  display: flex;
  background-color: white;
  margin-bottom: 10px;
  button {
    flex: 1;
    height: 30px;
    margin: 0 17px;
  }
}

.tools-bar {
  display: flex;
  padding: 8px;
  .tools-bar-button {
    flex: 1;
    & + .tools-bar-button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}
.oa-status-item {
  background-color: #1fa2e8;
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
