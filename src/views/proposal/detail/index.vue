<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <div class="tools-bar">
      <van-button
        v-show="btnShow.save"
        size="small"
        class="tools-bar-button"
        type="success"
        @click="mainBtnClickSave"
        >保存</van-button
      >
      <!-- @touchstart="handleUpdate" -->
      <van-button
        v-show="btnShow.cancel"
        size="small"
        class="tools-bar-button"
        type="warning"
        color="#e8c048"
        @click="mainBtnClickCancel"
        >取消</van-button
      >
      <van-button
        v-show="btnShow.add"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        @click="mainBtnClickAdd"
        >新增</van-button
      >
      <van-button
        v-show="btnShow.edit"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="editStatus === 'view'"
        @click="mainBtnClickEdit"
        >修改</van-button
      >
      <van-button
        v-show="btnShow.delete"
        size="small"
        class="tools-bar-button"
        type="danger"
        color="#e85452"
        @click="mainBtnClickDelete"
        >删除</van-button
      >

      <!-- <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnShow.applyAudit"
        color="#1fa2e8"
        @click="mainBtnClickAudit"
        >提交审批</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnShow.cancelAudit"
        color="#e8c048"
        @click="mainBtnClickCancelAudit"
        >撤销审批</van-button
      > -->
    </div>

    <van-tabs v-model:active="activeTabIndex" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form>
            <!-- <van-form @submit="onSubmit"> -->
            <van-field
              v-model="computedOrgCo"
              name="平台公司"
              label="平台公司"
              label-width="85"
              readonly
              required
              placeholder="平台公司"
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
              label-width="85"
              v-model="formData.empName"
              name="制单人"
              label="制单人"
              placeholder="系统生成，无需录入"
              readonly
            />
            <van-field
              label-width="85"
              v-model="formData.poDate"
              name="制单日期"
              label="制单日期"
              placeholder="系统生成，无需录入"
              readonly
            />
            <van-field
              v-model="formData.poNo"
              readonly
              required
              label-width="85"
              name="询价单号"
              label="询价单号"
              placeholder="系统生成，无需录入"
            />
            <van-field
              readonly
              required
              is-link
              label-width="85"
              v-model="formData.employeeName"
              name="业务员"
              label="业务员"
              placeholder="请选择业务员"
              @click="mainSelecteEmployee()"
            />
            <van-field
              readonly
              v-model="formData.orgName"
              label-width="85"
              name="部门"
              label="部门"
              required
              placeholder="自动带出，无需录入"
            />
            <van-field
              label-width="85"
              v-model="formData.vendorName"
              name="客户"
              label="客户"
              is-link
              readonly
              placeholder="请选择客户"
              @click="mainSelectVendor()"
            />
            <!-- v-model="computedTrade" -->
            <!-- <van-field
              v-model="formData.orderType"
              is-link
              readonly
              label-width="85"
              name="贸易方式"
              label="贸易方式"
              placeholder="请选择贸易方式"
              @click="mainFieldClick('orderType')"
            /> -->
            <RcmSelect
              :select-label="'refValue'"
              :select-value="'refValueCode'"
              :valueKey="'refValue'"
              :options="orderTypeList"
              :label="'贸易方式'"
              :placeholder="'贸易方式'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.ordTypNo" 
              @change="({label, value}) => changeRcmSelect({label, value}, 'orderType', 'ordTypNo')"
            />
            <van-field
              v-model="formData.payMode"
              is-link
              readonly
              label-width="85"
              name="结算方式"
              label="结算方式"
              placeholder="请选择结算方式"
              @click="mainFieldClick('payMode')"
            />
            <RcmSelect
              :select-label="'currencyName'"
              :select-value="'currencyCode'"
              :valueKey="'currencyName'"
              :options="currencyCodeList"
              :label="'币种'"
              :placeholder="'币别'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.currencyCode"
              @change="({label, value}) => changeRcmSelect({label, value}, 'currencyCode')"
            />
            <van-field
              label-width="85"
              v-model="formData.exchRate"
              name="汇率"
              label="汇率"
              type="number"
              :readonly="orderReadOnly"
              placeholder="请输入汇率"
            />
            <RcmSelect
              :select-label="'text'"
              :select-value="'id'"
              :valueKey="'text'"
              :options="soTypeList"
              :label="'是否提交'"
              :placeholder="'是否提交'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.soType"
              @change="({label, value}) => changeRcmSelect({label, value}, 'soType')"
            />
            <van-field
              v-model="formData.payDetail"
              name="账期"
              label-width="85"
              type="number"
              label="账期"
              placeholder="请输入账期"
            />
            <van-field
              type="textarea"
              autosize
              rows="1"
              label-width="85"
              placeholder="请输入备注"
              v-model="formData.remark"
              name="备注"
              label="备注"
              :readonly="orderReadOnly"
            />
            <!-- xiugai -->
            <!-- <van-field
              v-model="formData.refNo"
              label-width="85"
              name="客户合同号"
              label="客户合同号"
              placeholder="请输入客户合同号"
            /> -->
            <!-- <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="statusList"
              :label="'执行状态'"
              :placeholder="'执行状态'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.poStatus"
              @change="({label, value}) => changeRcmSelect({label, value}, 'poStatus')"
            /> -->
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="商品信息">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelPdtAction()"
              style="magin-right: 10px"
              >撤销所有商品操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddPdtItem"
              style="magin-right: 10px"
              >新增商品</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddEmpty"
              style="magin-right: 10px"
              >新增商品空行</van-button
            >
          </div>
          <!-- 商品明细 -->
          <van-collapse
            v-model="pdtItemsActiveIndex"
            accordion
            @change="goodsItemColl"
          >
            <Scroll
              class="wrappers-goods-detail wrappers"
              wrapper="goodsDetailRef"
              v-if="formData.items.length"
              ref="goodsDetail"
            >
              <div>
                <van-collapse-item
                  v-for="(item, index) in formData.items"
                  :key="index"
                  :name="index"
                  :title="formData.items.length > 1 ? (index + 1 + '.' + item.prodName) : item.prodName"
                >
                  <van-form label-width="130">
                    <van-field
                      is-link
                      required
                      v-model="item.prodName"
                      :readonly="orderReadOnly"
                      name="商品名称"
                      label="商品名称"
                      placeholder="商品名称"
                    />
                      <!-- @click="itemSelectPdt(index)" -->

                    <van-field
                      v-model="item.specification"
                      :readonly="orderReadOnly"
                      name="规格"
                      label="规格"
                      placeholder="规格"
                    />

                    <!-- type="number" -->
                    <van-field
                      v-model="item.packageDesc"
                      :readonly="orderReadOnly"
                      name="包装"
                      label="包装"
                      placeholder="包装"
                    />
                    <!-- <van-field
                      v-model="item.uom"
                      :readonly="orderReadOnly"
                      required
                      name="单位"
                      label="单位"
                      placeholder="单位"
                    /> -->
                    <RcmSelect
                      :select-label="'refValue'"
                      :select-value="'refValueCode'"
                      :valueKey="'refValue'"
                      :options="uomList"
                      :label="'单位'"
                      :placeholder="'单位'"
                      :readonly="orderReadOnly"
                      :isRightArrow="true"
                      :field="item.uom"
                      @change="({label, value}) => changeRcmSelectItem({label, value}, index, 'uom')"
                    />
                    <van-field
                      v-model="item.quantity"
                      border
                      type="number"
                      :readonly="orderReadOnly"
                      name="数量"
                      label="数量"
                      placeholder="数量"
                    />
                    <van-field
                      v-model="item.unitCost"
                      type="number"
                      :readonly="orderReadOnly"
                      name="意向价格"
                      label="意向价格"
                      placeholder="意向价格"
                    />

                    <van-field
                      v-model="item.deliveryPlace"
                      :readonly="orderReadOnly"
                      name="送达地点"
                      label="送达地点"
                      placeholder="送达地点"
                    />
                    <van-field
                      v-model="item.deliveryDate"
                      name="最晚到货时间"
                      label="最晚到货时间"
                      placeholder="请选择最晚到货时间"
                      readonly
                      is-link
                      @click="dateTimeFieldClick('deliveryDate', index)"
                    />
                    <van-field
                      v-model="item.vendor"
                      :readonly="orderReadOnly"
                      name="货源"
                      label="货源"
                      placeholder="货源"
                    />
                    <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="ckwtsList"
                      :label="'提供出口委托书'"
                      :placeholder="'提供出口委托书'"
                      :readonly="orderReadOnly"
                      :isRightArrow="true"
                      :field="item.ckWts"
                      @change="({label, value}) => changeRcmSelectItem({label, value}, index, 'ckWts')"
                    />
                    <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="wbList"
                      :label="'提从危包'"
                      :placeholder="'提从危包'"
                      :readonly="orderReadOnly"
                      :isRightArrow="true"
                      :field="item.wb"
                      @change="({label, value}) => changeRcmSelectItem({label, value}, index, 'wb')"
                    />
                    <van-field
                      v-model="item.unitStdCost"
                      readonly
                      name="采购价格"
                      label="采购价格"
                      placeholder="采购价格"
                    />
                      <!-- type="number" -->
                    <van-field
                      v-model="item.employeeName"
                      readonly
                      name="采购员"
                      label="采购员"
                      placeholder="采购员"
                    />
                    <van-field
                      v-model="item.offerDate"
                      readonly
                      name="报价日期"
                      label="报价日期"
                      placeholder="报价日期"
                    />

                    <van-field
                      v-model="item.remark"
                      :readonly="orderReadOnly"
                      type="textarea"
                      name="备注"
                      label="备注"
                      placeholder="备注"
                    />

                    <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deletePdtItem(index)"
                        >删除</van-button
                      >
                    </div>
                  </van-form>
                </van-collapse-item>
                <div class="empty"></div>
              </div>
            </Scroll>
          </van-collapse>
        </div>
        <!-- </Scroll> -->
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
              <!-- <template
                  v-for="(item, index) in oaStatusArr"
                  :key="index"
                  :name="index"
                  :title="item.userName"
                >
                  <div class="oa-status-item">
                    <van-form>
                      <van-field
                        v-model="item.sysNote"
                        :label="item.pkId"
                        input-align="right"
                        readonly
                      />
                      <van-field
                        label-width="150"
                        v-model="item.userName"
                        :label="item.makeTime"
                        input-align="right"
                        readonly
                      />

                      <van-field
                        label-width="68"
                        v-model="item.auditStatus"
                        readonly
                        input-align="right"
                        label="审批结论"
                      />

                      <van-field
                        type="textarea"
                        rows="1"
                        disabled
                        autosize
                        label-width="68"
                        v-model="item.auditRemark"
                        readonly
                        name="审批备注"
                        label="审批备注"
                        placeholder=""
                      />
                    </van-form>
                  </div>
                </template> -->
            </div>
          </Scroll>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 侧滑窗口 选择 往来单位 -->
    <van-popup
      v-model:show="showVendorSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpVendorSelect
        :showVendor="showVendorSelect"
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
      <ErpEmployeeSelect
        :showEmployee="showEmploeeySelect"
        v-on="{ selectEmployeeItem: selectEmployeeItem }"
      />
    </van-popup>
    <!-- 侧滑窗口，选择明细的商品 -->
    <van-popup
      v-model:show="showItemPdtSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpProductSelect
        :orgNo="orgNo"
        :showItemPdt="showItemPdtSelect"
        ref="productRef"
        v-on="{ selectItemProduct: selectItemProduct }"
      ></ErpProductSelect>
    </van-popup>

    <!-- 下滑弹窗 主要是一些配置项 -->
    <van-action-sheet
      ref="actionSheet"
      v-model:show="actionShow"
      :actions="actionItems"
      @select="selectItemAction"
      :description="actionDesc"
      cancel-text="取消"
    />

    <van-calendar v-model:show="selectTimeShow" @confirm="selectDateTime" />

    <van-dialog
      v-model:show="orderNoInputShow"
      title="生成的询价单号(可修改)"
      @confirm="confirmOrderNo()"
    >
      <van-field label="询价单号:" v-model="tempOrderNo"></van-field>
    </van-dialog>

    <van-dialog
      v-model:show="cancelAuditShow"
      title="撤销原因"
      @confirm="doCancelApply()"
      show-cancel-button
    >
      <van-field
        type="textarea"
        v-model="cancelAuditReason"
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
import { getTable3XByRef, getExchangeRate } from "@/api/common";
import ErpVendorSelect from "@/components/ErpVendor.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";
import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";
import fieldFormData from "./cloumn";
/// 设置按钮组的逻辑
import setBtnStatus from "./setBtnStatus";
/// 新增单据的时候，给一个默认值
import setDefaultValue from "./setDefaultValue";
/// 按钮说明
import { confirmOrderNo, mainBtnClickSave } from "./mainSaveClickAction";
import {
  deleteOrder,
  applyAuditOrder,
  cancelAuditOrder,
  doCancelAuditOrder,
} from "./mainBtnClickAction";
import { isCanAddItems } from "../methods/common-methods";

