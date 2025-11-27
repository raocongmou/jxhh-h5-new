<template>
  <TitleBar />
  <van-form>
    <van-row>
      <van-field
        v-model="queryForms.poNo"
        name="内采合同号"
        label="内采合同号"
        placeholder="内采合同号"
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
        v-model="queryForms.isDate"
        readonly
        is-link
        name="制单日期"
        label="制单日期"
        placeholder="制单日期"
        @click="dateTimeFieldClick('isDate')"
    /></van-row>
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
        v-model="queryForms.sapType"
        is-link
        readonly
        name="SAP接口状态"
        label="SAP接口状态"
        placeholder="SAP接口状态"
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
      @click="cancel()"
      >取消</van-button
    >
  </div>
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
import { getAuditStatusList } from "@/api/common";

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
      activeFormFiled: "",
      selectTimeShow: false,
      queryForms: this.queryForm,
      auditStatusList: [],
    };
  },
  created() {
    getAuditStatusList({}).then(res => {
      this.auditStatusList.push(...res.data);
    })
  },
  mounted() {},
  watch: {
    queryForm: {},
  },
  methods: {
    selectDateTime(val) {
      if (this.activeFormFiled === "isDate") {
        this.queryForms.isDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    dateTimeFieldClick(item) {
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    changeRcmSelect({ value }, field) {
      this.queryForms[field] = value;
    },
    ///   单击事件  应该跳转
    itemClick(item) {
      console.log("选中了某个", item);
      this.$emit("selectVendorItem", item);
    },

    query() {
      this.queryForms.initQuery = "N";
      this.$emit("doSearchOrder", this.queryForms);
    },
    cancel() {
      this.$emit("cancelQuery");
    },
  },
  setup() {
    provide("title", "采购合同查询");
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