<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <div class="tools-bar">
      <van-button
        v-show="btnSaveShow"
        size="small"
        class="tools-bar-button"
        type="success"
        @click="mainBtnClickSave"
        >保存</van-button
      >
      <!-- @touchstart="handleUpdate" -->
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
        v-show="btnEditShow"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="editStatus === 'view'"
        @click="mainBtnClickEdit"
        >认领</van-button
      >
    </div>

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form label-width="100" ref="mainRef">
            <van-cell-group @click="vanCellGroupBtn">
              <van-field
                v-model="formData.settlementNo"
                name="收汇单号"
                label="收汇单号"
                readonly
              />
              <van-field
                v-model="formData.settlementDate"
                readonly
                name="结汇日期"
                label="结汇日期"
              />
              <!-- :formatter="formatterInputDate" -->
              <RcmSelect
                :select-label="'currencyName'"
                :select-value="'currencyCode'"
                :valueKey="'currencyName'"
                :options="currencyCodeList"
                :label="'水单币种'"
                :placeholder="'水单币种'"
                :readonly="true"
                :field="formData.currencyCodeSd"
              />
              <van-field
                v-model="formData.inputDate"
                readonly
                name="制作日期"
                label="制作日期"
              />
              <!-- :formatter="formatterInputDate" -->
              <van-field
                v-model="formData.cmpId"
                name="付款公司"
                label="付款公司"
                readonly
              />
              <van-field
                v-model="formData.settlementBank"
                name="结汇银行"
                label="结汇银行"
                readonly
              />

              <van-field
                v-model="formData.empName"
                name="录入人"
                label="录入人"
                readonly
              />

              <van-field
                v-model="formData.applyNo"
                name="申报单号"
                label="申报单号"
                readonly
              />

              <van-field
                v-model="formData.verifyNo"
                name="付款行"
                label="付款行"
                readonly
              />

              <van-field
                v-model="formData.recType"
                name="收汇类型"
                label="收汇类型"
                readonly
              />
              <van-field
                v-model="computedOrgCo"
                name="平台公司"
                label="平台公司"
                readonly
                placeholder="平台公司"
              />
              <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="control2List"
                :label="'水单状态'"
                :placeholder="'水单状态'"
                :readonly="true"
                :field="formData.control2"
              />
              <van-field
                readonly
                v-model="formData.cmpNo"
                name="往来单位编码"
                label="往来单位编码"
              />
              <van-field
                v-model="formData.serialCode"
                readonly
                name="总帐科目"
                label="总帐科目"
              />
              <!-- <van-field
                readonly
                v-model="formData.amntFeeASum"
                name="金额(CNY)"
                label="金额(CNY)"
              /> -->
              <van-field
                v-model="formData.sapType"
                name="SAP接口状态"
                label="SAP接口状态"
                readonly
              />
              <van-field
                v-model="formData.sapOrderNo"
                name="SAP收款编号"
                label="SAP收款编号"
                readonly
              />
              <van-field
                v-model="formData.sapCreateDate"
                name="SAP创建日期"
                label="SAP创建日期"
                readonly
              />
            </van-cell-group>
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="收汇信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form label-width="120">
            <van-cell-group @click="vanCellGroupBtn">
              <van-field
                v-model="formData.abroadChargeSd"
                readonly
                name="国外扣费"
                label="国外扣费"
              />
              <van-field
                v-model="formData.negotiatingInterestSd"
                name="贴现利息"
                label="贴现利息"
                readonly
              />
              <van-field
                v-model="formData.otherChargeSd"
                name="国内扣费"
                label="国内扣费"
                readonly
              />

              <van-field
                v-model="formData.settlementMoneySd"
                name="外币入帐金额"
                label="外币入帐金额"
                readonly
              />
              <RcmSelect
                :select-label="'currencyName'"
                :select-value="'currencyCode'"
                :valueKey="'currencyName'"
                :options="currencyCodeList"
                :label="'水单币种'"
                :placeholder="'水单币种'"
                :readonly="true"
                :field="formData.currencyCodeSd"
              />
              <van-field
                v-model="formData.exchangeRateSd"
                name="牌价"
                label="牌价"
                readonly
              />
              <van-field
                v-model="formData.enterAccountMoneySd"
                name="结汇金额(CNY)"
                label="结汇金额(CNY)"
                readonly
              />
              <van-field
                v-model="formData.totalMoneySd"
                name="应收汇金额"
                label="应收汇金额"
                readonly
              />
            </van-cell-group>
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="领用信息">
        <div class="detail_item">
          <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelDetailAction"
              style="magin-right: 10px"
              >撤销所有清单操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddDetailItem"
              style="magin-right: 10px"
              >新增领用</van-button
            >
          </div>
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
                  :title="getObjectNo(item.objectNo, item.baseNum, index + 1)"
                  :is-link="false"
                >
                  <template #title>
                    <div class="collapse-slot-title">
                      <span>{{ getObjectNo(item.objectNo, item.baseNum, index + 1) }}</span>
                      <van-checkbox
                        v-model="item.checked"
                        @click="selectPdtCheck(item)"
                      />
                    </div>
                  </template>
                  <van-form label-width="150">
                    <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="objectNoList"
                      :label="'单据类型'"
                      :name="'单据类型'"
                      :placeholder="'单据类型'"
                      :readonly="orderReadOnly"
                      :isRightArrow="true"
                      :field="item.objectNo"
                      @change="
                        ({ label, value }) =>
                          changeRcmSelect({ label, value }, 'objectNo', index)
                      "
                    />
                    <van-field v-model="item.baseNum" readonly name="单据号">
                      <template #label>
                        <van-button
                          size="small"
                          type="primary"
                          @click="baseNumClick(item)"
                          >单据号</van-button
                        >
                      </template>
                    </van-field>
                    <van-field
                      v-model="item.totalMoney"
                      :readonly="orderReadOnly"
                      name="发票应收汇金额(原币)"
                      label="发票应收汇金额(原币)"
                      placeholder="请输入发票应收汇金额(原币)"
                      @change="(value) => changeTotalMoney(value, item, index)"
                    />
                    <van-field
                      v-model="item.settlementMoney"
                      readonly
                      name="发票入账金额(原币)"
                      label="发票入账金额(原币)"
                      placeholder="请输入发票入账金额(原币)"
                    />
                    <van-field
                      v-model="item.abroadCharge"
                      :readonly="orderReadOnly"
                      name="美元兑原币汇率"
                      label="美元兑原币汇率"
                      placeholder="请输入美元兑原币汇率"
                    />
                    <!-- @change="
                        (value) => changeAbroadCharge(value, item, index)
                      " -->
                    <van-field
                      v-model="item.totalMoneyStat"
                      :readonly="orderReadOnly"
                      name="发票收汇金额(美元)"
                      label="发票收汇金额(美元)"
                      placeholder="请输入发票收汇金额(美元)"
                    />
                    <!-- <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="accountantList"
                      :label="'财务制证'"
                      :name="'财务制证'"
                      :placeholder="'财务制证'"
                      :readonly="true"
                      :field="item.accountant"
                    /> -->
                    <!-- @change="({label, value}) => changeRcmSelect({label, value}, 'accountant', index)" -->
                    <van-field
                      v-model="item.exportDate"
                      name="海关放行日期"
                      label="海关放行日期"
                      placeholder="请选择海关放行日期"
                      :readonly="true"
                    />
                    <!-- @click="dateTimeFieldClick('exportDate', index)" -->
                    <van-field
                      v-model="item.cfmDate"
                      name="认领日期"
                      label="认领日期"
                      placeholder="请选择认领日期"
                      :readonly="true"
                    />
                    <!-- @click="dateTimeFieldClick('cfmDate', index)" -->
                    <!-- <RcmSelect
                      :select-label="'refValue'"
                      :select-value="'refValueCode'"
                      :valueKey="'refValue'"
                      :options="orderTypeList"
                      :label="'贸易方式'"
                      :name="'贸易方式'"
                      :placeholder="'贸易方式'"
                      :readonly="true"
                      :field="item.orderTypNo"
                    /> -->
                    <van-field
                      v-model="item.orderType"
                      readonly
                      name="贸易方式"
                      label="贸易方式"
                      placeholder="请输入贸易方式"
                    />
                    <!-- @change="({label, value}) => changeRcmSelect({label, value}, 'orderType', index)" -->
                    <van-field
                      v-model="item.amount1"
                      :readonly="orderReadOnly"
                      name="报关金额"
                      label="报关金额"
                      placeholder="请输入报关金额"
                    />
                    <van-field
                      v-model="item.orgName"
                      :readonly="orderReadOnly"
                      name="部门"
                      label="部门"
                      placeholder="请输入部门"
                    />
                    <van-field
                      v-model="item.employeeName"
                      readonly
                      name="业务员"
                      placeholder="请输入业务员"
                    >
                      <template #label>
                        <van-button
                          @click="employeeClick(item)"
                          type="primary"
                          size="small"
                        >
                          业务员
                        </van-button>
                      </template>
                    </van-field>
                    <!-- <van-field
                      v-model="item.invoiceNo"
                      :readonly="orderReadOnly"
                      name="发票号"
                      label="发票号"
                      placeholder="请输入发票号"
                    /> -->
                    <!-- <van-field
                      v-model="item.verifyNo"
                      :readonly="orderReadOnly"
                      name="收汇核销单号"
                      label="收汇核销单号"
                      placeholder="请输入收汇核销单号"
                    /> -->
                    <!-- <van-field
                      v-model="item.orderNo"
                      :readonly="orderReadOnly"
                      name="定单号"
                      label="定单号"
                      placeholder="请输入定单号"
                    /> -->
                    <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="confirmList"
                      :label="'确认标识'"
                      :name="'确认标识'"
                      :placeholder="'确认标识'"
                      :readonly="true"
                      :field="item.confirm"
                    />
                    <!-- @change="({label, value}) => changeRcmSelect({label, value}, 'confirm', index)" -->
                    <van-field
                      v-model="item.confirmDate"
                      name="确认日期"
                      label="确认日期"
                      placeholder="请选择确认日期"
                      readonly
                    />
                    <!-- @click="dateTimeFieldClick('confirmDate', index)" -->
                    <van-field
                      v-model="item.confirmName"
                      readonly
                      name="确认人"
                      label="确认人"
                      placeholder="请输入确认人"
                    />
                    <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deleteDetailItem(index)"
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
      <van-tab title="费用信息">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="cancelChargeItem"
              style="magin-right: 10px"
              >撤销原有操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleChargeItem"
              style="magin-right: 10px"
              >新增费用</van-button
            >
          </div>
          <van-collapse
            v-model="charItemActiveIndex"
            accordion
            @change="goodsItemColl"
          >
            <Scroll
              class="wrappers-goods-detail wrappers"
              wrapper="goodsDetailRef"
              v-if="filterChargeItems().length"
              ref="goodsDetail"
              >
              <div>
                <van-collapse-item
                  v-for="(item, index) in filterChargeItems()"
                  :key="index"
                  :name="index"
                  :title="getChargeType(index)"
                >
                  <van-form label-width="150">
                    <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="currencyType"
                      :label="'费用类别'"
                      :name="'费用类别'"
                      :placeholder="'费用类别'"
                      :readonly="true"
                      :field="item.itemType"
                    />
                      <!-- isRightArrow -->
                      <!-- @change="({label, value}) => changeCharItem({label, value}, 'itemType', index)" -->
                    <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="chargeType"
                      :label="'费用名称'"
                      isRightArrow
                      :name="'费用名称'"
                      :placeholder="'费用名称'"
                      :readonly="orderReadOnly"
                      :field="item.chargeType"
                      @change="({label, value}) => changeCharItem({label, value}, 'chargeType', index)"
                    />
                    <van-field
                      v-model="item.chargeMoney"
                      :readonly="orderReadOnly"
                      name="费用金额(原币)"
                      label="费用金额(原币)"
                      placeholder="请输入费用金额(原币)"
                      @change="
                        (value) => changeAbroadCharge(value, item, index)
                      "
                    />
                    <van-field
                      v-model="item.chargeMoneyBasic"
                      readonly
                      name="费用金额(本位币)"
                      label="费用金额(本位币)"
                      placeholder="请输入费用金额(本位币)"
                    />
                    <!-- <RcmSelect
                      :select-label="'label'"
                      :select-value="'value'"
                      :valueKey="'label'"
                      :options="accountantList"
                      :label="'财务制证'"
                      :name="'财务制证'"
                      :placeholder="'财务制证'"
                      :readonly="true"
                      :field="item.accountant"
                    /> -->
                    <!-- @change="({label, value}) => changeRcmSelect({label, value}, 'accountant', index)" -->
                    <van-field
                      v-model="item.exchangeRateStat"
                      name="美元兑原币汇率"
                      label="美元兑原币汇率"
                      placeholder="请选择美元兑原币汇率"
                      :readonly="orderReadOnly"
                      @change="(value) => changeExchangeRateStat(value, item, index)"
                    />
                    <van-field
                      v-model="item.chargeMoneyStat"
                      name="费用金额(美元)"
                      label="费用金额(美元)"
                      placeholder="请选择费用金额(美元)"
                      readonly
                    />
                    <van-field
                      v-model="item.inputDate"
                      readonly
                      name="录入日期"
                      label="录入日期"
                      placeholder="请输入录入日期"
                    />
                    <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deleteCharItem(index)"
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
      
    </van-tabs>

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
    <van-popup
      v-model:show="showInvoice"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <RcmDialog
        v-bind="INVOICE"
        ref="invoiceRef"
        v-on="{ handleMutiSelectGoods: selectInvoice }"
      />
    </van-popup>
    <van-popup
      v-model:show="showOrder"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <RcmDialog
        v-bind="ORDER"
        ref="orderRef"
        v-on="{ handleMutiSelectGoods: selectOrder }"
      />
    </van-popup>
    <van-popup
      v-model:show="showZkOrder"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <RcmDialog
        v-bind="ZKORDER"
        ref="zKOrderRef"
        v-on="{ handleMutiSelectGoods: selectZKOrder }"
      />
    </van-popup>
    <van-popup
      v-model:show="showSample"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <RcmDialog
        v-bind="SAMPLE"
        ref="sampleRef"
        v-on="{ handleMutiSelectGoods: selectSample }"
      />
    </van-popup>
    <van-popup
      v-model:show="showEmployee"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <RcmDialog
        v-bind="EMPLOYEE"
        ref="employeeRef"
        v-on="{ handleMutiSelectGoods: selectEmployee }"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  INVOICE,
  ORDER,
  ZKORDER,
  SAMPLE,
  EMPLOYEE,
} from "../config/dialogParam";
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import { getCurrencyCodeList, getTable3XByRef } from "@/api/common";
import ErpVendorSelect from "@/components/ErpVendor.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
import RcmDialog from "../components/RcmDialog";
import {
  bankBillManageInfo,
  updateBankBillManage,
} from "@/api/fundManagement/bankBillManage";
import { upload } from "@/api/erp.file.js";
import { getOrgList } from "@/utils/erp.org.js";
import { getRe02CopstFee } from "@/utils/erp.base.data.js";
import { dateFormat, moneyFormat, rMoneyFormat, clone } from "@/utils/format";
import { isCanAddItems } from "../methods/common-methods";
import { mapGetters } from "vuex";
import fieldFormData from "./cloumn";

