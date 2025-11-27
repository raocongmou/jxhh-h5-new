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

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnSapShow"
        @click="mainBtnClickSap"
        >提交SAP</van-button
      >
    </div>
    <Scroll class="wrapper">
      <van-tabs v-model:active="tabActive" class="magin-top:20px">
        <van-tab title="主表信息">
          <!-- <Scroll
          class="wrapper"
          :pullup="pullup"
          :elementChangeFlag="elementChangeFlag"
        > -->
          <van-form @submit="onSubmit">
            <van-field
              v-model="computedOrgCo"
              name="平台公司"
              label="平台公司"
              label-width="68"
              readonly
              required
              placeholder="平台公司"
            />
            <!-- 销售合同号、版本 -->
            <van-row>
              <van-col span="16">
                <van-field
                  v-model="formData.applyNo"
                  readonly
                  required
                  label-width="85"
                  name="申请单号"
                  label="申请单号"
                  placeholder="申请单号"
                />
              </van-col>
            </van-row>
            <!-- 部门、业务员 -->
            <van-row>
              <van-col span="10">
                <van-field
                  readonly
                  v-model="formData.orgName"
                  label-width="35"
                  name="部门"
                  label="部门"
                  required
                  placeholder="部门"
              /></van-col>

              <van-col span="14">
                <van-field
                  readonly
                  required
                  is-link
                  label-width="51"
                  v-model="formData.employeeName"
                  name="业务员"
                  label="业务员"
                  placeholder="业务员"
                  @click="mainSelecteEmployee()"
                />
              </van-col>
            </van-row>
            <!-- 客户名称 -->
            <van-row>
              <van-col span="24">
                <van-field
                  required
                  label-width="68"
                  v-model="formData.custName"
                  name="客户名称"
                  label="客户名称"
                  is-link
                  readonly
                  placeholder="客户名称"
                  @click="mainSelectVendor()"
                />
              </van-col>
            </van-row>

            <!-- 审批状态、执行状态-->
            <van-row>
              <van-col span="12">
                <van-field
                  v-model="formData.auditStatusName"
                  readonly
                  label-width="68"
                  name="审批状态"
                  label="审批状态"
                  placeholder="审批状态"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.isStatus"
                  readonly
                  name="执行状态"
                  label="执行状态"
                  label-width="68"
                />
              </van-col>
            </van-row>

            <!-- 币种、金额-->
            <van-row>
              <van-col span="10">
                <van-field
                  required
                  readonly
                  is-link
                  label-width="34"
                  v-model="formData.currency"
                  name="币种"
                  label="币种"
                  placeholder=""
                  @click="mainFieldClick('currencyCode')"
              /></van-col>
              <van-col span="14">
                <van-field
                  label-width="68"
                  v-model="formData.quotaType"
                  name="额度类型"
                  label="额度类型"
                  input-align="right"
                  readonly
                />
              </van-col>
            </van-row>

            <van-field
              v-model="formData.applyQuota"
              label-width="85"
              required
              input-align="right"
              name="申请金额"
              label="申请金额"
              @change="changePreProPortion()"
            />

            <!-- 贸易方式、合同类型-->
            <!-- 收款方式-->

            <van-field
              v-model="formData.currentAmount"
              label-width="200"
              required
              input-align="right"
              name="当前在手订单金额"
              label="当前在手订单金额"
              @change="changePreProPortion()"
            />
            <van-field
              v-model="formData.currentYsYe"
              label-width="185"
              required
              input-align="right"
              name="当前应收款余额"
              label="当前应收款余额"
              @change="changePreProPortion()"
            />

            <van-field
              v-model="formData.applyQuota"
              label-width="85"
              required
              input-align="right"
              name="申请金额"
              label="申请金额"
              @change="changePreProPortion()"
            />

            <van-field
              v-model="formData.productName"
              label-width="100"
              required
              input-align="right"
              name="出口商品名称"
              label="出口商品名称"
              @change="changePreProPortion()"
            />

            <van-field
              v-model="formData.inputDate"
              label-width="85"
              required
              input-align="right"
              name="制单日期"
              label="制单日期"
              @change="changePreProPortion()"
            />

            <div v-show="divEmpty" class="empty"></div>
          </van-form>
          <!-- </Scroll> -->
        </van-tab>

        <!-- <ScrollFirst class="wrapper1"> -->
        <van-tab title="客户信息">
          <van-form @submit="onSubmit">
            <van-field
              required
              label-width="68"
              v-model="formData.custName"
              name="客户名称"
              label="客户名称"
              is-link
              readonly
              placeholder="客户名称"
              @click="mainSelectVendor()"
            />

            <van-field
              v-model="formData.custArea"
              readonly
              
              label-width="88"
              name="客户国家地区"
              label="客户国家地区"
              placeholder="客户国家地区"
            />
            <van-field
              v-model="formData.custAddr"
              readonly
              type="textarea"
              label-width="68"
              name="客户详细地址"
              label="客户详细地址"
              placeholder="客户详细地址"
            />

            <van-field
              v-model="formData.lastZb"
              label-width="85"
              required
              input-align="right"
              name="上年总资产"
              label="上年总资产"
              @change="changePreProPortion()"
            />
            <van-field
              v-model="formData.zbFzRate"
              label-width="200"
              required
              input-align="right"
              name="资产负债率"
              label="资产负债率"
              @change="changePreProPortion()"
            />
            <van-field
              v-model="formData.lastProfit"
              label-width="185"
              required
              input-align="right"
              name="上年净利润"
              label="上年净利润"
              @change="changePreProPortion()"
            />

            <van-field
              v-model="formData.ifYyq"
              label-width="85"
              required
              input-align="right"
              name="是否有逾期"
              label="是否有逾期"
              @change="changePreProPortion()"
            />

            <van-field
              v-model="formData.xyPeriod"
              label-width="100"
              required
              input-align="right"
              name="信用期限"
              label="信用期限"
              @change="changePreProPortion()"
            />

            <van-field
              v-model="formData.payType"
              label-width="85"
              required
              input-align="right"
              name="合同支付方式"
              label="合同支付方式"
              @change="changePreProPortion()"
            />

            <div v-show="divEmpty" class="empty"></div>
          </van-form>
        </van-tab>
        <!-- </ScrollFirst> -->
      </van-tabs>
    </Scroll>
    <!-- </Scroll> -->
    <!-- 侧滑窗口 选择 往来单位 -->
    <van-popup
      v-model:show="showVendorSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpVendorSelect
        :employeeNo="employeeNoVendor"
        v-on="{ selectVendorItem: selectVendorItem }"
      />
    </van-popup>
    <!-- 侧滑窗口 选择 业务员-->
    <van-popup
      v-model:show="showEmploeeySelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpEmployeeSelect v-on="{ selectEmployeeItem: selectEmployeeItem }" />
    </van-popup>
    <!-- 侧滑窗口，选择明细的商品 -->
    <van-popup
      v-model:show="showItemPdtSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpProductSelect
        :orgNo="orgNo"
        v-on="{ selectItemProduct: selectItemProduct }"
      ></ErpProductSelect>
    </van-popup>

    <!-- 下滑弹窗 主要是一些配置项 -->
    <van-action-sheet
      ref="actionSheet"
      v-model:show="actionShow"
      :actions="actionItems"
      :click-overlay="onOver"
      @select="selectItemAction"
      :description="actionDesc"
      :close-on-click-overlay="overlay"
      cancel-text="取消"
    />
    <!-- 时间选择 -->
    <van-calendar v-model:show="selectTimeShow" @confirm="selectDateTime" />
    <!-- <van-area title="选择地区" :area-list="areaList" :columns-num="2" /> -->

    <van-dialog
      v-model:show="isNoInputShow"
      title="生成的销售合同号(可修改)"
      @confirm="confirmIsNo()"
    >
      <van-field label="销售合同号:" v-model="tempIsNo"></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";

