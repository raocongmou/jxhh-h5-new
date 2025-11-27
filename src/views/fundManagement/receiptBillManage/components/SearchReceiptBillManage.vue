<template>
  <TitleBar />
  <van-form>
    <van-row>
      <van-field
        v-model="queryForms.raNo"
        label="收款单号"
        placeholder="请输入收款单号"
      />
    </van-row>
    <van-row>
      <van-field
        v-model="queryForms.paymentCo"
        label="付款单位"
        placeholder="请输入付款单位"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.issueDate"
        is-link
        readonly
        label="制单日期"
        placeholder="制单日期"
        @click="dateTimeFieldClick('issueDate')"
    /></van-row>
    <van-row>
      <!-- <van-field
        v-model="queryForms.comform"
        label="确认标识"
        placeholder="请输入确认标识"
      /> -->
      <RcmSelect
        :select-label="'label'"
        :select-value="'value'"
        :options="comformFlagList"
        :textAlign="'left'"
        :label="'确认标识'"
        :placeholder="'确认标识'"
        :readonly="false"
        :isRightArrow="true"
        :field="queryForms.comform"
        :valueKey="'label'"
        @change="changeComform"
      />
    </van-row>
    <van-row>
      <van-field
        v-model="queryForms.orgName"
        label="部门"
        placeholder="请输入部门"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.employeeName"
        label="业务员"
        placeholder="请输入业务员"
    /></van-row>
    <!-- <van-row>
      <RcmSelect
        :select-label="'refValue'"
        :select-value="'refValueCode'"
        :options="payTypeList"
        :textAlign="'right'"
        :label="'付款类型'"
        :name="'付款类型'"
        :placeholder="'付款类型'"
        :readonly="false"
        :isRightArrow="true"
        :position="'bottom'"
        :field="queryForms.payType"
        :valueKey="'refValue'"
        @change="changePayType"
      />
    </van-row> -->
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
    type="range"
    color="#1989fa"
    :min-date="minDate"
  />
</template>



<script>
import { provide } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getTable3XByDoc } from "@/api/common";

export default {
  name: "SearchReceiptBillManage",
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
      payTypeList: [], // 付款类型
      auditStatusValue: "",
      activeFormFiled: "",
      minDate: new Date(2020, 0, 1),
      // 确认状态
      comformFlagList: [
        { value: "Y", label: "已确认" },
        { value: "N", label: "末确认" }
      ],
    };
  },
  created() {
    getTable3XByDoc({
      objRef: "recMode",
      objectNo: "PM09"
    }).then(res => {
      this.payTypeList.push(...res.data);
    })
  },
  methods: {
    // 监听付款类型改变
    changeComform({ label, value }) {
      this.queryForms.comform = value;
    },
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
    },
    cancel() {
      this.$emit("cancelQuery");
    },
    dateTimeFieldClick(item) {
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    selectDateTime(val) {
      const [startDate, endDate] = val; 
      if (this.activeFormFiled === "issueDate") {
        this.$emit("selectDateTime", { startDate, endDate });
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
  },
  setup() {
    provide("title", "收款领用查询");
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