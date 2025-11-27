<template>
  <Scroll class="wrappers-main wrappers" wrapper="oaStatusRef" ref="oaStatus">
    <div class="content">
      <div v-for="(item, i) in data" :key="i" @click="itemClick(item)">
        <div class="vendor-name">
          <span>名称： {{ item.pdtNameC }} - {{ item.pdtNo1 }}</span>
        </div>
        <div class="vendor-name">
          <span>规格： {{ item.specificationC }}</span>
        </div>
        <div class="vendor-name">
          <span
            >sap单位： {{ item.sapUnit }}&nbsp;&nbsp;&nbsp; sap转换比：{{
              item.sapUnitRate
            }}</span
          >
        </div>
      </div>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";
import TitleBar from "@/components/TitleBar.vue";

import { listProduct } from "@/api/erp.oa.js";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
export default {
  name: "ErpProductSelect",
  components: { Scroll, TitleBar },
  props: {
    orgNo: {
      type: String,
      default: "",
    },
    showItemPdt: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      productName: "",
      total: 0,
      pageNum: 0,
    };
  },
  watch: {
    showItemPdt: {
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
      this.$emit("selectItemProduct", item);
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
        orgNo: this.orgNo,
        productName: this.productName,
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