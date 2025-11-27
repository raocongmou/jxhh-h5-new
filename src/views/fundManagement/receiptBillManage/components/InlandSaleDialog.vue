<template>
  <TitleBar />
  <div class="tool_bar">
    <van-button size="small" type="primary" @click="query">查找</van-button>
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="isNo"
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
        <div class="vendor-name">
          <span>{{ item.isNo }}</span>
        </div>
        <div class="vendor-name">
          <span>{{ item.empName }}</span>
        </div>
        <div class="vendor-name">
          <span>{{ item.vendorName }}</span>
        </div>
        <div class="vendor-name">
          <span>{{ item.orgName }}</span>
        </div>
      </div>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";
import TitleBar from "@/components/TitleBar.vue";
import { listRe02 } from "@/api/erp.isinland";
import { listProduct } from "@/api/erp.pdt.js";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
export default {
  name: "InlandSaleDialog",
  components: { Scroll, TitleBar },
  props: {
    showInlandSale: {
      type: Boolean,
      default: false,
    },
    vendorNo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      isNo: "",
      total: 0,
      pageNum: 0,
    };
  },
  watch: {
    showInlandSale: {
      handler(oldVal, newVal) {
        if (oldVal) {
          this.query();
        }
      },
    },
    listData(value) {
      this.data = this.data.concat(value);
    },
  },
  created() {
    this.loadData();
  },

  mounted() {},
  methods: {
    ///   单击事件  应该跳转
    itemClick(item) {
      this.$emit("selectInlandSale", item);
    },
    query() {
      this.freshData();
      this.loadData();
    },
    freshData() {
      this.pageNum = 0;
      this.data = [];
    },

    loadData() {
      this.pageNum = this.pageNum + 1;
      var param = {
        orgCoNo: getDefaultOrgCoNo(),
        pageSize: 20,
        pageNum: this.pageNum,
        isNo: this.isNo,
        vendorNo: this.vendorNo,
        sort: "",
        sortOrder: "",
      };
      listRe02(param).then((res) => {
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },
  },
  setup() {
    provide("title", "选择销售合同");
  },
  activated() {
    this.loadData();
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
      width: 80vw;
      margin: 5px auto;
      padding-left: 5px;
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