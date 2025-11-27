<template>
  <TitleBar />
  <van-form label-width="120">
    <van-row v-if="isShowInvoiceNo">
      <van-field
        v-model="queryForms.invoiceNo"
        label="出口发票号"
        placeholder="请输入出口发票号"
    /></van-row>
    <van-row v-if="isShowCreditNo">
      <van-field
        v-model="queryForms.creditNo"
        label="信用证号"
        placeholder="请输入信用证号"
      />
    </van-row>
    <van-row v-if="isShowCoNamee">
      <van-field
        v-model="queryForms.coNamee"
        label="客户"
        placeholder="请输入客户"
    /></van-row>
    <van-row v-if="isShowOrderNo">
      <van-field
        v-model="queryForms.orderNo"
        label="定单号"
        placeholder="请输入定单号"
      />
    </van-row>
    <!-- 出口报关单查询字段 -->
    <van-row v-if="isShowEntry_Id">
      <van-field
        v-model="queryForms.entry_Id"
        label="报关单号"
        placeholder="请输入报关单号"
      />
    </van-row>
    <van-row v-if="isShowD_Date1">
      <van-field
        v-model="queryForms.d_Date1"
        is-link
        label="申报日期开始"
        placeholder="申报日期开始"
        @click="dateTimeFieldClick('d_Date1')"
    /></van-row>
    <van-row v-if="isShowD_Date2">
      <van-field
        v-model="queryForms.d_Date2"
        is-link
        label="申报日期结束"
        placeholder="申报日期结束"
        @click="dateTimeFieldClick('d_Date2')"
    /></van-row>
    <van-row v-if="isShowIeDate1">
      <van-field
        v-model="queryForms.ieDate1"
        is-link
        label="出口日期开始"
        placeholder="出口日期开始"
        @click="dateTimeFieldClick('ieDate1')"
    /></van-row>
    <van-row v-if="isShowIeDate2">
      <van-field
        v-model="queryForms.ieDate2"
        is-link
        label="出口日期结束"
        placeholder="出口日期结束"
        @click="dateTimeFieldClick('ieDate2')"
    /></van-row>
    <van-row v-if="isShowSeq_No">
      <van-field
        v-model="queryForms.seq_No"
        label="统一编号"
        placeholder="请输入统一编号"
    /></van-row>
    <van-row v-if="isShowMatchFlag">
      <RcmSelect
        :select-label="'refValue'"
        :select-value="'refValueCode'"
        :options="matchFlag1List"
        :textAlign="'left'"
        :label="'匹配'"
        :placeholder="'匹配'"
        :readonly="false"
        :isRightArrow="true"
        :position="'bottom'"
        :field="queryForms.matchFlag"
        :valueKey="'refValue'"
        @change="({label, value}) => changeRcmSelect({label,value}, 'matchFlag')"
      />
    </van-row>
    <van-row v-if="isShowEmployeeName">
      <van-field 
        v-model="queryForms.employeeName"
        label="业务员"
        placeholder="请输入业务员"
    /></van-row>
    <van-row v-if="isShowOrgName">
      <van-field
        v-model="queryForms.orgName"
        label="部门"
        placeholder="请输入部门"
    /></van-row>
    <!-- 出口单证查询字段 -->
    <van-row v-if="isShowCoNameE">
      <van-field
        v-model="queryForms.coNameE"
        label="客户"
        placeholder="请输入客户"
    /></van-row>
    <van-row v-if="isShowAuditStatu">
      <RcmSelect
        :select-label="'statusName'"
        :select-value="'statusCode'"
        :valueKey="'statusName'"
        :options="auditStatusList"
        :label="'审批状态'"
        :placeholder="'审批状态'"
        :readonly="false"
        :isRightArrow="true"
        :field="queryForms.auditStatu"
        @change="({label, value}) => changeRcmSelect({label, value}, 'auditStatu')"
      />
    </van-row>
    <van-row v-if="isShowInvoiceDate">
      <van-field
        v-model="queryForms.invoiceDate"
        is-link
        label="制作日期"
        placeholder="制作日期"
        @click="dateTimeFieldClick('invoiceDate')"
    /></van-row>
    <van-row v-if="isShowPdtNamee">
      <van-field
        v-model="queryForms.pdtNamee"
        label="商品名称(英文)"
        placeholder="商品名称(英文)"
    /></van-row>
    <van-row v-if="isShowPoInvoiceNo">
      <van-field
        v-model="queryForms.poInvoiceNo"
        label="编号"
        placeholder="编号"
      />
    </van-row>
    <!-- 采购发票查询字段 -->
    <van-row v-if="isShowIssueDate">
      <van-field
        v-model="queryForms.issueDateRange"
        is-link
        label="制单日期"
        placeholder="制单日期"
        @click="dateTimeFieldClick('issueDateRange')"
    /></van-row>
    <van-row v-if="isShowPdtName">
      <van-field
        v-model="queryForms.pdtName"
        label="商品"
        placeholder="商品"
    /></van-row>
    <van-row v-if="isShowPoNo || isShowSalePoNo">
      <van-field
        v-model="queryForms.poNo"
        :label="isShowSalePoNo?'开票编号':'采购合同'"
        :placeholder="isShowSalePoNo?'开票编号':'采购合同'"
    /></van-row>
    <!-- 付款通知单查询字段 -->
    <van-row v-if="isShowPayNo">
      <van-field
        v-model="queryForms.payNo"
        label="付款单号"
        placeholder="付款单号"
      />
    </van-row>
    <van-row v-if="isShowRcvCoName">
      <van-field
        v-model="queryForms.rcvCoName"
        label="收款公司"
        placeholder="请输入收款公司"
    /></van-row>
    <van-row v-if="isShowPayDateRange">
      <van-field
        v-model="queryForms.payDateRange"
        is-link
        label="制单日期"
        placeholder="制单日期"
        @click="dateTimeFieldClick('payDateRange')"
    /></van-row>
    <van-row v-if="isShowProdName">
      <van-field
        v-model="queryForms.prodName"
        label="商品"
        placeholder="商品"
    /></van-row>
    <van-row v-if="isShowPayType">
      <RcmSelect
        :select-label="'refValue'"
        :select-value="'refValue'"
        :options="payTypeList"
        :textAlign="'right'"
        :label="'付款类型'"
        :placeholder="'付款类型'"
        :readonly="false"
        :isRightArrow="true"
        :position="'bottom'"
        :field="queryForms.payType"
        :valueKey="'refValue'"
        @change="({label, value}) => changeRcmSelect({label, value}, 'payType')"
      />
    </van-row>
    <van-row v-if="isShowAuditStatus">
      <RcmSelect
        :select-label="'statusName'"
        :select-value="'statusCode'"
        :valueKey="'statusName'"
        :textAlign="'right'"
        :options="auditStatusList"
        :label="'审批状态'"
        :placeholder="'审批状态'"
        :readonly="false"
        :isRightArrow="true"
        :field="queryForms.auditStatus"
        @change="({label, value}) => changeRcmSelect({label, value}, 'auditStatus')"
      />
    </van-row>
    <!-- 授信额度申请查询字段 -->
    <van-row v-if="isShowApplyNo">
      <van-field
        v-model="queryForms.applyNo"
        label="申请单号"
        placeholder="请输入申请单号"
      />
    </van-row>
    <van-row v-if="isShowCustName"> 
      <van-field
        v-model="queryForms.custName"
        label="客户"
        placeholder="请输入客户"
    /></van-row>
    <van-row v-if="isShowInputDateRange">
      <van-field
        v-model="queryForms.inputDateRange"
        is-link
        label="录入日期"
        placeholder="录入日期"
        @click="dateTimeFieldClick('inputDateRange')"
    /></van-row>
    <van-row v-if="isShowProductName">
      <van-field
        v-model="queryForms.productName"
        label="商品名称"
        placeholder="请输入商品名称"
    /></van-row>
    <van-row v-if="isShowQuotaType">
      <RcmSelect
        :select-label="'text'"
        :select-value="'id'"
        :options="quotaTypeList"
        :textAlign="'right'"
        :label="'额度类型'"
        :placeholder="'额度类型'"
        :readonly="false"
        :isRightArrow="true"
        :position="'bottom'"
        :field="queryForms.quotaType"
        :valueKey="'text'"
        @change="({label, value}) => changeRcmSelect({label, value}, 'quotaType')"
      />
    </van-row>
    <!-- 中信保接口限额余额查询字段 -->
    <van-row v-if="isShowQuotaNo">
      <van-field
        v-model="queryForms.quotaNo"
        label="限额编号"
        placeholder="请输入限额编号"
      />
    </van-row>
    <van-row v-if="isShowBuyerNo">
      <van-field
        v-model="queryForms.buyerNo"
        label="买方代码"
        placeholder="请输入买方代码"
    /></van-row>
    <van-row v-if="isShowBuyerengName">
      <van-field
        v-model="queryForms.buyerengName"
        label="买方名称"
        placeholder="请输入买方名称"
    /></van-row>
    <!-- 采购入库单及调整单查询字段 -->
    <van-row v-if="isShowPurchaseNo">
      <van-field
        v-model="queryForms.purchaseNo"
        label="内采合同"
        placeholder="请输入内采合同"
      />
    </van-row>
    <van-row v-if="isShowWareLoc">
      <van-field
        v-model="queryForms.wareLoc"
        label="仓库"
        placeholder="请输入仓库"
    /></van-row>
    <van-row v-if="isShowWareDateRange">
      <van-field
        v-model="queryForms.wareDateRange"
        is-link
        label="制单日期"
        placeholder="制单日期"
        @click="dateTimeFieldClick('wareDateRange')"
    /></van-row>
    <van-row v-if="isShowYsFlag">
      <RcmSelect
        :select-label="'refValue'"
        :select-value="'refValueCode'"
        :options="ysFlagList"
        :textAlign="'right'"
        :label="'验收状态'"
        :placeholder="'验收状态'"
        :readonly="false"
        :isRightArrow="true"
        :position="'bottom'"
        :field="queryForms.ysFlag"
        :valueKey="'refValue'"
        @change="({label, value}) => changeRcmSelect({label, value}, 'ysFlag')"
      />
    </van-row>
    <!-- 销售发票查询字段 -->
    <van-row v-if="isShowIsNo">
      <van-field
        v-model="queryForms.isNo"
        label="销售合同"
        placeholder="销售合同"
    /></van-row>
    <!-- 出库单 -->
    <van-row v-if="isShowExpNoticNo">
      <van-field
        v-model="queryForms.expNoticNo"
        label="合同号"
        placeholder="合同号"
      />
    </van-row>
    <van-row v-if="isShowWareHsNo">
      <van-field
        v-model="queryForms.wareHsNo"
        label="出库单号"
        placeholder="出库单号"
    /></van-row>
  </van-form>
  <div class="btn-tool">
    <van-button
      round
      color="#1fa2e8"
      type="primary"
      size="small"
      class="width:50%"
      @click="query()"
      >查找
    </van-button>

    <van-button
      round
      type="danger"
      size="small"
      color="#e85452"
      @click="resetQuery()"
      >重置</van-button
    >
  </div>
  <!-- 时间选择 -->
  <van-calendar
    v-model:show="selectTimeShow"
    @confirm="selectDateTime"
    :min-date="minDate"
    :type="getType"
  />
