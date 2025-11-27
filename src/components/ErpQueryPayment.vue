<template>
  <TitleBar />
  <van-form>
    <van-row>
      <van-field
        v-model="queryForms.payNo"
        name="付款单号"
        label="付款单号"
        placeholder="付款单号"
      />
    </van-row>
    <van-row>
      <van-field
        v-model="queryForms.rcvCoName"
        name="收款公司"
        label="收款公司"
        placeholder="收款公司"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.payDate"
        readonly
        is-link
        name="制单日期"
        label="制单日期"
        placeholder="制单日期"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.prodName"
        name="商品名称"
        label="商品名称"
        placeholder="商品名称"
    /></van-row>
    <van-row>
      <van-field
        v-model="queryForms.payType"
        name="付款类型"
        label="付款类型"
        placeholder="付款类型"
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
</template>



<script>
import { provide } from "vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "ErpQueryPayment",
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
    cancel() {
      this.$emit("cancelQuery");
    },
  },
  setup() {
    provide("title", "付款单查询");
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