<template>
  <TitleBar />
  <div class="tool_bar">
    <van-button size="mini" type="primary" @click="query">查找</van-button>
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="orderNo"
      placeholder="合同号"
    />
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="pdtNameC"
      placeholder="商品名称"
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
      <div v-for="(item, i) in data" :key="i">
      <!-- <div v-for="(item, i) in data" :key="i" @click="itemClick(item)"> -->
        <div class="company-money">
          <span>出口合同号: {{ item.orderNo }} </span>
          <span>公司商品号: {{ item.pdtNo1 }} </span>
          <span>中文名称: {{ item.pdtNameC }} </span>
        </div>
        <div class="multi-checkbox">
          <van-checkbox v-model="item.checked" @click="selectChecked(item.checked, item)" />
        </div>
      </div>
    </div>
    <div class="commit-btn">
      <van-button type="primary" :disabled="hasChecked" size="small" @click="commitSelect">完成</van-button>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";
import TitleBar from "@/components/TitleBar.vue";
import { findOrderItem } from "@/api/exportTrade/document";
import { getDefaultOrgCoNo } from "@/utils/user.setting";

export default {
  name: "ExecOrderGoodsDialog",
  components: { Scroll, TitleBar },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    showExecOrderGoods: {
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
      orderNo: "",
      pdtNameC: "",
      selectionsArr: []
    };
  },
  created() {
    this.loadData();
  },
  setup() {
    provide("title", "选择出口合同商品");
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    hasChecked() {
      // 判断data内是不是每一个复选框都是false状态,如果是那么返回true,即<完成>按钮无法点击
      return this.data.every(item => !item.checked);
    }
  },
  watch: {
    listData(value) {
      this.data = this.data.concat(value);
    },
    showExecOrderGoods: {
      handler(oldVal, newVal) {
        if (oldVal) {
          this.query();
        }
      },
    },
  },
  methods: {
    // 完成按钮处理事件
    commitSelect() {
      this.$emit("handleMutiSelectGoods", this.selectionsArr);
    },
    selectChecked(checked, item) {
      checked = !checked;
      if(item.checked) {
        this.selectionsArr.push(item);
      } else {
        this.selectionsArr.splice(this.selectionsArr.findIndex(iten => iten.docEntry === item.docEntry), 1);
      }
    },
    query() {
      this.freshData();
      this.loadData();
    },
    freshData() {
      this.pageNum = 0;
      this.data = [];
      this.selectionsArr = [];
    },

    loadData() {
      this.pageNum = this.pageNum + 1;
      var param = {
        orgCoNo: getDefaultOrgCoNo(),
        pageSize: 20,
        pageNum: this.pageNum,
        orderNo: this.orderNo,
        pdtnamee: this.pdtNameC,
      };
      findOrderItem(param).then((res) => {
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
      .multi-checkbox {
        width: 65%;
      }
    }
  }
  &>div:last-child {
    width: 100%;
    position: absolute;
    bottom: 0px;
    margin: auto;
    .van-button--small {
      width: 100%;
    }
  }
}
::v-deep {
  .van-checkbox__icon .van-icon {
    border: 1px solid #000 !important;
  }
}
</style>