</template>



<script>
import { computed, provide } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { 
  getTable3XByDoc,
  getAuditStatusList 
} from "@/api/common";

export default {
  name: "Search",
  components: { TitleBar },
  props: {
    title: {
      type: String,
      default: ""
    },
    orgCoNo: {
      type: String,
      default: "",
    },
    queryForm: {
      type: Object,
      default: () => ({}),
    },
    isShowCreditNo: {
      type: Boolean,
      default: false
    },
    isShowCoNamee: {
      type: Boolean,
      default: false
    },
    isShowInvoiceNo: {
      type: Boolean,
      default: false
    },
    isShowOrderNo: {
      type: Boolean,
      default: false
    },
    // 出口报关单查询字段
    isShowEntry_Id: {
      type: Boolean,
      default: false
    },
    isShowD_Date1: {
      type: Boolean,
      default: false
    },
    isShowD_Date2: {
      type: Boolean,
      default: false
    },
    isShowIeDate1: {
      type: Boolean,
      default: false
    },
    isShowIeDate2: {
      type: Boolean,
      default: false
    },
    isShowSeq_No: {
      type: Boolean,
      default: false
    },
    isShowMatchFlag: {
      type: Boolean,
      default: false
    },
    isShowEmployeeName: {
      type: Boolean,
      default: false
    },
    isShowOrgName: {
      type: Boolean,
      default: false
    },
    isShowCoNameE: {
      type: Boolean,
      default: false
    },
    isShowAuditStatu: {
      type: Boolean,
      default: false
    },
    isShowInvoiceDate: {
      type: Boolean,
      default: false
    },
    isShowPdtNamee: {
      type: Boolean,
      default: false
    },
    // 采购发票查询
    isShowPoInvoiceNo: {
      type: Boolean,
      default: false
    },
    isShowIssueDate: {
      type: Boolean,
      default: false
    },
    isShowPdtName: {
      type: Boolean,
      default: false
    },
    isShowPoNo: {
      type: Boolean,
      default: false
    },
    // 付款通知单
    isShowPayNo: {
      type: Boolean,
      default: false
    },
    isShowRcvCoName: {
      type: Boolean,
      default: false
    },
    isShowPayDateRange: {
      type: Boolean,
      default: false
    },
    isShowProdName: {
      type: Boolean,
      default: false
    },
    isShowPayType: {
      type: Boolean,
      default: false
    },
    isShowAuditStatus: {
      type: Boolean,
      default: false
    },
    // 授信额度申请
    isShowApplyNo: {
      type: Boolean,
      default: false
    },
    isShowCustName: {
      type: Boolean,
      default: false
    },
    isShowInputDateRange: {
      type: Boolean,
      default: false
    },
    isShowProductName: {
      type: Boolean,
      default: false
    },
    isShowQuotaType: {
      type: Boolean,
      default: false
    },
    // 中信保接口限额余额
    isShowQuotaNo: {
      type: Boolean,
      default: false
    },
    isShowBuyerNo: {
      type: Boolean,
      default: false
    },
    isShowBuyerengName: {
      type: Boolean,
      default: false
    },
    // 采购入库单及调整单
    isShowPurchaseNo: {
      type: Boolean,
      default: false
    },
    isShowWareLoc: {
      type: Boolean,
      default: false
    },
    isShowWareDateRange: {
      type: Boolean,
      default: false
    },
    isShowYsFlag: {
      type: Boolean,
      default: false
    },
    // 销售发票
    isShowSalePoNo: {
      type: Boolean,
      default: false
    },
    isShowIsNo: {
      type: Boolean,
      default: false
    },
    // 出库单
    isShowExpNoticNo: {
      type: Boolean,
      default: false
    },
    isShowWareHsNo: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    getType() {
      if(
        this.isShowIssueDate 
        || this.isShowPayDateRange 
        || this.isShowInputDateRange
        || this.isShowWareDateRange
      ) {
        return 'range';
      }
      return 'single';
    },
  },
  data() {
    return {
      queryForms: this.queryForm,
      selectTimeShow: false,
      payTypeList: [], // 付款类型
      auditStatusList: [],
      activeFormFiled: "",
      minDate: new Date(2020, 0, 1),
      matchFlag1List: [
        { refValue: "未匹配", refValueCode: 0 },
        { refValue: "一致", refValueCode: 1 },
        { refValue: "有差异", refValueCode: 2 },
      ],
      quotaTypeList: [
        {id: "赊销额度", text: "赊销额度"},
        {id: "信保额度", text: "信保额度"},
      ],
      ysFlagList: [// 验收标记
        { refValueCode: 0, refValue: "未验收" },
        { refValueCode: 1, refValue: "已验收" }
      ],
    };
  },
  created() {
    getTable3XByDoc({
      objRef: "recMode",
      objectNo: "PM09"
    }).then(res => {
      this.payTypeList.push(...res.data);
    });
    getAuditStatusList({}).then(res => {
      this.auditStatusList.push(...res.data);
    });
  },
  methods: {
    changeRcmSelect({value}, field) {
      this.queryForms[field] = value;
    },
    ///   单击事件  应该跳转
    itemClick(item) {
      this.$emit("selectVendorItem", item);
    },

    query() {
      this.$emit("doSearchOrder", this.queryForms);
    },
    resetQuery() {
      // this.queryForms = {};
      for(var key in this.queryForms) {
        if(key !== "objectNo" && key !== "pageNum" && key !== "pageSize") {
          this.queryForms[key] = "";
        }
      }
    },
    cancel() {
      this.$emit("cancelQuery");
    },
    dateTimeFieldClick(item) {
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    selectDateTime(val) {
      if (this.activeFormFiled === "payDate") {
        this.queryForms.payDate = dateFormat(val);
      } else if (this.activeFormFiled === "d_Date1") {
        this.queryForms.d_Date1 = dateFormat(val);
      } else if (this.activeFormFiled === "d_Date2") {
        this.queryForms.d_Date2 = dateFormat(val);
      } else if (this.activeFormFiled === "ieDate1") {
        this.queryForms.ieDate1 = dateFormat(val);
      } else if (this.activeFormFiled === "ieDate2") {
        this.queryForms.ieDate2 = dateFormat(val);
      } else if (this.activeFormFiled === "invoiceDate") {
        this.queryForms.invoiceDate = dateFormat(val);
      } else if (this.activeFormFiled === "issueDateRange" 
      || this.activeFormFiled === "payDateRange" 
      || this.activeFormFiled === "inputDateRange" 
      || this.activeFormFiled === "wareDateRange" 
      ) {
        const [startDate, endDate] = val; 
        this.$emit("selectDateTime", { startDate, endDate });
      } else if (this.activeFormFiled === "invoiceDate") {
        this.queryForms.invoiceDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
  },
  setup(props) {
    provide("title", computed(() => `${props.title}查询`));
    // provide("title", "出口信用证查询");
  },
};
</script>
<style scoped lang="less">
.btn-tool {
  margin-top: 25px;
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
  margin-top: 20px;
  height: calc(100vh - 81.47px);
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
</style>