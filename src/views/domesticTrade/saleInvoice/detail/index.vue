<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <!-- <div class="tools-bar">
      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnPdfView"
        @click="mainBtnClickPDFView"
        >合同预览</van-button
      >
    </div> -->

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              v-model="computedOrgCo"
              input-align="left"
              name="平台公司"
              label="平台公司"
              readonly
              required
            />
            <van-field
              input-align="left"
              v-model="formData.invoiceType"
              readonly
              name="发票类型"
              label="发票类型"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invAmount"
              name="开票限额"
              label="开票限额"
            />
            <van-field
              input-align="left"
              required
              readonly
              v-model="formData.isInvoiceNo"
              name="开票编号"
              label="开票编号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.isInvoiceLoc"
              name="发票代码"
              label="发票代码"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.isInvoiceNo1"
              name="增值税发票号"
              label="增值税发票号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoiceDate"
              :formatter="formatter"
              name="发票日期"
              label="发票日期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.coNameE"
              name="客户"
              label="客户"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.bankName"
              name="开户行"
              label="开户行"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.accountNo"
              name="账号"
              label="账号"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.vendorName1"
              name="开票单位"
              label="开票单位"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.address"
              name="地址"
              label="地址"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.taxNo"
              name="税号"
              label="税号"
            />
            <van-field
              readonly
              input-align="left"
              name="数量"
              label="数量"
              v-model="formData.quantity"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.totalPriceNt"
              name="无税金额"
              label="无税金额"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.taxAmount"
              name="税额"
              label="税额"
            />
            <van-field
              readonly
              input-align="left"
              name="价税合计"
              label="价税合计"
              v-model="formData.totalPrice"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.orderType"
              name="贸易方式"
              label="贸易方式"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.auditStatus"
              name="审批状态"
              label="审批状态"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.auditorNo"
              name="审批人"
              label="审批人"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.orgName"
              name="部门"
              label="部门"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.employeeName"
              name="业务员"
              label="业务员"
            />
            <van-field
              input-align="left"
              v-model="formData.contrlA"
              name="红字发票"
              label="红字发票"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.contrlC"
              name="制证标识"
              label="制证标识"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.acctorNo"
              name="制证人"
              label="制证人"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.issueDate"
              name="制单日期"
              label="制单日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.empName"
              name="制单人"
              label="制单人"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.transFee"
              name="运费"
              label="运费"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.wareFee"
              name="仓储费"
              label="仓储费"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.otherFee"
              name="其他费用"
              label="其他费用"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sumValue"
              name="成本总价"
              label="成本总价"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.profit"
              name="净利润"
              label="净利润"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.remark"
              name="备注"
              label="备注"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sapType"
              name="SAP接口状态"
              label="SAP接口状态"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sapOrderNo"
              name="SAP销售订单号"
              label="SAP销售订单号"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sapCreateDate"
              name="SAP创建日期"
              label="SAP创建日期"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="商品">
        <div class="detail_item">
          <van-collapse
            v-model="pdtItemsActiveIndex"
            accordion
            @change="goodsItemColl"
          >
            <div v-if="formData.items.length">
              <van-collapse-item
                v-for="(item, index) in formData.items"
                :key="index"
                :name="index + 1"
                :title="index + 1"
              >
                <Scroll
                  class="wrappers-goods-detail wrappers"
                  wrapper="goodsDetailRef"
                  ref="goodsDetail"
                >
                  <!-- :ref="('goodsDetail' + index)" -->
                  <van-form label-width="150">
                    <van-field
                      v-model="item.invGroup"
                      label="开票分组"
                      readonly
                      input-align="left"
                    />
                    <van-field
                      v-model="item.pdtName"
                      label="商品名称"
                      readonly
                      input-align="left"
                    />
                    <van-field
                      v-model="item.specification"
                      label="规格"
                      readonly
                      input-align="left"
                    />
                    <van-field
                      v-model="item.uom"
                      readonly
                      input-align="left"
                      label="单价"
                    />
                    <van-field
                      readonly
                      v-model="item.pieces"
                      label="件数"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.quantity"
                      readonly
                      label="数量"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.unitCostNt"
                      readonly
                      label="含税单价"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.subSumValue"
                      readonly
                      label="无税金额"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.totalAmount"
                      readonly
                      label="价税合计"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.taxRate"
                      readonly
                      label="税率(%)"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.taxAmount"
                      readonly
                      label="税额"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.taxCode"
                      readonly
                      label="开票末级编码"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.taxType"
                      readonly
                      label="开票大类名称"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.fpDm"
                      readonly
                      label="发票代码"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.fpNo"
                      readonly
                      label="增值税发票号"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.fpDate"
                      readonly
                      label="发票日期"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.fpStatus"
                      readonly
                      label="发票状态"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.chIsInvoiceNo1"
                      readonly
                      label="原发票号"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.isNo"
                      readonly
                      label="销售合同"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.refNo"
                      readonly
                      label="客户合同号"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.wareHsNo"
                      readonly
                      label="出库单"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.inWareHsNo"
                      readonly
                      label="入库单"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.wareUnitCost"
                      readonly
                      label="含税成本价"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.wareUnitCostNt"
                      readonly
                      label="不含税成本价"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.orderMid"
                      readonly
                      label="识别码"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.pdtNo1"
                      readonly
                      label="产品号"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.orderNo"
                      readonly
                      label="进口/内采合同"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.refNo1"
                      readonly
                      label="供货商合同号"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.impNoticNo"
                      readonly
                      label="进口发票"
                      input-align="left"
                    />
                  </van-form>
                </Scroll>
              </van-collapse-item>
              <!-- <div class="empty"></div> -->
            </div>
          </van-collapse>
        </div>
        <!-- </Scroll> -->
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

