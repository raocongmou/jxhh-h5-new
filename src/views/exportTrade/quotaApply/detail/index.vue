<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <div class="tools-bar">
      <van-button
        v-show="btnSaveShow"
        size="small"
        class="tools-bar-button"
        @touchstart="handleUpdate"
        type="success"
        @click="mainBtnClickSave"
        >保存</van-button
      >
      <van-button
        v-show="btnCancelShow"
        size="small"
        class="tools-bar-button"
        type="warning"
        color="#e8c048"
        @click="mainBtnClickCancel"
        >取消</van-button
      >
      <van-button
        v-show="btnAddShow"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        @click="mainBtnClickAdd"
        >新增</van-button
      >
      <van-button
        v-show="btnEditShow"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="editStatus === 'view'"
        @click="mainBtnClickEdit"
        >修改</van-button
      >
      <van-button
        v-show="btnDeleteShow"
        size="small"
        class="tools-bar-button"
        type="danger"
        color="#e85452"
        @click="mainBtnClickDelete"
        >删除</van-button
      >
      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnAuditShow"
        color="#1fa2e8"
        @click="mainBtnClickAudit"
        >提交审批</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnCancelAuditShow"
        color="#e8c048"
        @click="mainBtnClickCancelAudit"
        >撤销审批</van-button
      >
    </div>
    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <!-- <div class="scroll-wrap-main-table"> -->
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form @submit="onSubmit" label-width="150">
            <van-field
              v-model="computedOrgCo"
              input-align="left"
              label="平台公司"
              placeholder="请输入平台公司"
              readonly
            />
            <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="auditStatusList"
              :label="'审批状态'"
              :placeholder="'审批状态'"
              :readonly="true"
              :btnStatus="editStatus"
              :field="formData.auditStatus"
            />
            <van-field
              input-align="left"
              v-model="formData.applyNo"
              readonly
              required
              placeholder="请输入申请单号"
              label="申请单号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.inputDate"
              label="制单日期"
              placeholder="请输入制单日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.empName"
              label="录入人"
              placeholder="请输入录入人"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.orgName"
              label="部门"
              placeholder="请输入部门"
              required
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.employeeName"
              label="业务员"
              required
              placeholder="请输入业务员"
              @click="mainSelecteEmployee()"
            />
            <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="statusList"
              :label="'执行状态'"
              :placeholder="'执行状态'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.status"
              @change="({label, value}) => changeRcmSelect({label, value}, 'status')"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.custName"
              label="客户名称"
              placeholder="请输入客户名称"
              required
              @click="mainSelectVendor()"
            />
            <van-field
              input-align="left"
              :readonly="orderReadOnly"
              v-model="formData.custAddr"
              label="客户详细地址"
              placeholder="请输入客户详细地址"
            />
            <RcmSelect
              :select-label="'id'"
              :select-value="'text'"
              :valueKey="'id'"
              :options="quotaTypeList"
              :label="'额度类型'"
              :placeholder="'额度类型'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.quotaType"
              @change="({label, value}) => changeRcmSelect({label, value}, 'quotaType')"
            />
            <RcmSelect
              :select-label="'currencyName'"
              :select-value="'currencyCode'"
              :valueKey="'currencyName'"
              :options="currencyCodeList"
              :label="'币种'"
              :placeholder="'币种'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.currency"
              @change="({label, value}) => changeRcmSelect({label, value}, 'currency')"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.custArea"
              label="客户国家地区"
              placeholder="请输入客户国家地区"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.zcZb"
              label="注册资本(元)"
              placeholder="请输入注册资本(元)"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.lastZb"
              label="上年总资产(元)"
              placeholder="请输入上年总资产(元)"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.zbFzRate"
              label="资产负债率(%)"
              placeholder="请输入资产负债率(%)"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.lastProfit"
              label="上年净利润(元)"
              placeholder="请输入上年净利润(元)"
            />
            <!-- <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.ifYyq"
              label="是否有逾期"
              placeholder="请输入是否有逾期"
            /> -->
            <RcmSelect
              :select-label="'label'"
              :select-value="'value'"
              :valueKey="'label'"
              :options="ifYyqList"
              :label="'是否有逾期'"
              :placeholder="'是否有逾期'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.ifYyq"
              @change="({label, value}) => changeRcmSelect({label, value}, 'ifYyq')"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.xyPeriod"
              label="信用期限"
              placeholder="请输入信用期限"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              required
              v-model="formData.applyQuota"
              label="申请金额(元)"
              placeholder="请输入申请金额(元)"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.payType"
              label="合同支付方式"
              placeholder="请输入合同支付方式"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.currentAmount"
              label="当前在手订单金额(元)"
              placeholder="请输入当前在手订单金额(元)"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.currentYsYe"
              label="当前应收款余额(元)"
              placeholder="请输入当前应收款余额(元)"
            />
            <van-field
              :readonly="orderReadOnly"
              input-align="left"
              v-model="formData.productName"
              label="出口商品名称"
              placeholder="请输入出口商品名称"
            />
            <!-- dixian -->
            <!-- 
              <van-field
                :readonly="orderReadOnly"
                input-align="left"
                placeholder="请输入客户国家地区"
                label="客户国家地区"
                v-model="formData.custArea"
              />
              <van-field
                input-align="left"
                placeholder="请输入注册资本(元)"
                type="number"
                :readonly="orderReadOnly"
                v-model="formData.zcZb"
                label="注册资本(元)"
              />
              <van-field
                input-align="left"
                type="number"
                :readonly="orderReadOnly"
                placeholder="请输入上年总资产(元)"
                v-model="formData.lastZb"
                label="上年总资产(元)"
              />
              <van-field
                :readonly="orderReadOnly"
                input-align="left"
                label="资产负债率(%)"
                type="number"
                placeholder="请输入资产负债率(%)"
                v-model="formData.zbFzRate"
              />
              <van-field
                :readonly="orderReadOnly"
                input-align="left"
                type="number"
                placeholder="请输入上年净利润(元)"
                v-model="formData.lastProfit"
                label="上年净利润(元)"
              />
              <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="ifYyqList"
                :label="'是否有逾期'"
                :placeholder="'是否有逾期'"
                :readonly="orderReadOnly"
                :isRightArrow="true"
                :field="formData.ifYyq"
                @change="({label, value}) => changeRcmSelect({label, value}, 'ifYyq')"
              />
              <van-field
                :readonly="orderReadOnly"
                placeholder="请输入信用期限"
                input-align="left"
                type="number"
                v-model="formData.xyPeriod"
                label="信用期限"
              />
              <van-field
                :readonly="orderReadOnly"
                input-align="left"
                placeholder="请输入申请金额(元)"
                required
                type="number"
                v-model="formData.applyQuota"
                label="申请金额(元)"
              />
              <van-field
                input-align="left"
                v-model="formData.payType"
                placeholder="请输入合同支付方式"
                label="合同支付方式"
                :readonly="orderReadOnly"
              />
              <van-field
                :readonly="orderReadOnly"
                input-align="left"
                type="number"
                placeholder="请输入当前在手订单金额(元)"
                v-model="formData.currentAmount"
                label="当前在手订单金额(元)"
              />
              <van-field
                :readonly="orderReadOnly"
                placeholder="请输入当前应收款余额(元)"
                input-align="left"
                type="number"
                v-model="formData.currentYsYe"
                label="当前应收款余额(元)"
              />
              <van-field
                input-align="left"
                :readonly="orderReadOnly"
                placeholder="请输入出口商品名称"
                v-model="formData.productName"
                label="出口商品名称"
              /> 
            -->
          </van-form>
        </Scroll>
        <!-- </div> -->
      </van-tab>
      <van-tab title="审批进度">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <!-- 商品明细 -->
          <Scroll
            class="wrappers-status-detail wrappers"
            wrapper="oaStatusRef"
            v-if="oaStatusArr.length"
            ref="oaStatus"
          >
            <div>
              <van-steps direction="vertical" :active="0">
                <van-step v-for="item in oaStatusArr" :key="item.pkId">
                  <p>{{ item.makeTime }}</p>
                  <p>
                    {{ item.sysNote }}&nbsp;&nbsp;{{ item.userName }}&nbsp;{{
                      item.auditStatus
                    }}
                  </p>
                  <p>{{ item.auditRemark }}</p>
                </van-step>
              </van-steps>
            </div>
          </Scroll>
        </div>
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
    <!-- 选择业务员-->
    <van-popup
      v-model:show="showEmploeeySelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpEmployeeSelect
        :showEmployee="showEmploeeySelect"
        v-on="{ selectEmployeeItem: selectEmployeeItem }"
      />
    </van-popup>
    <!-- 选择客户 -->
    <van-popup
      v-model:show="showVendorSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <VendorDialog
        :showVendor="showVendorSelect"
        :employeeNo="employeeNoVendor"
        v-on="{ selectVendorItem: selectVendorItem }"
      />
    </van-popup>
  </div>
