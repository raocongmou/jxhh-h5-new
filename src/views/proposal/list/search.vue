<template>
  <TitleBar />
  <van-form>
    <van-row>
      <van-field
        v-model="queryForms.poNo"
        name="询价单号"
        label="询价单号"
        placeholder="询价单号"
      />
    </van-row>
    <van-row>
      <van-field
        v-model="queryForms.vendorName"
        name="客户"
        label="客户"
        placeholder="客户"
    /></van-row>
    <van-row>
      <van-field
        readonly
        v-model="queryForms.startPoDate"
        is-link
        label-width="125"
        name="制单日期（起）"
        label="制单日期（起）"
        placeholder="制单日期（起）"
        @click="dateTimeFieldClick('startPoDate')"
    /></van-row>

    <van-row>
      <van-field
        readonly
        v-model="queryForms.endPoDate"
        label-width="125"
        is-link
        name="制单日期（止）"
        label="制单日期（止）"
        placeholder="制单日期（止）"
        @click="dateTimeFieldClick('endPoDate')"
    /></van-row>

    <van-row>
      <van-field
        v-model="queryForms.payMode"
        is-link
        name="结算方式"
        label="结算方式"
        placeholder="结算方式"
        @click="mainFieldClick('payMode')"
    /></van-row>
    <!-- <van-row>
      <van-field
        v-model="queryForms.auditStatus"
        is-link
        readonly
        name="审批状态"
        label="审批状态"
        placeholder="请选择审批状态"
        @click="mainFieldClick('auditStatus')"
    /></van-row> -->
    <van-row>
      <RcmSelect
        :select-label="'statusName'"
        :select-value="'statusCode'"
        :valueKey="'statusName'"
        :options="auditStatusList"
        :label="'审批状态'"
        :placeholder="'审批状态'"
        :readonly="false"
        :isRightArrow="true"
        :field="queryForms.auditStatus"
        @change="({label, value}) => changeRcmSelect({label, value}, 'auditStatus')"
      />
    </van-row>
    <van-row>
      <van-field
        v-model="queryForms.employeeName"
        name="业务员"
        label="业务员"
        placeholder="业务员"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.orgName"
        name="部门"
        label="部门"
        placeholder="部门"
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

  <!-- 下滑弹窗 主要是一些配置项 -->
  <!-- <van-action-sheet
    ref="actionSheet"
    v-model:show="auditStatusSelectShow"
    :actions="auditStatusSelectItems"
    :click-overlay="onOver"
    @select="selectAuditStatusAction"
    description="审批状态"
    :close-on-click-overlay="overlay"
    cancel-text="取消"
  /> -->
  <van-action-sheet
    ref="actionSheet"
    v-model:show="payModeSelectShow"
    :actions="payModeItems"
    :click-overlay="onOver"
    @select="selectPayModeAction"
    description="结算方式"
    :close-on-click-overlay="overlay"
    cancel-text="取消"
  />

  <!-- 时间选择 -->
  <van-calendar
    v-model:show="selectTimeShow"
    @confirm="selectDateTime"
    :min-date="minDate"
  />
</template>


<script>
import { provide } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import { dateFormat } from "@/utils/format";

export default {
  name: "ErpQueryInlandSale",
  components: { TitleBar },
  props: {
    ////
    orgCoNo: {
      type: String,
      default: "",
    },
    queryForm: {
      type: Object,
      default: () => ({}),
    },
    auditStatusList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      queryForms: this.queryForm,
      // 选择 审批状态
      auditStatusSelectShow: false,
      auditStatusValue: "",
      payModeSelectShow: false,

      selectTimeShow: false,
      payModeItems: [
        { name: "款到发货", code: "款到发货" },
        { name: "分批款到发货", code: "分批款到发货" },
        {
          name: "货到付款，需方应在收到货物后30天内付清货款",
          code: "货到付款，需方应在收到货物后30天内付清货款",
        },
        { name: "不作为检索条件", code: "" },
      ],
      auditStatusSelectItems: [
        { name: "未申请审批", code: "D" },
        { name: "申请审批", code: "S" },
        { name: "审批同意", code: "Y" },
        { name: "审批不同意", code: "N" },
        { name: "申请撤销", code: "SU" },
        { name: "撤销同意", code: "UN" },
        { name: "上报", code: "UP" },
        { name: "不作为检索条件", code: "" },
      ],
      activeFormFiled: "",
      minDate: new Date(2020, 0, 1),
    };
  },
  created() {},
  mounted() {},
  watch: {
    queryForm: {},
  },
  methods: {
    // 下拉框选择改变
    changeRcmSelect({ value }, field) {
      this.queryForms[field] = value;
    },
    /// 点击查询
    query() {
      this.$emit("doSearchOrder", this.queryForms);
    },
    /// 取消
    cancel() {
      this.$emit("cancelQuery");
    },
    /// 重置查询条件
    resetQuery() {
      for(let key in this.queryForms) {
        this.queryForms[key] = null;
      }
    },
    /// 日期录入框点击
    dateTimeFieldClick(item) {
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    /// 实际选择日期之后的操作
    selectDateTime(val) {
      if (this.activeFormFiled === "startPoDate") {
        this.queryForms.startPoDate = dateFormat(val);
      } else if (this.activeFormFiled === "endPoDate") {
        this.queryForms.endPoDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    //// 选择框点击事事件
    mainFieldClick(item) {
      if (item === "auditStatus") {
        this.auditStatusSelectShow = true;
      } else if (item === "payMode") {
        this.payModeSelectShow = true;
      }
    },
    //// 下拉框选择之后的点击事件
    selectAuditStatusAction(item) {
      this.queryForms.auditStatus = item.code;
      if (item.code === "") {
        this.auditStatusValue = "";
      } else {
        this.auditStatusValue = item.name;
      }

      this.auditStatusSelectShow = false;
    },
    selectPayModeAction(item) {
      this.queryForms.payMode = item.code;
      this.payModeSelectShow = false;
    },
  },

  setup() {
    provide("title", "询价单查询");
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