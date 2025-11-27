<template>
  <TitleBar />
  <van-form>
    <van-row>
      <van-field
        v-model="queryForms.isNo"
        name="销售合同号"
        label="销售合同号"
        placeholder="销售合同号"
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
        v-model="queryForms.signDate"
        is-link
        name="签约日期"
        label="签约日期"
        placeholder="签约日期"
        readonly
        @click="dateTimeFieldClick('signDate')"
    /></van-row>
    <van-row>
      <van-field
        v-model="auditStatusValue"
        is-link
        readonly
        name="审批状态"
        label="审批状态"
        placeholder="请选择审批状态"
        @click="mainFieldClick('auditStatus')"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.sapOrderNo"
        label-width="105"
        name="SAP销售订单号"
        label="SAP销售订单号"
        placeholder="SAP销售订单号"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.orgName"
        name="部门"
        label="部门"
        placeholder="部门"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.employeeName"
        name="业务员"
        label="业务员"
        placeholder="业务员"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.docVersion"
        name="版本号"
        label="版本号"
        placeholder="版本号"
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
  <van-action-sheet
    ref="actionSheet"
    v-model:show="actionShow"
    :actions="actionItems"
    :click-overlay="onOver"
    @select="selectItemAction"
    description="审批状态"
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
import { dateFormat, moneyFormat } from "@/utils/format";

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
  },
  data() {
    return {
      queryForms: this.queryForm,
      selectTimeShow: false,
      actionShow: false,
      auditStatusValue: "",
      actionItems: [
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
    ///   单击事件  应该跳转
    itemClick(item) {
      console.log("选中了某个", item);
      this.$emit("selectVendorItem", item);
    },

    query() {
      this.$emit("doSearchOrder", this.queryForms);
    },
    resetQuery() {
      this.queryForms = {};
      this.auditStatusValue = "";
    },
    cancel() {
      this.$emit("cancelQuery");
    },
    dateTimeFieldClick(item) {
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    selectDateTime(val) {
      if (this.activeFormFiled === "signDate") {
        this.queryForms.signDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    mainFieldClick(item) {
      this.actionShow = true;
    },
    selectItemAction(item) {
      //console.log("选择了", item);
      this.queryForms.auditStatus = item.code;
      if (item.code === "") {
        this.auditStatusValue = "";
      } else {
        this.auditStatusValue = item.name;
      }

      this.actionShow = false;
    },
  },
  setup() {
    provide("title", "销售合同查询");
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