</template>

<script>
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar";
import Scroll from "@/components/Scroll";
import { dateFormat, moneyFormat, rMoneyFormat } from "@/utils/format";
import { 
  getQuotaApplyInfo,
  addQuotaApply,
  updateQuotaApply,
  delQuotaApply,
  undoApply,
  apply,
  deleteQuotaApply
} from "@/api/exportTrade/quotaApply";
import { 
  getTable3XByDoc, 
  getDocStatusList, 
  getCurrencyCodeList, 
  getTable3XByRef, 
  getAuditStatusList,
  getBankList,
  getDocNum 
} from "@/api/common";

import { listOaStatus } from "@/api/erp.oa";
import { genarateDocNo } from "@/api/erp.docno";
import { upload, down } from "@/api/erp.file";

import { getOrgList, getOrgInfo } from "@/utils/erp.org";

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data";

import fieldFormData from "./cloumn";
import { getCookie } from "@/utils/user.setting";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import ErpEmployeeSelect from "@/components/ErpEmployee";
import VendorDialog from "../components/VendorDialog";

export default {
  name: "PurchaseInvoiceDetail",
  components: {
    NavBar,
    Scroll,
    ErpEmployeeSelect,
    VendorDialog
  },
  computed: {
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
  data() {
    return {
      inputDate: "",
      ifYyqList: [
        { label: "是", value: "是" },
        { label: "否", value: "否" },
      ],
      oaStatusArr: [],
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
      objectNo: "PM03",
      tileName: "销售合同详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      baseForm: fieldFormData().formData,
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
      auditStatusList: JSON.parse(this.$route.query.auditStatusList),
      currencyCodeList: JSON.parse(this.$route.query.currencyCodeList),
      statusList: JSON.parse(this.$route.query.statusList),//执行状态
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
      // 额度类型
      quotaTypeList: [
        {id: "赊销额度", text: "赊销额度"},
        {id: "信保额度", text: "信保额度"},
      ],
      transtoolList: [], // 运输方式
    };
  },
  created() {
    this.docentry = this.$route.query.docEntry;
    
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
    // });
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
    if (this.docentry !== null) {
      this.loadDetail();
      
    } else {
      this.addOrder();
    }
    this.setBtnStatus();
  },
  methods: {
    changeRcmSelect({value}, field) {
      this.formData[field] = value;
    }, 
    // 获取OA 审批数据
    loadOaStatus() {
      let docentry = this.formData.oid;
      let isNo = this.formData.applyNo;
      listOaStatus("SYS17", docentry, isNo)
      .then((res) => {
        this.oaStatusArr = res.data.reverse();
      })
      .catch((res) => {});
    },
    // 撤销审批
    doCancelApply() {
      undoApply({
        docEntry: this.formData.pkId,
        cancelReason: this.cancelReason,
      })
        .then((res) => {
          Notify({ type: "success", message: "申请撤销成功!" });
          this.editStatus = "view";
          this.loadDetail();
        })
        .catch((res) => {
          Notify({ type: "danger", message: "撤销审批失败:" + res });
        });
    },
    // 撤销审批
    mainBtnClickCancelAudit() {
      //undoApply
      this.undoApplyShow = true;
    },
    // 提交审批
    mainBtnClickAudit() {
      apply({ docEntry: this.formData.pkId })
      .then((res) => {
        if (res.code === 1) {
          Notify({ type: "success", message: "提交审批成功!" });
          this.loadDetail();
          this.tabActive = 0;
        } else {
          Notify({ type: "danger", message: "提交审批失败!" + res.msg });
        }
      })
      .catch((res) => {
        Notify({ type: "danger", message: "提交审批失败!" + res });
      });
    },
    // form表单中触发  选择往来单位的按钮
    mainSelectVendor() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.employeeNoVendor = this.formData.employeeNo;
      if (
        !this.employeeNoVendor ||
        this.employeeNoVendor === "" ||
        this.employeeNoVendor === undefined
      ) {
        Notify({ type: "danger", message: "请先选择业务员" });
        return;
      }
      // 选择往来单位
      this.showVendorSelect = true;
    },
    /// 弹窗选择往来单位
    selectVendorItem(item) {
      console.log("item", item);
      // 需要带入到客户联系信息
      this.formData.custName = item.coNameC;
      this.formData.custNo = item.vendorNo1;
      this.formData.custAddr = item.coAddr;
      // this.formData.orgNo = item.orgNo;
      // this.formData.orgName = item.unitName4;
      // this.formData.vndCst = item.vndCst;
      // this.formData.refNoTitle2 = item.strAuditFlag;
      // this.formData.vendorNo = item.vendorNo1;
      this.showVendorSelect = false;
    },
    // 选择业务员
    mainSelecteEmployee() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.showEmploeeySelect = true;
    },
    /// 弹窗选择业务员
    selectEmployeeItem(item) {
      let userNo = item.userNo;
      if (!this.formData.employeeNo || userNo === this.formData.employeeNo) {
        this.formData.employeeName = item.userName;
        this.formData.employeeNo = item.userNo;
        this.formData.orgNo = item.orgNo;
        this.formData.orgName = item.orgName;
      } else if (this.formData.employeeNo) {
        Dialog.confirm({
          title: "修改业务员",
          message: "该操作将会重置你所选择的往来单位以及商品明细,是否继续?",
        })
          .then((res) => {
            this.doChangeEmployee(item);
          })
          .catch((res) => {});
      }
      this.showEmploeeySelect = false;
    },
    /// 弹窗中用户选择了某一个业务员，并且做了修改
    doChangeEmployee(item) {
      this.formData.items = [];
      this.formData.custName = "";
      this.formData.custNo = "";
      this.formData.employeeName = item.userName;
      this.formData.employeeNo = item.userNo;
      this.formData.orgNo = item.orgNo;
      this.formData.orgName = item.orgName;
    },
    // 下拉框选择改变
    changeRcmSelect({ value }, field) {
      this.formData[field] = value;
    },
    // 删除
    mainBtnClickDelete() {
      Dialog.confirm({
        title: `确定删除当前授信额度申请吗?`,
        message: `申请单号【${this.formData.applyNo}】一旦删除，将无法恢复!`,
      })
      .then(() => {
        deleteQuotaApply({ docEntry: this.formData.oid })
          .then((res) => {
            if (res.code === 1) {
              Notify({ type: "success", message: "删除成功!" });
              // 返回
              this.$router.go(-1); //返回上一层
            } else {
              Notify({ type: "danger", message: "删除单据失败!" + res.msg });
            }
          })
          .catch((res) => {
            Notify({ type: "danger", message: "删除单据失败!" + res });
          });
      })
      .catch(() => {});
    },
    // 新增
    mainBtnClickAdd() {
      this.addOrder();
    },
    addOrder() {
      for (let key in this.formData) {
        this.formData[key] = this.baseForm[key];
      }
      // 平台公司名称获取
      this.formData.orgCoNo = getDefaultOrgCoNo();
      this.inputDate = dateFormat(new Date, "yyyy-MM-dd HH:mm:ss")
      this.formData.inputDate = dateFormat(new Date, "yyyy-MM-dd");
      this.formData.status = "U";//执行状态
      this.formData.currency = "CNY";//执行状态
      this.formData.auditStatus = "D";
      this.formData.exchRate = 1.0;
      this.formData.quotaType = "赊销额度";
      this.formData.empName = getCookie("loginInfo").realName;
      this.formData.empNo = getCookie("loginInfo").userNo;
      this.formData.employeeNo = getCookie("loginInfo").userNo;
      this.formData.employeeName = getCookie("loginInfo").realName;
      this.formData.orgNo = getCookie("loginInfo").orgNo;
      this.formData.orgName = getCookie("loginInfo").orgName;
      // docNum赋值
      getDocNum({
        objectNo: "SYS17",
        orgCoNo: getDefaultOrgCoNo()
      }).then((res) => {
        if (res.data) {
          this.formData.applyNo = res.data;
        }
      })
      this.editStatus = "add";
      this.setBtnStatus();
    },
    // 取消
    mainBtnClickCancel() {
      Dialog.confirm({
        title: "取消对单据的操作",
        message: "当前操作将不会保存您对单据的修改!",
      })
      .then(() => {
        this.doCancelOrder();
      })
      .catch(() => {});
    },
    doCancelOrder() {
      if (this.oldFormData && this.oldFormData.pkId) {
        this.formData = this.oldFormData;
        this.orderReadOnly = true;
        this.editStatus = "view";
        this.loadDetail();
        this.setBtnStatus();
      } else {
        this.$router.go(-1);
      }
    },
    // 保存
    mainBtnClickSave() {
      let check = this.beforeDoSave();
      if (!check) {
        return;
      }
      this.sendFomData.inputDate = this.inputDate;
      const fieldArr = ["zcZb", "lastZb", 
        "lastProfit", "applyQuota", "currentAmount", "currentYsYe"];
        this.formatField("Number", this.sendFomData, fieldArr);
      if (this.sendFomData.oid) {
        updateQuotaApply(this.sendFomData)
          .then((res) => {
            this.doAfterSave(res);
            this.loadDetail();
          })
          .catch((res) => {
            Notify({
              type: "error",
              message: "更新出库单错误：" + res.message,
            });
          });
        return;
      } else {
        this.addWareHouseApi();
      }
    },
    addWareHouseApi() {
      addQuotaApply(this.sendFomData)
        .then((res) => {
          this.formData = res.data;
          this.sendFomData = {};
          this.editStatus = "view";
          this.setBtnStatus();
          this.loadDetail();
          Notify({
            type: "success",
            message: "新增授信额度申请成功!"
          })
        })
        .catch((res) => {
          Notify({
            type: "error",
            message: "新增授信额度申请错误：" + res.message,
          });
        });
      return;
    },
    /////保存之前的操作 数据校验
    checkSaveFormData() {
      /// 业务员判断
      let temp = this.formData.employeeName;
      if (!temp) {
        Notify({ type: "warning", message: "业务员尚未录入!" });
        return 0;
      }
      // 往来单位
      temp = this.formData.custName;
      if (!temp) {
        Notify({ type: "warning", message: "客户名称尚未录入!" });
        return 0;
      }
      // 部门
      temp = this.formData.orgName;
      if (!temp) {
        Notify({ type: "warning", message: "部门尚未录入!" });
        return 0;
      }
      //申请金额
      temp = this.formData.applyQuota;
      if (!temp) {
        Notify({ type: "warning", message: "申请金额尚未录入!" });
        return 0;
      }
      // //合同类型
      // temp = this.formData.orderMode;
      // if (!temp) {
      //   Notify({ type: "warning", message: "合同类型尚未选择!" });
      //   return 0;
      // }
      // ////销售类型
      // temp = this.formData.saleType;
      // if (!temp) {
      //   Notify({ type: "warning", message: "销售类型尚未选择!" });
      //   return 0;
      // }
      // temp = this.formData.outType;
      // if (!temp) {
      //   Notify({ type: "warning", message: "收款方式尚未选择!" });
      //   return 0;
      // }
      // temp = this.formData.payMode;
      // if (!temp) {
      //   Notify({ type: "warning", message: "收款模式尚未选择!" });
      //   return 0;
      // }
      // temp = this.formData.msd;
      // if (!temp) {
      //   Notify({ type: "warning", message: "最迟交货期尚未选择!" });
      //   return 0;
      // }
      ///明细必须有
      // if (!this.formData.items || this.formData.items.length == 0) {
      //   Notify({ type: "warning", message: "尚未录入商品明细!" });
      //   return 0;
      // }
      //  对明细进行验证
      // for (let index = 0; index < this.formData.items.length; index++) {
      //   const itemPdt = this.formData.items[index];
      //   if (!itemPdt.pdtNo1) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细尚未选择销售商品!`,
      //     });
      //     return 0;
      //   }
      //   if (!itemPdt.quantity || Number(itemPdt.quantity) <= 0) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细尚未录入数量!`,
      //     });
      //     return 0;
      //   }
      //   if (!itemPdt.unitPrice || itemPdt.unitPrice <= 0) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细尚未录入单价!`,
      //     });
      //     return 0;
      //   }
      //   if (!itemPdt.sapUnitRate || itemPdt.sapUnitRate <= 0) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细的sap转换比为空!`,
      //     });
      //     return 0;
      //   }
        // this.formData.items[index].groupNo = (index + 1) * 10;
      // }

      return 1;
    },
    // 保存之前的操作
    beforeDoSave() {
      let check = this.checkSaveFormData();
      if (!check) {
        return 0;
      }
      this.sendFomData = this.formData;
      return 1;
    },
    // 保存之后的操作
    doAfterSave(res) {
      if (res) {
        this.formData = res.data;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.sendFomData = {};
        this.editStatus = "view";
        Notify({
          type: "success",
          message: "修改授信额度申请成功!"
        })
        this.setBtnStatus();
        return;
      } else {
        Notify({
          type: "error",
          message: "保存授信额度申请出错",
        });
      }
    },
    // 修改
    mainBtnClickEdit() {
      let canEdit = this.getOrderCanEdit();
      if (canEdit) {
        this.editStatus = "edit";
        this.setBtnStatus();
      }
    },
    // 当前详情是否可以修改
    getOrderCanEdit() {
      let docEntry = this.formData.oid;
      if (!docEntry) {
        return 0;
      }
      let auditstatu = this.formData.auditStatus;
      if (!auditstatu && (auditstatu === "Y" || auditstatu === "S")) {
        return 0;
      }

      return 1;
    },
    /// 设置 按钮的状态
    setBtnStatus() {
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
        this.btnSapShow = false;
        let auditStatu = this.formData.auditStatus;
        if (auditStatu === "D" || auditStatu === "N") {
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
    initAllStatus(data) {
      this.auditStatusList.forEach(item => {
        if(data.auditStatus === item.statusCode) {
          data.auditStatus = item.statusName;
        }
      })
      // this.bankList.forEach(item => {
      //   if(data.negobank === item.bankCode) {
      //     data.negobank = item.bankNameC;
      //   }
      // })
      this.currencyCodeList.forEach(item => {
        if(data.currency === item.currencyCode) {
          data.currency = item.currencyName;
        }
      })
      // this.transtoolList.forEach(item => {
      //   if(data.transtool === item.refValueE) {
      //     data.transtool = item.refValue;
      //   }
      // })
      // this.negotiationflagList.forEach(item => {
      //   if(data.negotiationFlag === item.refValueCode) {
      //     data.negotiationFlag = item.refValue;
      //   }
      //   if(data.transhipment === item.refValueCode) {
      //     data.transhipment = item.refValue;
      //   }
      //   if(data.partialshipment === item.refValueCode) {
      //     data.partialshipment = item.refValue;
      //   }
      // })
      // this.cmmsnsign1List.forEach(item => {
      //   if(data.cmmsnsign1 === item.refValueCode) {
      //     data.cmmsnsign1 = item.refValue;
      //   }
      // })
      // this.invoiceTypeList.forEach(item => {
      //   if(data.invoiceType === item.refValueCode) {
      //     data.invoiceType = item.refValue;
      //   }
      // });
      // this.flag2List.forEach(item => {
      //   if(data.flag2 == item.refValueCode) {
      //     data.flag2 = item.refValue;
      //   }
      // });
      // this.flag1List.forEach(item => {
      //   if(data.flag1 == item.refValueCode) {
      //     data.flag1 = item.refValue;
      //   }
      // });
      // this.conformList.forEach(item => {
      //   if(data.conform == item.refValueCode) {
      //     data.conform = item.refValue;
      //   }
      // });
      // this.acctFlagList.forEach(item => {
      //   if(data.acctFlag == item.refValueCode) {
      //     data.acctFlag = item.refValue;
      //   }
      // });
      return data;
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
    formatField(type, data, fieldArr) {
      if(type === "Money") {
        fieldArr.forEach(item => {
          data[item] = moneyFormat(data[item]);
        });
        data.zbFzRate = Number(data.zbFzRate).toFixed(2);
      } else if(type === "Number") {
        fieldArr.forEach(item => {
          data[item] = rMoneyFormat(data[item]);
        })
      }
    },
    ///重新加载所有的数据
    loadDetail() {
      getQuotaApplyInfo({ docEntry: this.docentry?this.docentry:this.formData.pkId }).then((res) => {
        if(res.data) {
          const fieldArr = ["zcZb", "lastZb", 
          "lastProfit", "applyQuota", "currentAmount", "currentYsYe"];
          this.formatField("Money", res.data, fieldArr);
          this.inputDate = res.data.inputDate;
          res.data.inputDate = dateFormat(res.data.inputDate, "yyyy-MM-dd");
          this.formData = res.data;
          // this.formData = this.initAllStatus(res.data);
          this.oldFormData = JSON.parse(JSON.stringify(this.formData));
          this.loadOaStatus();
          this.setBtnStatus();
        }
        // this.formData = this.removeBlankStr(res.data);
        
      });
    },
    // 申请审批完成时调用
    // loadDetailApply() {
    //   getQuotaApplyInfo({ docEntry: this.docentry }).then((res) => {
    //     if(res.data) {
    //       this.formData = res.data;
    //       // this.formData = this.initAllStatus(res.data);
    //       this.oldFormData = JSON.parse(JSON.stringify(this.formData));
    //       this.loadOaStatus();
    //       this.setBtnStatus();
    //     }
    //     // this.formData = this.removeBlankStr(res.data);
        
    //   });
    // },
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
    //     let fileList = [];
    //     fileList[0] = fileItem;
    //     let tempForm = {
    //       docEntry: this.formData.docEntry,
    //       isNo: this.formData.isNo,
    //       fileItems: fileList,
    //     };
    //     updateFile(tempForm).then((res) => {
    //     });
    //     return;
    //   }
    // },
    goodsItemColl(index) {
      if (index || index === 0) {
        this.heightIndex = "20px";
        this.heightIndex = Number(this.heightIndex.replace(/px/g, ""))*index + 'px'
        this.goodsItemActIndex = index;
      }
    },
  },
  setup() {
    provide("title", "授信额度申请详情");
  },
};
</script>

<style scoped lang="less">
::v-deep {
  .scroll-wrap-main-table {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc( 100% - 3.7rem);
    overflow: auto;
  }
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
  // height: calc(100vh - 137.93px + 47.95px);
  height: calc(100vh - 137.93px);
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
