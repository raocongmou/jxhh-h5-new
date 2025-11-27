<template>
  <TitleBar />
  <div class="tool_bar">
    <van-button size="small" type="primary" @click="query">查找</van-button>
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="vendorName"
    />
  </div>

  <Scroll
    class="wrapper"
    :data="data"
    :dataToal="total"
    :pullup="pullup"
    :pulldown="pulldown"
    @scrollToTop="freshData"
    @scrollToEnd="loadData"
  >
    <div class="content">
      <div v-for="(item, i) in data" :key="i" @click="itemClick(item)">
        <div class="company-money">
          <span>编号: {{ item.vendorNo1 }} </span>
          <span>助记码: {{ item.zjm }} </span>
          <span>公司名称: {{ item.coNameC }} </span>
        </div>
      </div>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";
import TitleBar from "@/components/TitleBar.vue";

import { findVendorByName } from "@/api/erp.vendor.js";
import { getDefaultOrgCoNo } from "@/utils/user.setting";

export default {
  name: "ErpVendorSelect",
  components: { Scroll, TitleBar },
  props: {
    employeeNo: {
      type: String,
      default: "",
    },
    showVendor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      total: 0,
      pageNum: 0,
      vendorName: "",
    };
  },
  created() {
    this.loadData();
  },
  setup() {
    provide("title", "选择往来单位");
  },
  beforeMount() {
    this.loadData();
  },
  mounted() {},
  watch: {
    listData(value) {
      this.data = this.data.concat(value);
    },
    showVendor: {
      handler(oldVal, newVal) {
        if (oldVal) {
          this.query();
        }
      },
    },
  },

  methods: {
    query() {
      this.freshData();
      this.loadData();
    },
    ///   单击事件  应该跳转
    itemClick(item) {
      console.log("控件中选择", item);
      this.$emit("selectVendorItem", item);
    },

    freshData() {
      this.pageNum = 0;
      this.data = [];
    },

    loadData() {
      this.pageNum = this.pageNum + 1;
      console.log("传入的参数", this.employeeNo);
      var param = {
        orgCoNo: getDefaultOrgCoNo(),
        pageSize: 20,
        pageNum: this.pageNum,
        vendorName: this.vendorName,
        employeeNo: this.employeeNo,
      };
      findVendorByName(param).then((res) => {
        //this.data.push(...res.data)
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },
  },
};
</script>


<style scoped lang="less">
.tool_bar {
  display: flex;
  width: 100%;
  margin-top: 10px;
  button {
    margin-left: 10px;
    width: 20%;
    height: 25px;
  }
}

.van-cell {
  margin-left: 10px;
  padding: 1px;
  width: 68%;
  border: none;
  border-bottom: 1px solid rgb(134, 154, 232);
}
.wrapper {
  background-color: #eeeeee;
  margin-top: 20px;
  height: calc(75vh - 81.47px);
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
          width: 250px;
        }
      }
    }
  }
}
</style>