import { loadDetail, loadOaStatus } from "./main";
import field from "vant/es/field";

export default {
  name: "ProposalDetail",
  components: {
    NavBar,
    Scroll,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
  },
  watch: {
    activeTabIndex: {
      handler(oldVal, newVal) {
        if (newVal === 0) {
          this.$refs.main.refresh();
        } else if (newVal === 3) {
          this.$refs.file.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      poDate: "",
      // 提供出口委托书
      ckwtsList: [
        {value: "是", label: "是"},
        {value: "否", label: "否"},
      ],
      // 提从危包
      wbList: [
        {value: "是", label: "是"},
        {value: "否", label: "否"},
      ],
      itmerIndex: null,
      soTypeList: [
        { id: 1, text: "是" },
        { id: 0, text: "否" }
      ],
      auditStatusList: JSON.parse(this.$route.query.auditStatusList),
      statusList: JSON.parse(this.$route.query.statusList),
      objectNo: "PM021",
      tileName: "采购询价单详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      initFormData: fieldFormData().formData,
      baseDetail: fieldFormData().baseDetail,
      ///   按钮是否显示
      btnShow: fieldFormData().btnShow,
      ///   默认的状态
      editStatus: "view",
      /// 当前单据 是否只读
      orderReadOnly: true,
      // 后端获取到的单据编号
      tempOrderNo: "",
      //单据编号确认框是否可见
      orderNoInputShow: false,
      // 生成编号的form
      genarareForm: { objectNo: "", orgCoNo: "" },
      /// 取消审批原因框
      cancelAuditReason: "",
      cancelAuditShow: false,

      oaStatusArr: [],

      employeeNoVendor: "",

      /// 当前是哪一个 tab 活跃
      activeTabIndex: 0,
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

      ///   侧滑窗口是否显示
      showVendorSelect: false,
      showEmploeeySelect: false,
      showItemPdtSelect: false,
      ////  时间选择
      selectTimeShow: false,
      ////  站位
      divEmpty: true,

      orgList: [],
      orderTypeList: [],
      saleTypeList: [],
      recTypeList: [
        { name: "款到发货", code: "款到发货" },
        { name: "分批款到发货", code: "分批款到发货" },
        {
          name: "货到付款，需方应在收到货物后30天内付清货款",
          code: "货到付款，需方应在收到货物后30天内付清货款",
        },
      ],
      validateField: [
        { enField: "prodName", cnField: "商品名称" },
        { enField: "uom", cnField: "单位" },
      ],
      recMethodList: [],
      currencyCodeList: JSON.parse(this.$route.query.currencyCodeList),
      fileItems: [],
      uomList: [],
    };
  },
  async created() {
    document.title = this.$route.matched[0].meta.name;
    provide("title", this.tileName);
    this.docentry = this.$route.query.docEntry;
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });
    getTable3XByRef({
      objRef: "UnOMeasTble"
    }).then(res => {
      this.uomList.push(...res.data);
    });
    const orderTypeList = await getTable3XByRef({objRef: "InlandPurchase"})
    this.orderTypeList.push(...orderTypeList.data);
    getSaleType().then((res) => {
      this.saleTypeList.push(...res);
    });
    getRecMethod().then((res) => {
      this.recMethodList.push(...res);
    });
    
    if(!this.docentry) {
      this.addOrder();
    }
    if (this.docentry && this.docentry > 0) {
      this.loadDetail();
    } 
    setBtnStatus(this);
    
  },
  methods: {
    changeRcmSelectItem({ value, label }, index, fieldName) {
      this.formData.items[index][fieldName] = value;
    },
    changeRcmSelect({ value, label }, fieldName, fieldCode) {
      this.formData[fieldName] = value;
      if(fieldName === "currencyCode") {
        getExchangeRate({
          currency1: this.formData.currencyCode,
          currency2: 'CNY',
          currency3: 'CNY',
          applyDate:  dateFormat(new Date(), "yyyy/MM/dd"),
          fangx: 1,
          precision: 8
        }).then((res) => {
          if (res.data) {
            this.formData.exchRate = Number(res.data[0].applyExchrate).toFixed(4);
          }
        })
      }
      if(fieldName === "orderType") {
        this.formData[fieldName] = label;
      }
      if(fieldCode) {
        this.formData[fieldCode] = value;
      }
    },
    ///切换了组织账套
    setChangeNewOrgCo() {
      this.$router.go(-1); //返回上一层
    },

    ///  【新增】按钮点击事件
    mainBtnClickAdd() {
      this.addOrder();
    },
    /// 【保存】按钮的点击事件
    mainBtnClickSave() {
      mainBtnClickSave(this);
    },
    ///  【删除】按钮点击事件
    mainBtnClickDelete() {
      deleteOrder(this);
    },
    ///  【提交审批】按钮点击事件
    mainBtnClickAudit() {
      applyAuditOrder(this);
    },
    ///  【撤销审批】按钮点击事件
    mainBtnClickCancelAudit() {
      cancelAuditOrder(this);
    },
    ///  【修改】按钮点击事件
    mainBtnClickEdit() {
      if (this.editStatus === "view") {
        this.editStatus = "edit";
        setBtnStatus(this);
      }
    },
    //【取消】按钮点击事件
    mainBtnClickCancel() {
      Dialog.confirm({
        title: "取消对单据的操作",
        message: "当前操作将不会保存您对单据的修改!",
      })
        .then(() => {
          if (this.oldFormData.docEntry) {
            console.log("this.oldFormData.docEntry", this.oldFormData.docEntry);
            this.formData = this.oldFormData;
            this.orderReadOnly = true;
            this.editStatus = "view";
            this.loadDetail(this);
            setBtnStatus(this);
          } else {
            // this.formData = {};
            this.$router.go(-1);
          }
        })
        .catch((error) => {
          console.log("点击取消按钮报错", error);
        });
    },

    /***
     *  新增一个单据
     */
    addOrder() {
      this.activeTabIndex = 0;
      this.titleName = "询价单新增";
      setDefaultValue(this);
      console.log("formData.ordTypNo", typeof this.formData.ordTypNo);
      this.editStatus = "add";
      setBtnStatus(this);
    },

    /**
     *  确定了编号 确定之后就直接insert
     */
    confirmOrderNo() {
      confirmOrderNo(this);
    },

    /**
     * 实际做的撤销的操作
     */
    doCancelApply() {
      doCancelAuditOrder(this);
    },
    ///重新加载所有的数据
    loadDetail() {
      loadDetail(this);
    },
    // 获取OA 审批数据
    loadOaStatus() {
      loadOaStatus(this);
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickTab(title) {
      console.log(title);
      if (title === 0) {
        this.$nextTick((_) => {
          this.$refs.main.refresh();
        });
      } else if (title === 3) {
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

    /// form表单中触发  选择业务员的按钮
    mainSelecteEmployee() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      }
      this.showEmploeeySelect = true;
    },
    /// 弹窗中用户选择了某一个业务员，并且做了修改
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
            this.formData.items = [];
            this.formData.vendorName = "";
            this.formData.vendorNo = "";
            this.formData.employeeName = item.userName;
            this.formData.employeeNo = item.userNo;
            this.formData.orgNo = item.orgNo;
            this.formData.orgName = item.orgName;
          })
          .catch((res) => {});
      }
      this.showEmploeeySelect = false;
    },
    // form表单中触发  选择往来单位的按钮
    mainSelectVendor() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      }
      //
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
    /// 弹窗中用户选择了某一个往来单位
    selectVendorItem(item) {
      this.showVendorSelect = false;
      this.formData.vendorName = item.coNameC;
      this.formData.vendorNo = item.vendorNo1;
      this.formData.orgNo = item.orgNo;
      // this.infoForm.orgNo = this.rowVendor.parentOrgNo;
      this.formData.orgName = item.unitName4;
      ///往来单位的 数据 需要处理进 联系信息中
    },

    /// 选择了某一个时间
    selectDateTime(val) {
      if (this.activeFormFiled === "msd") {
        this.formData.msd = dateFormat(val);
      } else if (this.activeFormFiled === "prepayDateTime") {
        this.formData.prepayDateTime = dateFormat(val);
      } else if (this.activeFormFiled === "signDate") {
        this.formData.signDate = dateFormat(val);
      } else if (this.activeFormFiled === "deliveryDate") {
        this.formData.items[this.itmerIndex].deliveryDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    //// 时间字段 点击了
    dateTimeFieldClick(item, index) {
      console.log("index", index);
      this.itmerIndex = index;
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      }
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    ///  选择 下拉的逻辑
    selectItemAction(item) {
      this.formData[this.activeFormFiled] = item.code;
      this.actionShow = false;
      this.activeFormFiled = "";
    },
    /////主表选择了一些枚举类型的数据，下方弹窗
    mainFieldClick(fieldName) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      }
      this.activeFormFiled = fieldName;
      // 根据当前字段重置选择框
      this.resetActionItems(fieldName);
      this.actionShow = true;
    },

    /// 主表的枚举项处理
    resetActionItems(filedName) {
      this.actionItems = [];
      if (filedName === null || filedName === "") {
        return;
      }
      if (filedName === "payMode") {
        this.actionDesc = "请选择结算方式";
        this.actionItems = this.recTypeList;
        return;
      }
    },

    //// 选择商品名称
    itemSelectPdt(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      }
      this.activePdtItemIndex = index;

      this.orgNo = this.formData.orgNo;
      if (!this.orgNo) {
        return;
      }
      this.showItemPdtSelect = true;
    },
    /// 弹窗中用户选择了某一个商品
    selectItemProduct(item) {
      this.showItemPdtSelect = false;
      /////是新增的一行
      if (this.activePdtItemIndex === -1) {
        let newRow = {
          pdtNo1: item.pdtNo1,
          prodName: item.pdtNameC,
          specification: item.specificationE,
          uom: item.uom,
        };
        this.formData.items.push(newRow);
        this.pdtItemsActiveIndex = this.formData.items.length - 1;
        return;
      }
      ////修改的是已知行
      this.formData.items[this.activePdtItemIndex].pdtNo1 = item.pdtNo1;
      this.formData.items[this.activePdtItemIndex].prodName = item.pdtNameC;
      this.formData.items[this.activePdtItemIndex].uom = item.uom;
      this.formData.items[this.activePdtItemIndex].specification =
        item.specificationE;
    },
    //抽离单独方法
    // validateItems() {
    //   const items = this.formData.items;
    //   const isResult = isCanAddItems(this.validateField, items);
    //   if(isResult) return;
    // },
    // 新增商品空行
    handleAddEmpty() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      }
      const items = this.formData.items;
      const isResult = isCanAddItems(this.validateField, items);
      if(isResult) return;
      const baseDetail = Object.assign({}, this.baseDetail);
      items.push(baseDetail);
    },
    ///   新增商品信息
    handleAddPdtItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
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
          .catch(() => {});
      }
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
      if (this.formData.items[index].poProductId) {
        // 是原有的
        var len = this.formData.filterItems.length;
        this.formData.filterItems[len] = this.formData.items[index];
      }
      this.formData.items.splice(index, 1);
    },

    goodsItemColl(index) {
      if (index || index === 0) {
        console.log("商品展开", index);
        this.goodsItemActIndex = index;
      }
    },
  },
  /**
   * 计算方法
   */
  computed: {
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
  height: 140px;
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
  height: calc(100vh - 194.43px);
}
.wrappers-goods-detail {
  height: calc(100vh - 172.93px);
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
      //margin-bottom: 10px;
      //margin-top: 5px;
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
