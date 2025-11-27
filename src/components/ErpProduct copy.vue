<template>
  <TitleBar />
  <div class="tool_bar">
    <van-button size="small" type="primary">查找</van-button>
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
          <span>
            {{ item.sapUnit }} {{ item.pdtNameC }}
            {{ item.uom }}
          </span>
        </div>
      </div>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import Scroll from "@/components/Scroll.vue";

import { listProduct } from "@/api/erp.pdt.js";

export default {
  name: "ErpProductSelect",
  props: {
    orgNo: {
      type: String,
      default: "",
    },
  },
  components: { TitleBar, Scroll },

  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      total: 0,
      pageNum: 0,
    };
  },
  created() {
    this.loadData();
  },
  mounted() {},

  watch: {
    listData(value) {
      this.data = this.data.concat(value);
    },
  },

  methods: {
    itemClick(item) {
      ///   单击事件  应该跳转
      this.$emit("selectItemProduct", item);
    },

    freshData() {
      this.pageNum = 0;
      this.data = [];
      ///     下拉刷新的时候，不需要主动调用一次函数，只需要对应的数据重置归零就可以
      //this.loadData();
    },

    loadData() {
      this.pageNum = this.pageNum + 1;
      var param = {
        orgCoNo: "0201",
        pageSize: 20,
        pageNum: this.pageNum,
        orgNo: this.orgNo,
        productName: "",
        sort: "",
        sortOrder: "",
      };
      listProduct(param).then((res) => {
        //this.data.push(...res.data)
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },
  },
  setup() {
    provide("title", "选择明细商品");
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

.wrapper {
  background-color: #eeeeee;
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