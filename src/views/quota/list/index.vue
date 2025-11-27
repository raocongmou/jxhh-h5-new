<template>
  <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }"> </nav-bar>
  <!--增删改查 工具栏 -->

  <div class="list-tool-btn">
    <van-button size="small" icon="add" type="primary" @click="addOrder"
      >新增</van-button
    >
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
        <!-- 时间和审批状态 -->
        <div class="is-data-audit-status">
          <span>{{ item.applyNo }}</span>
          <span>{{ item.inputDate }}</span>
          <span :class="getAuditClassBgc(item.auditStatu)">{{
            getAuditStatus(item.auditStatu)
          }}</span>
          <!-- <van-tag :type="auditType(item.auditStatu)">{{getAuditStatus(item.auditStatu)}}</van-tag> -->
        </div>
        <!-- 往来单位 -->
        <div class="vendor-name">
          <span>{{ item.custName }}</span>
        </div>
        <div class="employee-code-total">
          <span>{{ item.quotaType }}</span>
          <span>{{ item.currency }}</span>
          <span>{{ item.currentAmount }}</span>
        </div>
        <div class="employee-org-name">
          <span>{{ item.orgName }}</span>
          <span>{{ item.employeeName }}</span>
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

import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import ErpQueryInlandSale from "@/components/ErpQueryInlandSale.vue";
import { list } from "@/api/erp.quota.js";
import { useRouter } from "vue-router";

import { getDefaultOrgCoNo } from "@/utils/user.setting";

var timer = null;

export default {
  name: "QuotaList",
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
  watch: {
    // listData(value) {
    //   this.data = this.data.concat(value);
    // },
  },
  methods: {
    getAuditClassBgc(audit) {
      if (audit === "N") {
        return " audit-bgc-red";
      } else if (audit === "UN") {
        return " audit-bgc-black";
      } else if (audit === "Y") {
        return " audit-bgc-blue";
      } else {
        return "";
      }
    },
    // 审批状态处理
    auditType(type) {
      if (type === "D") {
        return "warning";
      } else {
        return "primary";
      }
    },
    getAuditStatus(auditStatus) {
      if (auditStatus === "D") {
        return "未申请审批";
      } else {
        return "审批未知";
      }
    },
    handleLongClick(item) {
      (this.longClickTargetItem = null),
        (this.longClickTargetItem = item),
        this.createDataLongClickActions(item);
      this.longClickShow = true;
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
      const router = useRouter();
      //let nextPath ="/inlandsale/detail"
      // router.push({path:})
      console.log("跳转到详情页面", item);

      this.$router.push({
        path: "/quota/detail",
        query: { docEntry: item.oid },
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

    addOrder() {
      console.log("新增");

      this.$router.push({
        path: "/inlandsale/detail",
        query: { docEntry: null, edit: "ADD" },
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
  // height: 35px;
  width: 100%;
  padding: 10px;
  button {
    border-radius: 5px;
  }
  button:nth-child(2) {
    margin-left: 10px;
  }
}
.wrapper {
  background-color: #eeeeee;
  height: calc(100vh - 81.47px);
  width: 100%;
  overflow: hidden;
  .content {
    padding: 1px;
    margin-top: 20px;
    & > div {
      // box-shadow: 10px 10px 5px #888888;
    }
    div {
      display: flex;
      flex-direction: column;
      margin: 0px 10px 10px 10px;
      border-radius: 10px;
      font-size: 14px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      box-sizing: border-box;
      // 日期-审批状态
      .is-data-audit-status {
        margin: 0;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        // font-size: 18px !important;
        line-height: 45px;
        // border-bottom: 1px dashed #eee;
        span:nth-child(1) {
          margin-left: 20px;
          color: #19446d;
        }
        span:nth-child(3) {
          color: gray;
          margin-right: 20px;
        }
        .audit-bgc-red {
          color: red;
        }
        .audit-bgc-black {
          color: black;
        }
        .audit-bgc-blue {
          color: blue;
        }
      }
      // 往来单位
      .vendor-name {
        margin: 0;
        // border-bottom: 1px dashed #eee;
        padding-left: 20px;
        // font-size: 20px !important;
        color: #19446d;
        // line-height: 33px;
        span {
          // margin-bottom: 10px;
        }
      }
      // 业务员-币种-总价
      .employee-code-total {
        margin: 0;
        display: flex;
        flex-direction: row;
        line-height: 46px;
        color: #777777;
        justify-content: space-between;
        // font-size: 18px !important;
        span:nth-child(1) {
          margin-left: 20px;
        }
        span:nth-child(2) {
          margin-left: -90px;
        }
        span:nth-child(3) {
          margin-right: 20px;
          font-size: 12px !important;
        }
      }
      .employee-org-name {
        margin: 0;
        // display: flex;
        display: inline-block;
        // flex-direction: row;
        // line-height: 46px;
        color: #777777;
        // font-size: 18px !important;
        // justify-content: space-between;
        span:nth-child(1) {
          margin-left: 20px;
        }
        span:nth-child(2) {
          margin-left: 20px;
        }
      }
      .contact-number {
        display: flex;
        flex-direction: row;
        span {
          width: 33.33%;
        }
      }
    }
  }
}
</style>