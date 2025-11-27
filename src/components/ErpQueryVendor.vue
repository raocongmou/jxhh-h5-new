<template>
  <TitleBar />
  <van-form>
    <van-row>
      <van-field
        v-model="queryForms.sapcode"
        name="SAP编号"
        label="SAP编号"
        placeholder="请输入SAP编号"
      />
    </van-row>
    <van-row>
      <van-field
        v-model="queryForms.conamec"
        name="中文名称"
        label="中文名称"
        placeholder="请输入中文名称"
    /></van-row>
    <van-row>
      <van-field
        v-model="type6Value"
        is-link
        readonly
        name="是否海外"
        label="是否海外"
        placeholder="请选择是否海外"
        @click="mainFieldClick('type6')"
    /></van-row>
    <van-row>
      <van-field
        v-model="typeValue"
        is-link
        readonly
        name="公司类型"
        label="公司类型"
        placeholder="请选择公司类型"
        @click="mainFieldClick('type')"
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
        v-model="queryForms.employeename"
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
  <van-action-sheet
    ref="actionSheet"
    v-model:show="actionShow"
    :actions="actionItems"
    :click-overlay="onOver"
    @select="selectItemAction"
    :description="itemSelectDesc"
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
  name: "ErpQueryVendor",
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
      activeItemField: "",
      queryForms: this.queryForm,
      selectTimeShow: false,
      actionShow: false,
      auditStatusValue: "",
      type6Value: "",
      typeValue: "",
      itemSelectDesc: "",
      actionItems: [],
      auditStatusItems: [
        { name: "未申请审批", code: "D" },
        { name: "申请审批", code: "S" },
        { name: "审批同意", code: "Y" },
        { name: "审批不同意", code: "N" },
        { name: "申请撤销", code: "SU" },
        { name: "撤销同意", code: "UN" },
        { name: "上报", code: "UP" },
        { name: "不作为检索条件", code: "" },
      ],
      type6Items: [
        { name: "境内", code: "A" },
        { name: "境外", code: "B" },
        //{ name: "不作为检索条件", code: "" },
      ],
      typeItems: [
        { name: "客户", code: "Y" },
        { name: "供应商", code: "N" },
        // { name: "物流公司", code: "type3" },
        // { name: "仓库", code: "type13" },
        // { name: "保险公司", code: "type4" },
        // { name: "集团往来", code: "type5" },
        // { name: "后勤往来", code: "type10" },
        // { name: "个人往来", code: "type8" },
        // { name: "银行", code: "type9" },
        // { name: "协作方", code: "type11" },
        // { name: "店铺", code: "type14" },
        // { name: "其他", code: "type7" },
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
      this.auditStatusValue = "";
      this.type6Value = "";
      this.typeValue = "";
      this.queryForms = {};
    },
    cancel() {
      this.$emit("cancelQuery");
    },
    dateTimeFieldClick(item) {
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    selectDateTime(val) {
      if (this.activeFormFiled === "isDate") {
        this.queryForms.isDate = dateFormat(val);
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    mainFieldClick(item) {
      this.activeItemField = item;
      if (item === "auditStatus") {
        this.itemSelectDesc = "请选择审批状态";
        this.actionItems = this.auditStatusItems;
        this.actionShow = true;
      } else if (item === "type6") {
        this.itemSelectDesc = "请选择境内外";
        this.actionItems = this.type6Items;
        this.actionShow = true;
      } else if (item === "type") {
        this.itemSelectDesc = "请选择公司类型";
        this.actionItems = this.typeItems;
        this.actionShow = true;
      }
    },
    selectItemAction(item) {
      if (this.activeItemField === "auditStatus") {
        //console.log("选择了", item);
        this.queryForms.auditStatus = item.code;
        if (item.code === "") {
          this.auditStatusValue = "";
        } else {
          this.auditStatusValue = item.name;
        }

        this.actionShow = false;
      } else if (this.activeItemField === "type6") {
        //console.log("选择了", item);
        this.queryForms.type6 = item.code;
        if (item.code === "") {
          this.type6Value = "";
        } else {
          this.type6Value = item.name;
        }
        this.actionShow = false;
      } else if (this.activeItemField === "type") {
        //console.log("选择了", item);
        this.queryForms.type1 = item.code;
        if (item.code === "") {
          this.typeValue = "";
        } else {
          this.typeValue = item.name;
        }
        this.actionShow = false;
      }
    },
  },
  setup() {
    provide("title", "往来单位查询");
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