//import ErpVendorSelect from "@/components/ErpVendor.vue";
//import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
//import ErpProductSelect from "@/components/ErpProduct.vue";
//import ErpFile from "@/components/ErpFile.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { getInvoiceInfo } from "@/api/domesticTrade/saleInvoice";
import { getTable3XByDoc, getTable3XByRef, getAuditStatusList } from "@/api/common";

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
    //ScrollFirst,
    //ErpVendorSelect,
    //ErpEmployeeSelect,
    //ErpProductSelect,
    //ErpFile,
  },
  watch: {
    tabActive: {
      handler(oldVal, newVal) {
        // if(oldVal === 0 && newVal === undefined) {
        //   this.$nextTick(_ => {
        //     this.$refs.main.refresh();
        //   })
        // }
        // if(newVal === 1) {
        //     this.$refs.goodsDetail.initScroll();
        //     this.$refs.goodsDetail.refresh();
        // }
        if (newVal === 0) {
          this.$refs.main.refresh();
        }
        // else if(newVal === 1) {
        //   this.$refs.goods.refresh();
        // }

        // else if(newVal === 2) {
        //   this.$nextTick(_ => {
        //   this.$refs.contact.refresh();
        //   })
        // }
        else if (newVal === 3) {
          this.$refs.file.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      invoiceTypeList: [
        { refValue: "增值税发票", refValueCode: 'I' },
        { refValue: "普通发票", refValueCode: 'C' },
      ],
      heightIndex: "20px",
      auditStatusList: [],
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
      statusList: [
        { refValue: "未复核", refValueCode: "N" },
        { refValue: "复核", refValueCode: "Y" },
        { refValue: "退回", refValueCode: "R" },
      ],
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
    };
  },
  created() {
    this.docentry = this.$route.query.docEntry;
    console.log("this.docentry",this.docentry);
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
    getTable3XByDoc({
      objRef: "payTerm",
      objectNo: "PM09"
    }).then(res => {
      this.payModeList.push(...res.data);
    })
    getAuditStatusList({}).then(res => {
      this.auditStatusList.push(...res.data);
    })
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
    getCurrencyCode().then((res) => {
      this.currencyCodeList.push(...res);
    });
    if (this.docentry) {
      this.loadDetail();
    }
  },
  methods: {
    formatter(val) {
      return val.substr(0, 10);
    },
    // changeInvoiceType({ label, value }) {
    //   this.formData.invoiceType = label;
    // },
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
      this.auditStatusList.forEach(item => {
        if(data.auditStatus === item.statusCode) {
          data.auditStatus = item.statusName;
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
      this.statusList.forEach(item => {
        if(data.status == item.refValueCode) {
          data.status = item.refValue;
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
      getInvoiceInfo({ docEntry: this.docentry })
      .then((res) => {
        if(res.data.items) {
          this.initAllStatus(res.data.items, res.data)
        }
        // this.formData = res.data;
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
    provide("title", "销售发票详情");
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