export default {
  name: "BankBillManageDetail",
  components: {
    NavBar,
    Scroll,
    RcmDialog,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
  },
  watch: {
    tabActive: {
      handler(oldVal, newVal) {
        // if (newVal === 0) {
        //   this.$refs.main.refresh();
        // } else if (newVal === 3) {
        //   this.$refs.file.refresh();
        // }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      inputDateArr: [],
      requisitionRow: {},//领用信息对象
      filterItems: [],
      settlementDate: "",
      inputDate: "",
      cfmDate: [],
      confirmDate: [],
      // orderTypeList: this.getState.selectData.orderTypeList,
      // 时间选择器字段
      dateTimes: {
        field: "",
        index: null,
      },
      // 弹窗配置项
      INVOICE,
      ORDER,
      ZKORDER,
      SAMPLE,
      EMPLOYEE,
      itemRow: {},
      // 单据号选择窗口
      showInvoice: false, //出口销售弹窗
      showOrder: false, //订单号弹窗
      showZkOrder: false, //转口销售合同弹窗
      showSample: false, //样品单弹窗
      showEmployee: false, //业务员弹窗
      confirmList: [
        { value: "N", label: "未确认" },
        { value: "Y", label: "已确认" },
      ],
      accountantList: [
        { value: 1, label: "已制证" },
        { value: 0, label: "未制证" },
      ],
      currencyType: [
        { value: "Dmst", label: "人民币"},
        { value: "Frgn", label: "外币"},
      ],
      chargeType: [
        { value: "国内扣费", label: "国内扣费"},
        { value: "国外扣费", label: "国外扣费"},
        { value: "贴现利息", label: "贴现利息"},
      ],
      objectNo: "PM03",
      tileName: "收款领用详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      baseDetail: fieldFormData().baseDetail,
      chargeItem: fieldFormData().chargeItem,
      oaStatusArr: [],
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
      activeTableName: "",
      activeTableIndex: -1,
      ///   枚举类型标题说明
      actionDesc: "",
      /// 明细折叠，当前打开的  明细行字段
      pdtItemsActiveIndex: 0,
      charItemActiveIndex: 0,
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
      ///  收款分类
      skflItems: [
        { code: 1, name: "货款" },
        { code: 0, name: "费用" },
      ],
      wydjlxItems: [
        { code: "PM03", name: "销售合同" },
        { code: "SM14", name: "进口定单" },
        { code: "SM17", name: "进口发票" },
        { code: "PM02", name: "内采合同" },
        { code: "OTHER", name: "其他" },
      ],
      // 单据类型
      objectNoList: [
        { value: "SD01", label: "出口发票" },
        { value: "SM07", label: "出口定单" },
        { value: "SM07A", label: "转口销售合同" },
        { value: "PDT19", label: "样品单" },
      ],
      costFeeList: [],
      validateField: [
        { enField: "baseNum", cnField: "单据号" },
        { enField: "objectNo", cnField: "单据类型" },
        { enField: "totalMoney", cnField: "发票应收汇金额(原币)" },
      ],
      control2List: [
        { value: 0, label: "未制证" },
        { value: 1, label: "公司预收" },
        { value: 20, label: "未制证提交" },
        { value: 21, label: "公司预收提交" },
        { value: 22, label: "撤销提交" },
        { value: 30, label: "业务员预收" },
        { value: 32, label: "预收转销" },
        { value: 33, label: "预收转销提交" },
        { value: 80, label: "制证完成" },
      ],
      // orderForm: {
      //   orderType: "",
      //   custNo: "",
      // },
    };
  },
  created() {
    this.docentry = this.$route.query.docEntry;
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });
    getCurrencyCodeList().then((res) => {
      this.currencyCodeList.push(...res.data);
    });
    getRe02CopstFee().then((res) => {
      this.costFeeList.push(...res);
    });
    // getTable3XByRef({
    //   objRef: "InlandPurchase"
    // }).then(res => {
    //   this.orderTypeList.push(...res.data);
    // })
    if (this.docentry && this.docentry > 0) {
      this.loadDetail();
    }
  },
  setup() {
    provide("title", "收汇领用详情");
  },
  mounted() {
    this.setBtnStatus();
  },
  methods: {
    filterChargeItems() {
      if(Object.keys(this.requisitionRow).length !== 0 && this.requisitionRow.objectNo === "SD01") {
        return this.formData.chargeItems.filter(item => {
          if(item.invoiceNo.toString().trim() === this.requisitionRow.invoiceNo && item.fpkId === this.requisitionRow.fpkId) {
            return item;
          }
        });
      } else if(Object.keys(this.requisitionRow).length !== 0 && this.requisitionRow.objectNo !== "SD01") {
        return this.formData.chargeItems.filter(item => {
          if(item.invoiceNo.toString().trim() === this.requisitionRow.orderNo && item.fpkId === this.requisitionRow.fpkId) {
            return item;
          }
        })
      } else if(Object.keys(this.requisitionRow).length === 0){
        return [];
      }
    },
    // 必须选中一条收汇信息才可以新增费用信息
    selectPdtCheck(item) {
      // 避免多次来回点击同一个出库商品导致未选中时pdtNo也有值的bug
      this.requisitionRow = {};
      // 将出库商品中的pdtVndNo赋值给出库商品清单的隐藏查询条件pdtNo1
      if (item.checked) {
        this.requisitionRow = item;
        this.formData.items.forEach((items) => {
          // 如果选中当前出库商品，那么其他出库商品的复选框的按钮状态要为false;
          if (item.pkId !== items.pkId && items.checked) {
            items.checked = false;
          }
        });
      }
    },
    // 删除费用信息
    deleteCharItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除！" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除费用信息吗?",
      })
        .then(() => {
          // if (this.filterChargeItems()[index].pkId) {
            // 是原有的
          var len = this.formData.filterChargeItems.length;
          this.formData.filterChargeItems[len] = this.filterChargeItems()[index];
          // }
          const idx = this.formData.chargeItems.findIndex(item => item.pkId === this.filterChargeItems()[index].pkId);
          this.formData.chargeItems.splice(idx, 1);
          // if (this.formData.chargeItems[index].fpkId) {
          //   // 是原有的
          //   var len = this.formData.filterChargeItems.length;
          //   this.formData.filterChargeItems[len] = this.formData.chargeItems[index];
          // }
          // this.formData.chargeItems.splice(index, 1);
        })
    },
    changeCharItem({label, value}, field, index) {
      if (field === "chargeType") {
        if (value === "国外扣费") {
          this.filterChargeItems()[index].itemType = "Frgn"
          // this.formData.chargeItems[index].itemType = "Frgn"
        }
        if (value === "国内扣费") {
          this.filterChargeItems()[index].itemType = "Dmst"
        }
        if (value === "贴现利息") {
          this.filterChargeItems()[index].itemType = "Frgn"
        }
        this.filterChargeItems()[index].chargeType = value;
        this.getChargeType(index);
      }
    },
    // 新增费用信息
    handleChargeItem() {
      if(this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "当前单据是只读状态,不可新增！"
        });
        return;
      }
      if(
        !this.requisitionRow ||
        Object.keys(this.requisitionRow).length === 0
      ) {
        Notify({
          type: "warning",
          message: "请先选择领用记录"
        });
        return;
      }
      let inputDate = null;
      let chargeItem = Object.assign({}, this.chargeItem);
      inputDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss")
      this.inputDateArr.push(inputDate);
      chargeItem.inputDate = dateFormat(new Date(), "yyyy-MM-dd");
      if(this.requisitionRow.objectNo === "SD01") {
        chargeItem.invoiceNo = this.requisitionRow.invoiceNo;
      } else {
        chargeItem.invoiceNo = this.requisitionRow.orderNo;
      }
      chargeItem.fpkId = this.requisitionRow.fpkId;
      chargeItem.exchangeRate = this.formData.exchangeRate;
      chargeItem.exchangeRateStat = this.formData.exchangeRateStat;

      this.formData.chargeItems.push(chargeItem);
    },
    // 发票应收汇金额(原币)
    changeTotalMoney(value, { settlementMoney, abroadCharge }, index) {
      let totalMoney = rMoneyFormat(value.target.value);
      let abroadCharges = 1;
      if (abroadCharge) {
        abroadCharges = abroadCharge;
      }
      let settlementMoneys = totalMoney;
      let totalMoneyStats = (totalMoney / abroadCharges).toFixed(2);
      let settlementMoneyStats = (settlementMoneys / abroadCharges).toFixed(2);
      this.formData.items[index].settlementMoney =
        moneyFormat(settlementMoneys);
      this.formData.items[index].settlementMoneyStat = settlementMoneyStats;
      this.formData.items[index].totalMoneyStat = moneyFormat(totalMoneyStats);
    },
    // changeAbroadCharge(value, { totalMoney }, index) {
    //   let totalMoneys = rMoneyFormat(totalMoney);
    //   let abroadCharges = 1;
    //   if (value.target.value) {
    //     abroadCharges = value.target.value;
    //   }
    //   let settlementMoneys = totalMoneys;
    //   let totalMoneyStats = Number(
    //     Number(totalMoneys) / Number(abroadCharges)
    //   ).toFixed(2);
    //   let settlementMoneyStats = (settlementMoneys / abroadCharges).toFixed(2);
    //   this.formData.items[index].settlementMoneyStat = settlementMoneyStats;
    //   this.formData.items[index].totalMoneyStat = moneyFormat(totalMoneyStats);
    // },
    /**
     * 费用金额(原币)-事件监听
     * 费用金额(本位币)=费用金额(原币)*牌价【收汇信息的字段】
     * @param chargeMoneyBasic 费用金额(本位币)
     * @param chargeMoney 费用金额(原币)
     * @param exchangeRateSd 牌价
     */
    changeAbroadCharge(value, {chargeMoneyBasic, exchangeRateStat}, index) {
      const chargeMoney = rMoneyFormat(value.target.value);
      this.filterChargeItems()[index].chargeMoneyBasic = 
      // this.formData.chargeItems[index].chargeMoneyBasic = 
      moneyFormat(chargeMoney * rMoneyFormat(this.formData.exchangeRateSd));
      this.filterChargeItems()[index].chargeMoneyStat = 
      moneyFormat(chargeMoney / exchangeRateStat)
      this.filterChargeItems()[index].chargeMoney = moneyFormat(value.target.value)
    },
    /**
     * 美元兑原币汇率-事件监听
     * 费用金额(美元)=费用金额(原币) / 美元兑原币汇率
     * @param chargeMoneyStat 费用金额(美元)
     * @param chargeMoney 费用金额(原币)
     * @param exchangeRateStat 美元兑原币汇率
     */
    changeExchangeRateStat(value, {chargeMoney}, index) {
      const exchangeRateStat = value.target.value;
      // this.formData.chargeItems[index].chargeMoneyStat = 
      this.filterChargeItems()[index].chargeMoneyStat = 
      moneyFormat(chargeMoney / exchangeRateStat)
    },
    // 是否允许当前数据可以修改
    vanCellGroupBtn() {
      Notify({
        type: "warning",
        message: "该界面不支持修改功能!",
      });
      return;
    },
    // 选择时间具体操作函数
    selectDateTime(val) {
      const dateTimes = this.dateTimes;
      this[dateTimes.field][dateTimes.index] =
        dateFormat(val, "yyyy-MM-dd") + dateFormat(new Date(), " HH:mm:ss");
      this.formData.items[dateTimes.index][dateTimes.field] = dateFormat(
        val,
        "yyyy-MM-dd"
      );
      for (let key in dateTimes) {
        dateTimes[key] = null;
      }
      this.selectTimeShow = false;
    },
    // 时间选择点击事件
    dateTimeFieldClick(field, index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.dateTimes.field = field;
      this.dateTimes.index = index;
      this.selectTimeShow = true;
    },
    // 业务员选择
    selectEmployee(row) {
      this.itemRow.employeeNo = row.userNo;
      this.itemRow.employeeName = row.userName;
      this.showEmployee = false;
    },
    // 样品单选择
    selectSample(row) {
      this.itemRow.invoiceNo = "";
      this.itemRow.baseNum = row.sampleNo;
      this.itemRow.totalMoney = moneyFormat(row.amount);
      this.itemRow.amount1 = moneyFormat(row.amount);
      this.itemRow.currencyCode = row.currencyCode;
      this.itemRow.verifyNo = "";
      this.itemRow.abroadCharge = 1.0000;
      this.itemRow.orderNo = row.sampleNo;
      this.itemRow.contractNo = row.sampleNo;
      this.itemRow.orgNo = row.orgNo;
      this.itemRow.orgName = row.orgName;
      this.itemRow.employeeNo = row.employeeNo;
      this.itemRow.employeeName = row.employeeName;
      this.showSample = false;
    },
    // 出口订单
    selectOrder(row) {
      this.itemRow.invoiceNo = "";
      this.itemRow.baseNum = row.orderNo;
      this.itemRow.totalMoney = moneyFormat(row.totalPrice);
      this.itemRow.amount1 = moneyFormat(row.totalPrice);
      this.itemRow.currencyCode = row.currencyCode;
      this.itemRow.verifyNo = "";
      this.itemRow.abroadCharge = 1.0000;
      this.itemRow.orderNo = row.orderNo;
      this.itemRow.contractNo = row.contractNo;
      this.itemRow.orderType = row.orderType;
      this.itemRow.orgNo = row.orgNo;
      this.itemRow.orgName = row.orgName;
      this.itemRow.employeeNo = row.employeeNo;
      this.itemRow.employeeName = row.employeeName;
      this.showOrder = false;
    },
    // 单据号选择窗口
    selectInvoice(row) {
      const index = this.formData.items.findIndex(
        (item) => item.invoiceNo === row.invoiceNo
      );
      if (index > -1) {
        Notify({
          type: "warning",
          message: "发票号重复,请重新选择!!",
        });
        return;
      }
      this.itemRow.invoiceNo = row.invoiceNo;
      this.itemRow.baseNum = row.invoiceNo;
      this.itemRow.totalMoney = moneyFormat(row.totalPrice);
      this.itemRow.amount1 = moneyFormat(row.totalPrice);
      this.itemRow.currencyCode = row.currencyCode;
      this.itemRow.verifyNo = row.dzType;
      this.itemRow.abroadCharge = 1.0000;
      this.itemRow.orderNo = row.orderNo;
      this.itemRow.contractNo = row.contractNo;
      this.itemRow.orderTypNo = row.orderTypNo;
      this.itemRow.orderType = row.orderType;
      this.itemRow.orgNo = row.orgNo;
      this.itemRow.orgName = row.orgName;
      this.itemRow.employeeNo = row.employeeNo;
      this.itemRow.employeeName = row.employeeName;
      this.showInvoice = false;
    },
    // 转口销售合同选择
    selectZKOrder(row) {
      this.itemRow.invoiceNo = "";
      this.itemRow.baseNum = row.orderNo;
      this.itemRow.totalMoney = moneyFormat(row.totalPrice);
      this.itemRow.amount1 = moneyFormat(row.totalPrice);
      this.itemRow.currencyCode = row.currencyCode;
      this.itemRow.verifyNo = "";
      this.itemRow.abroadCharge = 1.0000;
      this.itemRow.orderNo = row.orderNo;
      this.itemRow.contractNo = row.contractNo;
      this.itemRow.orderType = row.orderType;
      this.itemRow.orgNo = row.orgNo;
      this.itemRow.orgName = row.orgName;
      this.itemRow.employeeNo = row.employeeNo;
      this.itemRow.employeeName = row.employeeName;
      this.showZkOrder = false;
    },
    changeRcmSelect({ label, value }, field, index) {
      this.formData.items[index][field] = value;
    },
    // 单据类型
    getObjectNo(objectNo, baseNum, index) {
      let objectName = "";
      this.objectNoList.forEach((item) => {
        if (objectNo === item.value) {
          objectName = item.label;
        }
      });
      if (this.formData.items.length > 1) {
        return (
          index +
          "." +
          (objectName ? objectName + "号：" : "") +
          (baseNum ? baseNum : "")
        );
      } else {
        return (
          (objectName ? objectName + "号：" : "") + (baseNum ? baseNum : "")
        );
      }
    },
    // 处理objectNo为对应的中文
    getObjectName() {
      let objectName = "";
      this.objectNoList.forEach(item => {
        if(this.requisitionRow.objectNo == item.value) {
          objectName = item.label;
        }
      });
      return objectName;
    },
    /**
     * 费用类型
     * 规则 ==> 序号+【费用名称】+收汇记录【单据类型】和【单据号】
     * @param objectNoList 单据类型对应代码表
     * @param objectNo     单据类型
     * @param baseNum      单据号
     * @param chargeType   费用名称
     */
    getChargeType(index) {
      if (this.filterChargeItems().length > 1) {
        return (
          (index + 1) +
          "." +
          (this.filterChargeItems()[index].chargeType ? 
          this.filterChargeItems()[index].chargeType : "") + "-" + 
          (this.getObjectName()) + 
          '(' + this.requisitionRow.baseNum + ')'
        );
      } else {
        return (
          (this.filterChargeItems()[index].chargeType ? 
          this.filterChargeItems()[index].chargeType : "") + "-" + 
          (this.getObjectName()) + 
          '(' + this.requisitionRow.baseNum + ')'
        );
      }
    },
    // 业务员选择
    employeeClick(item) {
      this.itemRow = item;
      this.showEmployee = true;
    },
    baseNumClick(item) {
      // 由于是部分属性修改
      this.itemRow = item;
      if (item.accountant == 1 || item.confirm === "Y") {
        Notify({
          type: "warning",
          message: "财务制证已制证或确认标识已确认时无法修改单据号!",
        });
        return;
      }
      if (item.objectNo === "SD01") {
        this.showInvoice = true;
      } else if (item.objectNo === "SM07") {
        // this.orderForm.orderType = "自营出口";
        this.showOrder = true;
      } else if (item.objectNo === "SM07A") {
        // this.orderForm.orderType = "转口贸易";
        this.showZkOrder = true;
      } else if (item.objectNo === "PDT19") {
        this.showSample = true;
      }
    },
    // 格式化日期
    formatterInputDate(val) {
      return dateFormat(val, "yyyy-MM-dd");
    },
    ///当前页面切换了平台公司
    setChangeNewOrgCo() {
      this.$router.go(-1); //返回上一层
    },
    // 新增收款项目清单
    handleAddDetailItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可新增！" });
        return;
      }
      const isReturn = isCanAddItems(this.validateField, this.formData.items);
      if (isReturn) return;
      let baseDetail = Object.assign({}, this.baseDetail);
      this.formData.items.push(baseDetail);
    },
    //撤销所有的项目清单操作
    handleCancelDetailAction() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (this.oldFormData) {
        // 需要判断
        Dialog.confirm({
          title: "取消所有的明细操作",
          message: "当前操作将不会保存您对明细的修改!",
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
    cancelChargeItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (this.oldFormData) {
        // 需要判断
        Dialog.confirm({
          title: "取消所有的明细操作",
          message: "当前操作将不会保存您对明细的修改!",
        })
          .then(() => {
            this.formData.chargeItems = JSON.parse(
              JSON.stringify(this.oldFormData.chargeItems)
            );
            this.charItemActiveIndex = 0;
          })
          .catch(() => {});
      }
    },
    // 删除项目清单
    deleteDetailItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除！" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除收款项目清单吗?",
      })
        .then(() => {
          // this.formData.items.splice(index, 1);
          this.doDeletePdtItem(index);
        })
        .catch((res) => {});
    },
    //新增一个票据明细
    handleAddNoteItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可新增！" });
        return;
      }
      let newRow = {};
      this.formData.noteItems.push(newRow);
    },
    // 删除票据明细
    deleteNoteItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除！" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除票据明细吗?",
      })
        .then(() => {
          this.formData.noteItems.splice(index, 1);
        })
        .catch((res) => {});
    },
    // 点击保存
    mainBtnClickSave() {
      this.$refs.mainRef
        .validate()
        .then((_) => {
          this.formData.abroadChargeSd = rMoneyFormat(
            this.formData.abroadChargeSd
          );
          this.formData.negotiatingInterestSd = rMoneyFormat(
            this.formData.negotiatingInterestSd
          );
          this.formData.otherChargeSd = rMoneyFormat(
            this.formData.otherChargeSd
          );
          this.formData.settlementMoneySd = rMoneyFormat(
            this.formData.settlementMoneySd
          );
          this.formData.settlementDate = this.settlementDate;
          this.formData.inputDate = this.inputDate;
          this.formData.items.forEach((item, index) => {
            this.formData.items[index].amount1 = rMoneyFormat(
              this.formData.items[index].amount1
            );
            this.formData.items[index].totalMoneyStat = rMoneyFormat(
              this.formData.items[index].totalMoneyStat
            );
            this.formData.items[index].totalMoney = rMoneyFormat(
              this.formData.items[index].totalMoney
            );
            this.formData.items[index].settlementMoney = rMoneyFormat(
              this.formData.items[index].settlementMoney
            );
            this.formData.items[index].cfmDate = dateFormat(
              new Date(),
              "yyyy-MM-dd HH:mm:ss"
            );
            this.formData.items[index].confirmDate = dateFormat(
              new Date(),
              "yyyy-MM-dd HH:mm:ss"
            )
          });
          this.formData.chargeItems.forEach((item, index) => {
            this.formData.chargeItems[index].chargeMoney = rMoneyFormat(this.formData.chargeItems[index].chargeMoney);
            this.formData.chargeItems[index].chargeMoneyBasic = rMoneyFormat(this.formData.chargeItems[index].chargeMoneyBasic);
            this.formData.chargeItems[index].chargeMoneyStat = rMoneyFormat(this.formData.chargeItems[index].chargeMoneyStat);
            this.formData.chargeItems[index].inputDate = this.inputDateArr[index];
          });
          this.formData.filterChargeItems.forEach((item, index) => {
            this.formData.filterChargeItems[index].chargeMoney = rMoneyFormat(this.formData.filterChargeItems[index].chargeMoney);
            this.formData.filterChargeItems[index].chargeMoneyBasic = rMoneyFormat(this.formData.filterChargeItems[index].chargeMoneyBasic);
            this.formData.filterChargeItems[index].chargeMoneyStat = rMoneyFormat(this.formData.filterChargeItems[index].chargeMoneyStat);
            this.formData.filterChargeItems[index].inputDate = this.inputDateArr[index];
          })
          // 实现修改功能
          updateBankBillManage(this.formData).then((res) => {
            if (res.code === 1) {
              Notify({
                type: "success",
                message: "领用成功!",
              });
              for (const key in this.formData) {
                this.formData[key] = res.data[key];
              }
              this.loadDetail();
            }
          });
          this.editStatus = "view";
          this.setBtnStatus();
        })
        .catch((err) => {});
    },
    ///点击取消
    mainBtnClickCancel() {
      Dialog.confirm({
        title: "取消对单据的操作",
        message: "当前操作将不会保存您对单据的修改!",
      })
        .then(() => {
          this.loadDetail();
        })
        .catch(() => {});
    },

    // 点击认领
    mainBtnClickEdit() {
      this.editStatus = "edit";
      this.setBtnStatus();
    },

    /// 设置 按钮的状态
    setBtnStatus() {
      if (this.editStatus === "view") {
        this.orderReadOnly = true;
        this.btnSaveShow = false;
        this.btnCancelShow = false;
        this.btnEditShow = true;
      } else if (this.editStatus === "edit") {
        this.orderReadOnly = false;
        this.btnSaveShow = true;
        this.btnCancelShow = true;
        this.btnEditShow = false;
      }
    },

    itemSelectDetail(index, fileName) {
      this.actionItems = [];
      this.actionDesc = "";
      if (fileName === "objectNo") {
        this.actionItems = this.wydjlxItems;
        this.actionDesc = "请选择业务单据类型";
      } else if (fileName === "control") {
        this.actionItems = this.skflItems;
        this.actionDesc = "请选择明细分类";
      } else if (fileName === "itemType") {
        for (let index = 0; index < this.costFeeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.costFeeList[index].refValue;
          item.code = this.costFeeList[index].refValue;
          this.actionItems[index] = item;
        }
        this.actionDesc = "请选择收款项目";
      }

      this.activeTableName = "detail";
      this.actionShow = true;
      this.activeTableIndex = index;
      this.activeFormFiled = fileName;
    },

    selectItemAction(item) {
      if (this.activeTableName === "detail") {
        if (this.activeFormFiled === "control") {
          this.formData.items[this.activeTableIndex].control = item.name;
        } else if (this.activeFormFiled === "objectNo") {
          this.formData.items[this.activeTableIndex].objectNo = item.name;
        } else if (this.activeFormFiled === "itemType") {
          this.formData.items[this.activeTableIndex].itemType = item.name;
        }
      }
      this.actionShow = false;
      this.activeFormFiled = "";
      this.activeTableIndex = -1;
      this.activeTableName = "";
    },
    itemSelectOrder(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可选择！" });
        return;
      }
    },

    onClickTab(title) {
      if (title === 0) {
        this.$nextTick((_) => {
          this.$refs.main.refresh();
        });
      }
      // else if(title === 1) {
      //   this.$nextTick(_ => {
      //     this.$refs.goods.refresh();
      //   })
      // }
      // else if(title === 2) {
      //   this.$nextTick(_ => {
      //     this.$refs.contact.refresh();
      //   })
      // }
      // else if (title === 3) {
      //   this.$nextTick((_) => {
      //     this.$refs.file.refresh();
      //   });
      // }
    },

    ///重新加载所有的数据
    loadDetail() {
      bankBillManageInfo({ docEntry: this.docentry })
        .then((res) => {
          this.cfmDate = [];
          this.inputDateArr = [];
          this.confirmDate = [];
          this.filterItems.push(...clone(res.data.items));
          res.data.abroadChargeSd = moneyFormat(res.data.abroadChargeSd);
          res.data.negotiatingInterestSd = moneyFormat(
            res.data.negotiatingInterestSd
          );
          res.data.otherChargeSd = moneyFormat(res.data.otherChargeSd);
          res.data.settlementMoneySd = moneyFormat(res.data.settlementMoneySd);
          res.data.items.forEach((item, index) => {
            res.data.items[index].amount1 = moneyFormat(
              res.data.items[index].amount1
            );
            res.data.items[index].totalMoneyStat = moneyFormat(
              res.data.items[index].totalMoneyStat
            );
            // res.data.items[index].amount1 = moneyFormat(
            //   res.data.items[index].amount1
            // );
            res.data.items[index].abroadCharge = Number(res.data.items[index].abroadCharge).toFixed(4)
            res.data.items[index].totalMoney = moneyFormat(
              res.data.items[index].totalMoney
            );
            res.data.items[index].settlementMoney = moneyFormat(
              res.data.items[index].settlementMoney
            );
            this.cfmDate.push(item.cfmDate);
            this.confirmDate.push(item.confirmDate);
            res.data.items[index].cfmDate = dateFormat(
              res.data.items[index].cfmDate,
              "yyyy-MM-dd"
            );
            res.data.items[index].confirmDate = dateFormat(
              res.data.items[index].confirmDate,
              "yyyy-MM-dd"
            );
          });
          res.data.chargeItems.forEach((item, index) => {
            res.data.chargeItems[index].chargeMoney = moneyFormat(res.data.chargeItems[index].chargeMoney);
            res.data.chargeItems[index].chargeMoneyBasic = moneyFormat(res.data.chargeItems[index].chargeMoneyBasic);
            res.data.chargeItems[index].chargeMoneyStat = moneyFormat(res.data.chargeItems[index].chargeMoneyStat);
            res.data.chargeItems[index].exchangeRateStat = Number(res.data.chargeItems[index].exchangeRateStat).toFixed(4);
            this.inputDateArr.push(res.data.chargeItems[index].inputDate);
            res.data.chargeItems[index].inputDate = dateFormat(res.data.chargeItems[index].inputDate, "yyyy-MM-dd");
          })
          this.settlementDate = res.data.settlementDate;
          this.inputDate = res.data.inputDate;
          res.data.inputDate = dateFormat(res.data.inputDate, "yyyy-MM-dd");
          res.data.settlementDate = dateFormat(
            res.data.settlementDate,
            "yyyy-MM-dd"
          );
          this.formData = res.data;
          this.fileItems = this.formData.fileItems;
          this.formData.items[0].checked = true;
          this.requisitionRow = this.formData.items[0];
          this.oldFormData = JSON.parse(JSON.stringify(this.formData));
          this.editStatus = "view";
          this.setBtnStatus();
        })
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
    },

    //// 选择商品名称
    itemSelectPdt(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
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
      if (this.activePdtItemIndex === -1) {
      } else {
      }
      this.showItemPdtSelect = false;
    },
    ///   新增商品信息
    handleAddPdtItem() {},
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
          .catch(() => {});
      }
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
      if (this.formData.items[index].pkId) {
        // 是原有的
        var len = this.formData.filterItems.length;
        this.formData.filterItems[len] = this.filterItems[index];
        // this.formData.filterItems[len] = this.formData.items[index];
      }
      this.formData.items.splice(index, 1);
      // this.computeAllQuantiy();
      // this.computeAllAmount();
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
    updateFileAfter(fileItem) {
      //let aduitStatus = this.form
      let auditStatu = this.formData.auditStatu;
      if (this.orderReadOnly) {
        let fileList = [];
        fileList[0] = fileItem;
        let tempForm = {
          docEntry: this.formData.docEntry,
          isNo: this.formData.isNo,
          fileItems: fileList,
        };
        updateFile(tempForm).then((res) => {});
        return;
      }
    },
    goodsItemColl(index) {
      if (index || index === 0) {
        this.goodsItemActIndex = index;
      }
    },
    getmix(val) {
      if (val === "1" || val === "货款") {
        return "货款";
      } else {
        return "费用";
      }
    },
  },

  computed: {
    orderTypeList() {
      return this.getState.selectData.orderTypeList;
    },
    ...mapGetters("bankbillmanage", ["getState"]),
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
    computedItemFl: function (item) {
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
};
</script>

<style scoped lang="less">
.collapse-slot-title {
  display: flex;
  justify-content: space-between;
}
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
  background-color: #fff;
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