import ErpVendorSelect from "@/components/ErpVendor.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
//import ErpFile from "@/components/ErpFile.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { detail, save, update } from "@/api/erp.quota.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload } from "@/api/erp.file.js";

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
  name: "QuotaDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    //ErpFile,
  },
  data() {
    return {
      docentry: null,
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      genarareForm: {
        objectNo: "PM03",
        orgCoNo: "",
      },
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
      tempIsNo: "",
      orgList: [],
      tredeTypeList: [],
      saleTypeList: [],
      recTypeList: [],
      orderModeList: [{ name: "格式合同" }, { name: "非格式合同" }],
      recMethodList: [],
      currencyCodeList: [],
      fileItems: [],
    };
  },
  created() {
    console.log("Create方法");
    this.docentry = this.$route.query.docEntry;

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
    if (this.docentry && this.docentry > 0) {
      this.loadDetail();
    } else {
      this.addOrder();
    }
    this.setBtnStatus();
    // console.log('zzzzzzzzzzzzzzzzzzzzzz',getTredeType())
  },

  setup() {
    console.log("setup 生命周期");
    provide("title", "授信额度详情");
  },
  mounted() {
    // 刷新的时候 会进入进入这个生命周期
    console.log("生命周期mounted");
    this.setBtnStatus();
  },
  updated() {},
  methods: {
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
      ///console.log("当前切换了新的平台公司zzzzzzzzzzzzzzzzzzzz");
      this.$router.go(-1); //返回上一层
    },
    /// 弹窗中用户选择了某一个业务员，并且做了修改
    doChangeEmployee() {
      this.formData.items = [];
      this.formData.vendorName = "";
      this.formData.vendorNo = "";
    },
    /// 弹窗中用户选择了某一个业务员，并且做了修改
    selectEmployeeItem(item) {
      console.log("从选项中选择了业务员", item);
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
            this.doChangeEmployee();
          })
          .catch((res) => {
            console.log("zzzzzZ");
          });
      }
      this.showEmploeeySelect = false;
    },
    /// form表单中触发  选择业务员的按钮
    mainSelecteEmployee() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      console.log("选择业务员");
      this.showEmploeeySelect = true;
    },
    /// 弹窗中用户选择了某一个往来单位
    selectVendorItem(item) {
      console.log("从选项中选择了", item);
      this.showVendorSelect = false;
      this.formData.vendorName = item.coNameE;
      this.formData.vendorNo = item.vendorNo1;
      ///往来单位的 数据 需要处理进 联系信息中

      for (let i = 0; i < this.formData.contactItems.length; i++) {
        if (this.formData.contactItems[i].controlA === "V") {
          this.formData.contactItems[i].addr = item.addr2;
          this.formData.contactItems[i].city = item.city;
          this.formData.contactItems[i].zipCode = item.zipCode;
          this.formData.contactItems[i].title = item.title;
          this.formData.contactItems[i].contact = item.contact;
          this.formData.contactItems[i].fax = item.fax;
          this.formData.contactItems[i].email = item.email;
          this.formData.contactItems[i].addr = item.addr2;
        }
      }
    },
    // form表单中触发  选择往来单位的按钮
    mainSelectVendor() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      //
      this.employeeNoVendor = this.formData.employeeNo;
      console.log("调用者", this.employeeNoVendor);
      if (
        !this.employeeNoVendor ||
        this.employeeNoVendor === "" ||
        this.employeeNoVendor === undefined
      ) {
        Notify({ type: "danger", message: "请先选择业务员" });
        return;
      }

      // 选择往来单位
      console.log("选择往来单位");
      this.showVendorSelect = true;
    },
    /// 选择了某一个时间
    selectDateTime(val) {
      if (this.activeFormFiled === "msd") {
        this.formData.msd = dateFormat(val);
      } else if (this.activeFormFiled === "prepayDateTime") {
        this.formData.prepayDateTime = dateFormat(val);
      } else if (this.activeFormFiled === "signDate") {
        this.formData.signDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    //// 时间字段 点击了
    dateTimeFieldClick(item) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    ///  选择 下拉的逻辑
    selectItemAction(item) {
      //console.log("点击了选项", item, "活跃的字段", this.activeFormFiled);
      if (this.activeFormFiled === "tradType") {
        this.formData.tradType = item.code;
      } else if (this.activeFormFiled === "saleType") {
        this.formData.saleType = item.code;
      } else if (this.activeFormFiled === "orderMode") {
        this.formData.orderMode = item.name;
      } else if (this.activeFormFiled === "payMode") {
        this.formData.payMode = item.name;
      } else if (this.activeFormFiled === "outType") {
        this.formData.outType = item.name;
      } else if (this.activeFormFiled === "currencyCode") {
        this.formData.currencyCode = item.code;
      }
      this.actionShow = false;
      this.activeFormFiled = "";
    },
    /////主表选择了一些枚举类型的数据，下方弹窗
    mainFieldClick(fieldName) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      (this.activeFormFiled = fieldName),
        // 根据 当前字段 重置 reset
        this.resetActionItems(fieldName);
      console.log("点击了", fieldName);
      this.actionShow = true;
    },
    /// 主表的枚举项处理
    resetActionItems(filedName) {
      this.actionItems = [];
      console.log("这里需要根据活跃的字段重置选择框的可选项", filedName);
      if (filedName === null || filedName === "") {
        return;
      }
      if (filedName === "tradType") {
        this.actionDesc = "请选择贸易方式";
        for (let index = 0; index < this.tredeTypeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.tredeTypeList[index].tradeType;
          item.code = this.tredeTypeList[index].tradeTypeNo;
          this.actionItems[index] = item;
        }
      } else if (filedName === "orderMode") {
        this.actionDesc = "请选择合同类型";
        this.actionItems.push(...this.orderModeList);
      } else if (filedName === "saleType") {
        this.actionDesc = "请选择销售类型";
        for (let index = 0; index < this.saleTypeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.saleTypeList[index].refValue;
          item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      } else if (filedName === "payMode") {
        this.actionDesc = "请选择收款模式";
        for (let index = 0; index < this.recTypeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.recTypeList[index].refValue;
          /// item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      } else if (filedName === "outType") {
        this.actionDesc = "请选择收款方式";
        for (let index = 0; index < this.recMethodList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.recMethodList[index].refValue;
          /// item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      } else if (filedName === "currencyCode") {
        this.actionDesc = "请选择币种";
        for (let index = 0; index < this.currencyCodeList.length; index++) {
          let item = { name: "", code: "" };
          item.name =
            this.currencyCodeList[index].currencyName +
            "-" +
            this.currencyCodeList[index].currencyCode;
          item.code = this.currencyCodeList[index].currencyCode;
          /// item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      }
    },

    //////   当前详情是否可以修改
    getOrderCanEdit() {
      let docEntry = this.formData.docEntry;
      if (!docEntry) {
        return 0;
      }

      let auditstatu = this.formData.auditStatu;
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
        console.log("视图进来的，当前只读");
        this.orderReadOnly = true;
        this.btnAddShow = true;
        this.btnSaveShow = false;
        this.btnCancelShow = false;
        /////
        this.btnSapShow = false;
        let auditStatu = this.formData.auditStatu;
        console.log("当前详情的审批状态", auditStatu);
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
        }
      } else if (this.editStatus === "edit") {
        /// 修改状态下，只有删除和保存
        console.log("编辑时刻的附件", this.formData.fileItems);
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

    ////主表新增一个新的单据
    addOrder() {
      console.log("addOrder方法");
      this.tabActive = 0;
      this.formData = {};

      this.formData.docVersion = 1;
      this.formData.fileItems = [];
      //   this.formData.fileItems = fieldFormData().formData.fileItems;
      this.fileItems.splice(0, 0);

      this.formData.auditStatu = "S";
      this.formData.auditStatusName = "未申请审批";
      this.formData.signSite = "江西南昌";
      this.formData.signDate = dateFormat(new Date());
      this.formData.saptype = "未提交";

      this.formData.delivery = "";
      this.formData.specs = "";
      this.formData.others = "";
      this.formData.cfmComment = "";
      this.formData.contactItems = [];
      getOrgInfo().then((res) => {
        this.formData.contactItems.push({
          controlA: "B",
          addr: res.addr,
          addrE: res.addrE,
          zipCode: res.zipCode,
        });
      });

      this.formData.contactItems.push({ controlA: "V" });
      this.formData.items = [];
      this.initAmountFeeList();
      this.formData.transAndFee =
        "运输方式及费用由供方负责，供方负责将货物按时运抵需方指定收货地点，其后货物毁损灭失等风险由需方承担。";
      this.formData.packageDesc = "包装物不回收。";
      this.formData.cfmComment = "符合国家标准或企业标准";
      this.formData.currencyCode = "RMB";
      this.formData.tradType = "N";
      this.formData.orderMode = "格式合同";

      this.formData.orgCoNo = getDefaultOrgCoNo();
      this.formData.preProportion = 0.0;
      this.formData.preSum = 0.0;
      this.editStatus = "add";

      this.setBtnStatus();
    },

    ///重新加载所有的数据
    loadDetail() {
      detail({ docEntry: this.docentry }).then((res) => {
        this.formData = res.data;
        this.fileItems = this.formData.fileItems;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.setBtnStatus();
      });
    },

    //// 选择商品名称
    itemSelectPdt(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      console.log("明细项目", index);
      this.activePdtItemIndex = index;

      this.orgNo = this.formData.orgNo;
      if (!this.orgNo) {
        return;
      }
      this.showItemPdtSelect = true;
    },
    /// 弹窗中用户选择了某一个商品
    selectItemProduct(item) {
      if (this.activePdtItemIndex === -1) {
        console.log("选择了商品,新增", item);
        let newRow = {
          pdtNo1: item.pdtNo1,
          pdtNameC: item.pdtNameC,
          sapUnit: item.sapunit,
          sapUnitRate: item.sapunitrate,
          uom: item.uOM,
          hl: item.hl,
          quantity: 0.0,
          unitPrice: 0.0,
          amount: 0.0,
        };
        this.formData.items.push(newRow);
        this.pdtItemsActiveIndex = this.formData.items.length - 1;
        //        console.info("this.formData.items.length", this.formData.items.length);
      } else {
        this.formData.items[this.activePdtItemIndex].pdtNo1 = item.pdtNo1;
        this.formData.items[this.activePdtItemIndex].pdtNameC = item.pdtNameC;
        this.formData.items[this.activePdtItemIndex].uom = item.uOM;
        this.formData.items[this.activePdtItemIndex].sapUnit = item.sapunit;
        this.formData.items[this.activePdtItemIndex].sapUnitRate =
          item.sapunitrate;
        this.formData.items[this.activePdtItemIndex].hl = item.hl;
        this.formData.items[this.activePdtItemIndex].quantity = 0.0;
        this.formData.items[this.activePdtItemIndex].unitPrice = 0.0;
        this.formData.items[this.activePdtItemIndex].amount = 0.0;
      }

      this.showItemPdtSelect = false;
    },
    ///   新增商品信息
    handleAddPdtItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      ///       先要选择商品
      this.orgNo = this.formData.orgNo;
      if (!this.orgNo) {
        Notify({ type: "danger", message: "请先选择部门及业务员信息" });
        return;
      }

      this.showItemPdtSelect = true;
      this.activePdtItemIndex = -1;
    },
    /// 撤销所有商品的操作
    handleCancelPdtAction() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (this.oldFormData) {
        // 需要判断
        Dialog.confirm({
          title: "取消所有的商品操作",
          message: "当前操作将不会保存您对商品的修改!",
        })
          .then(() => {
            this.formData.items = JSON.parse(
              JSON.stringify(this.oldFormData.items)
            );
            this.pdtItemsActiveIndex = 0;
          })
          .catch(() => {
            console.log("取消");
          });
      }
    },

    ////  成本分析数据的初始化
    initAmountFeeList() {
      this.formData.objectItems = [];
      this.formData.objectItems.push({
        objName: "运费",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "保险费",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "佣金",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "折扣",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "其他",
        objField: "otherfee",
        objValue: 0.0,
      });

      this.formData.objectItems.push({
        objName: "预付银行利息",
        objField: "finf",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "应收银行利息",
        objField: "finf",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "承兑贴息",
        objField: "finf",
        objValue: 0.0,
      });
    },

    mainBtnClickAdd() {
      this.addOrder();
      console.log("zzzz 新增");
    },
    mainBtnClickEdit() {
      let canEdit = this.getOrderCanEdit();
      if (canEdit) {
        this.editStatus = "edit";
        this.setBtnStatus();
      }

      console.log("zzzz 修改");
    },
    mainBtnClickDelete() {
      console.log("zzzz 删除");
    },
    /////保存之前的操作 数据校验
    checkSaveFormData() {
      /// 业务员判断
      let temp = this.formData.employeeNo;
      if (!temp) {
        Notify({ type: "warning", message: "业务员尚未录入!" });
        return 0;
      }
      /// 往来单位
      temp = this.formData.vendorNo;
      if (!temp) {
        Notify({ type: "warning", message: "往来单位尚未录入!" });
        return 0;
      }
      /// 币种
      temp = this.formData.currencyCode;
      if (!temp) {
        Notify({ type: "warning", message: "币种尚未录入!" });
        return 0;
      }
      //贸易方式
      temp = this.formData.tradType;
      if (!temp) {
        Notify({ type: "warning", message: "贸易方式尚未录入!" });
        return 0;
      }
      //合同类型
      temp = this.formData.orderMode;
      if (!temp) {
        Notify({ type: "warning", message: "合同类型尚未选择!" });
        return 0;
      }
      ////销售类型
      temp = this.formData.saleType;
      if (!temp) {
        Notify({ type: "warning", message: "销售类型尚未选择!" });
        return 0;
      }
      temp = this.formData.outType;
      if (!temp) {
        Notify({ type: "warning", message: "收款方式尚未选择!" });
        return 0;
      }
      temp = this.formData.payMode;
      if (!temp) {
        Notify({ type: "warning", message: "收款模式尚未选择!" });
        return 0;
      }
      temp = this.formData.msd;
      if (!temp) {
        Notify({ type: "warning", message: "最迟交货期尚未选择!" });
        return 0;
      }
      ///明细必须有
      if (!this.formData.items || this.formData.items.length == 0) {
        Notify({ type: "warning", message: "尚未录入商品明细!" });
        return 0;
      }
      //  对明细进行验证
      for (let index = 0; index < this.formData.items.length; index++) {
        const itemPdt = this.formData.items[index];
        if (!itemPdt.pdtNo1) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细尚未选择销售商品!`,
          });
          return 0;
        }
        console.log("zzzzz", itemPdt.quantity);
        if (!itemPdt.quantity || Number(itemPdt.quantity) <= 0) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细尚未录入数量!`,
          });
          return 0;
        }
        if (!itemPdt.unitPrice || itemPdt.unitPrice <= 0) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细尚未录入单价!`,
          });
          return 0;
        }
      }

      return 1;
    },
    /////保存之前的操作
    beforeDoSave() {
      let check = this.checkSaveFormData();
      if (!check) {
        return 0;
      }
      this.sendFomData = this.formData;
      var splitCode = ",";
      let tempvar = this.sendFomData.quantity;
      if (tempvar.includes(splitCode)) {
        tempvar = tempvar.replace(splitCode, "");
      }
      this.sendFomData.quantity = tempvar.replace(splitCode, "");
      console.log("提交之前", tempvar, tempvar.replace(splitCode, ""));
      return 1;
    },
    mainBtnClickSave() {
      //console.log("zzzz 保存");
      let check = this.beforeDoSave();
      if (!check) {
        return;
      }
      console.log("提交保存更新之前", this.sendFomData);
      if (this.sendFomData.docEntry) {
        update(this.sendFomData)
          .then((res) => {
            this.doAfterSave(res);
          })
          .catch((res) => {
            Notify({
              type: "error",
              message: "更新销售合同错误：" + res.message,
            });
          });
        return;
      }
      this.doInsertIeInlandSale();
    },
    ///// 保存之后的操作
    doAfterSave(res) {
      if (res) {
        this.formData = res.data;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.sendFomData = {};
        this.editStatus = "view";
        this.setBtnStatus();
        return;
      } else {
        Notify({
          type: "error",
          message: "保存销售合同出错",
        });
      }
    },
    //// 实际上是insert 的操作
    doInsertIeInlandSale() {
      this.genarareForm.orgCoNo = getDefaultOrgCoNo();
      genarateDocNo(this.genarareForm)
        .then((res) => {
          console.log("创建销售合同号", res);
          this.tempIsNo = res.data;
          this.isNoInputShow = true;
        })
        .catch((res) => {
          Notify({
            type: "error",
            message: "创建销售合同号错误：" + res.message,
          });
          return;
        });
    },
    /////用户确认了销售合同号  insert 逻辑的延续
    confirmIsNo() {
      this.sendFomData.isNo = this.tempIsNo;
      save(this.sendFomData)
        .then((res) => {
          this.doAfterSave(res);
        })
        .catch((res) => {
          Notify({ type: "error", message: "保存单据出错:" + res.message });
        });
    },
    mainBtnClickAudit() {
      console.log("zzzz 提交审批");
    },
    mainBtnClickCancelAudit() {
      console.log("zzzz,撤销审批");
    },
    mainBtnClickSap() {
      console.log("zzzz 提交审批");
    },
    //实际的取消操作
    doCancelOrder() {
      console.log("取消");
      if (this.oldFormData.docEntry) {
        this.formData = this.oldFormData;
        this.orderReadOnly = true;
        this.editStatus = "view";
        this.setBtnStatus();
      } else {
        this.formData = {};
      }
    },
    //点击取消按钮
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
    // 删除明细
    deletePdtItem(index) {
      Dialog.confirm({
        title: "提示",
        message: "确认删除当前商品吗?",
      })
        .then(() => {
          this.doDeletePdtItem(index);
        })
        .catch(() => {
          console.log("取消删除商品");
        });
    },

    doDeletePdtItem(index) {
      console.log("实际删除", index);
      if (this.formData.items[index].isMid) {
        // 是原有的
        console.log("删除一个实际上存在的对象");
      }
      this.formData.items.splice(this.formData.items[index], 1);
      this.computeAllQuantiy();
      this.computeAllAmount();
    },

    changePdtItemNum(index, changeField) {
      console.log("变化的商品行", index, changeField);
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
          console.log("销售金额存在的情况下", amount, sapPrice);
          this.formData.items[index].sapQtty = amount / sapPrice;
          this.formData.items[index].quantity =
            amount / (sapPrice / Number(sapUnitRate));
          console.log("sap单价修改");
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
        console.log("预收款比列", totalIsValue, rate);
        this.formData.preSum = (totalIsValue * rate) / 100;
      }
    },
    /// 重新计算主表的总数量
    computeAllQuantiy() {
      let quantity = 0;
      for (let index = 0; index < this.formData.items.length; index++) {
        const element = this.formData.items[index];
        console.log("计算总数量-", index, element.quantity);

        if (element && element.quantity) {
          quantity = quantity + Number(element.quantity);
        }
      }
      console.log("计算总数量-", quantity);
      this.formData.quantity = quantity;
    },
    ///  重新计算主表的总金额
    computeAllAmount() {
      let amount = 0;
      for (let index = 0; index < this.formData.items.length; index++) {
        const element = this.formData.items[index];
        console.log("计算总金额-", index, element.amount);
        if (element && element.amount) {
          amount = amount + Number(element.amount);
        }
      }
      this.formData.totalIsValue = amount;
      this.changePreProPortion();
    },

    uploadFile(file) {
      //文件读取完毕。执行 上传文件的操作
      console.log("文件选择完成-", file);
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
          }
        })
        .catch();
    },
  },

  computed: {
    ///// 计算平台名称
    computedOrgCo: function () {
      let orgCono = this.formData.orgCoNo;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
          return this.orgList[i].orgAbbrName;
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

    ///// 计算销售方式
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
};
</script>

<style scoped lang="less">
::v-deep {
  .van-tab--active {
    color: #1fa2e8;
    font-weight: 900;
    //background-color: darkseagreen;
  }
}
.empty {
  background: transparent;
  height: 1000px;
}
.percent {
  height: 100%;
  padding-top: 10px;
  font-size: 14px;
  background: #fff;
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
.wrapper {
  background-color: #eeeeee;
  height: calc(100vh - 151.47px);
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
        span {
        }
      }
    }
  }
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
.wrapper1 {
  background-color: #eeeeee;
  height: 100px;
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
        span {
        }
      }
    }
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
      //margin-bottom: 10px;
      //margin-top: 5px;
    }
  }
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
// .van-cell {
//     position: relative;
//     display: -webkit-box;
//     display: -webkit-flex;
//     display: flex;
//     box-sizing: border-box;
//     width: 100%;
//     padding: 0.2rem 0.3rem;
//     overflow: hidden;
//     color: #323233;
//     font-size: 0.37333rem;
//     line-height: 0.64rem;
//     background-color: #fff;
// }

// .van-field__label {
//     -webkit-box-flex: 0;
//     -webkit-flex: none;
//     flex: none;
//     box-sizing: border-box;
//     width: 5.2em;
//     margin-right: 0.12rem;
//     color: #646566;
//     text-align: left;
//     word-wrap: break-word;
// }
</style>
