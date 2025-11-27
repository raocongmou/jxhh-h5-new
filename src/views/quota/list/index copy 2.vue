<template>
  <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }"> </nav-bar>
  <!--增删改查 工具栏 -->

  <div class="list-tool-btn">
    <van-button size="small" icon="search" type="primary" @click="searchOrder"
      >查找</van-button
    >
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
      <div
        v-for="(item, i) in data"
        :key="i"
        @click="itemClick(item)"
        @touchstart="longClickStart(item)"
        @touchend="longClickEnd"
      >
        <!-- <van-form :v-model="item">
          <van-row
            ><van-col span="12">
              <van-field v-model="item.poNo"></van-field>
            </van-col>
            <van-col span="12">
              <van-field v-model="item.objectNo"></van-field>
            </van-col>
          </van-row>
        </van-form> -->
        <div class="contact-number">
          <span>{{ item.applyNo }} - {{ item.custName }} </span>
        </div>
        <div class="company-money">
          <span> 商品名称： {{ item.productName }} </span>
        </div>
        <div class="company-money">
          <span> {{ item.quotaType }}</span>
          <span> {{ item.currency }}</span>
          <span> {{ item.currentAmount }}</span>
        </div>

        <div class="company-money">
          {{ item.orgName }} - {{ item.employeeName }} {{ item.inputDate }}
        </div>
      </div>
    </div>
  </Scroll>

  <van-action-sheet
    v-model:show="longClickShow"
    :actions="longClickActions"
    :click-overlay="onOver"
    @select="longClickAction"
    description="请选择操作"
    :close-on-click-overlay="overlay"
    cancel-text="取消"
  />

  <!-- 侧滑窗口，选择明细的商品 -->
  <van-popup
    v-model:show="showQueryForm"
    position="right"
    :style="{ height: '80%', width: '80%' }"
  >
    <ErpQueryInlandSale
      :queryForm="queryForm"
      v-on="{ doSearchOrder: doSearchOrder, cancelQuery: cancelQuery }"
    ></ErpQueryInlandSale>
  </van-popup>
</template>


<script>
import { provide } from "vue";

import { list } from "@/api/erp.quota.js";

import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import ErpQueryInlandSale from "@/components/ErpQueryInlandSale.vue";

import { getDefaultOrgCoNo } from "@/utils/user.setting";

var timer = null;

export default {
  name: "VendorList",
  components: { NavBar, Scroll, ErpQueryInlandSale },
  data() {
    return {
      longClickActions: [],
      data: [],
      pullup: true,
      pulldown: true,
      total: 0,
      showInfo: true,
      dataShow: false,
      timer: null,
      onceClick: true,
      lastTime: null,
      firstTime: null,
      longClickShow: false,
      ///       长按的明细对象
      longClickTargetItem: null,
      showQueryForm: false,
      queryForm: {
        pageNum: 0,
        pageSize: 6,
        orgCoNo: "",
        isNo: "",
        deptNo: "",
        employeeNo: "",
      },
    };
  },
  created() {
    this.loadData();
  },
  mounted() {},
  watch: {
    // listData(value) {
    //   this.data = this.data.concat(value);
    // },
  },
  methods: {
    handleLongClick(item) {
      // (this.longClickTargetItem = null),
      //   (this.longClickTargetItem = item),
      //   this.createDataLongClickActions(item);
      // this.longClickShow = true;
    },

    createDataLongClickActions(item) {
      //  是否 可以删除
      if (
        item.auditStatu === "N" ||
        item.auditStatu === "D" ||
        item.auditStatu === "UN"
      ) {
        this.longClickActions[0] = { name: "删除", color: "#ee0a24" };
        this.longClickActions[1] = { name: "提交审批" };
      } else {
        this.longClickActions[0] = { name: "删除", disabled: true };
        this.longClickActions[1] = { name: "提交审批", disabled: true };
      }

      ///  是否可以提交SAP
      if (
        (item.auditStatu === "Y" && item.sapOrderNo === null) ||
        item.sapOrderNo === ""
      ) {
        this.longClickActions[2] = { name: "提交SAP" };
      } else {
        this.longClickActions[2] = { name: "提交SAP", disabled: true };
      }

      this.longClickActions[3] = { name: "查阅" };
    },
    ///   跳转到详情界面
    dispatchDetail(item) {
      console.log("zzzzzzzzzzzz", item.vendorNo);
      this.$router.push({
        path: "/vendor/detail",
        query: { vendorNo: item.vendorNo },
      });
    },
    ///   用户长按 的选择框
    longClickAction(action) {
      this.longClickShow = false;
      if (action.name === null || action.name == "") {
        return;
      }
      if (action.name === "查阅") {
        this.dispatchDetail(this.longClickTargetItem);
      } else if (action.name === "删除") {
        console.log("删除", this.longClickTargetItem);
      } else if (action.name === "提交审批") {
        console.log("提交审批", this.longClickTargetItem);
      } else if (action.name === "提交SAP") {
        console.log("提交SAP", this.longClickTargetItem);
      }
    },

    handleClick(item) {
      this.dispatchDetail(item);
    },

    itemClick(item) {
      if (this.onceClick) {
        this.handleClick(item);
      }
    },

    longClickStart(item) {
      this.firstTime = new Date().getTime();
      timer = setTimeout(() => {
        this.handleLongClick(item);
      }, 800);
    },

    longClickEnd() {
      this.lastTime = new Date().getTime();
      if (this.lastTime - this.firstTime < 300) {
        this.onceClick = true;
      } else {
        this.onceClick = false;
      }
      clearTimeout(timer);
    },

    freshData() {
      this.queryForm.pageNum = 0;
      this.data = [];
      ///     下拉刷新的时候，不需要主动调用一次函数，只需要对应的数据重置归零就可以
      //this.loadData();
    },

    loadData() {
      //let orgCo =
      this.queryForm.orgCoNo = getDefaultOrgCoNo();
      this.queryForm.pageNum = this.queryForm.pageNum + 1;

      // var param = {
      //   orgCoNo: orgCo,
      //   pageSize: this.queryForm.pageSize,
      //   pageNum: this.queryForm.pageNum,
      // };
      list(this.queryForm).then((res) => {
        //this.data.push(...res.data)
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },

    searchOrder() {
      console.log("查询");
      this.queryForm.orgCoNo = getDefaultOrgCoNo();
      this.showQueryForm = true;
    },
    /// 查询控件 回调接口
    doSearchOrder(queryForm) {
      console.log("组件返回的查询参数", queryForm);
      this.queryForm = queryForm;
      this.freshData();
      this.loadData();
      this.showQueryForm = false;
    },

    cancelQuery() {
      console.log("取消查询");
      this.showQueryForm = false;
    },
    setChangeNewOrgCo() {
      this.freshData();
      this.loadData();
    },
  },
  setup() {
    provide("title", "授信额度");
  },
};
</script>

<style scoped lang="less">
.list-tool-btn {
  display: flex;
  height: 35px;
  width: 100%;
  padding: 10px;
  button {
    // float: right;
    // padding: 12px;
    margin-left: 10px;
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