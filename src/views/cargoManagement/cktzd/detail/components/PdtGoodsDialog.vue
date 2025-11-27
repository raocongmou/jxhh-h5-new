<template>
  <TitleBar />
  <!--增删改查 工具栏 -->
  <div class="tool_bar">
    <van-button size="small" type="primary" @click="query">查找</van-button>
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="isNoName"
    />
  </div>

  <Scroll
    class="wrapper"
    :data="data"
    wrapper="employee"
    :dataToal="total"
    :pullup="pullup"
    :pulldown="pulldown"
    @scrollToTop="freshData"
    @scrollToEnd="loadData"
  >
    <!-- {{ item.orgFullName }}  -->
    <div class="content">
      <div v-for="(item, i) in data" :key="i">
        <div class="company-money">
          <span>{{ item.pdtNo }}</span>
        </div>
        <div class="company-money">
          <span>{{ item.pdtName }}</span>
        </div>
        <div class="company-money">
          <span>{{ item.wareLoc }}</span>
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
import { computed, provide } from "vue";

import Scroll from "@/components/Scroll.vue";
import { getIsNoList } from "@/api/wareHouseCKD";
import { getStorage } from "@/utils/storage";
import TitleBar from "@/components/TitleBar.vue";
import { getAccountList } from "@/api/erp.warehouse";

export default {
  name: "PdtGoodsDialog",

  components: { Scroll, TitleBar },

  props: {
    isShowExpNoticNoOrSalesGoods: {
      type: Boolean,
      default: false,
    },
    objectNo3: {
      type: String,
      default: ""
    },
    ckListForm: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      total: 0,
      pageNum: 0,
      // employeeName: "",
      // wareLocName: "",
      isNoName: "",
      // 定义多选数组
      selectionsArr: [],
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    listData(value) {
      this.data = this.data.concat(value);
      this.data.forEach(item => {
        item.checked = false;
      });
      console.log("checked", this.data);
    },
    isShowExpNoticNoOrSalesGoods: {
      handler(oldVal, newVal) {
        if (oldVal) {
          this.query();
        }
      },
    },
  },
  computed: {
    hasChecked() {
      // 判断data内是不是每一个复选框都是false状态,如果是那么返回true,即<完成>按钮无法点击
      return this.data.every(item => !item.checked);
    }
  },
  methods: {
    // 完成按钮处理事件
    commitSelect() {
      this.$emit("PdtGoodsSelect", this.selectionsArr);
    },
    selectChecked(checked, item) {
      checked = !checked;
      if(item.checked) {
        this.selectionsArr.push(item);
      } else {
        this.selectionsArr.splice(this.selectionsArr.findIndex(iten => iten.oid === item.oid), 1);
      }
    },
    query() {
      this.freshData();
      this.loadData();
    },
    freshData() {
      this.pageNum = 0;
      this.data = [];
      // 下拉刷新的时候，不需要主动调用一次函数，只需要对应的数据重置归零就可以
      //this.loadData();
    },
    // 待处理饶
    loadData() {
      // this.data = [
      //   { pdtNo: "110", pdtName: "前端录入测试0", wareLoc: "前端虚拟库0" },
      //   { pdtNo: "111", pdtName: "前端录入测试1", wareLoc: "前端虚拟库1" },
      //   { pdtNo: "112", pdtName: "前端录入测试2", wareLoc: "前端虚拟库2" },
      //   { pdtNo: "113", pdtName: "前端录入测试3", wareLoc: "前端虚拟库3" },
      // ];
      this.pageNum = this.pageNum + 1;
      let params = {
        pageSize: 20,
        pageNum: this.pageNum,
        wareLocNo: this.ckListForm.wareLocNo,
        wareLoc: this.ckListForm.wareLoc,
        lotNo: this.ckListForm.lotNo,
        factory: this.ckListForm.factory,
        pdtNo1: this.ckListForm.pdtNo1
      };
      
      getAccountList(params).then((res) => {
        this.data = this.data.concat(res.data);
        this.data.forEach(item => {
          item.checked = false;
        });
        this.total = res.total;
      });
    },
  },
  setup(props) {
    console.log("props", props);
    provide("title", computed(() => `选择${props.objectNo3 === "SD01" ? "出口发票" : 
    props.objectNo3 === "SM07" ? "转口销售" : ""}商品`));
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
  height: calc(75vh - 80.47px);
  width: 95%;
  overflow: hidden;
  // position: relative;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 105vw;
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