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
    ref="isList"
  >
    <div class="content">
      <div
        v-for="(item, i) in data"
        :key="i"
        @click="itemClick(item)"
        @touchstart="longClickStart(item, i)"
        @touchend="longClickEnd"
      >
        <!-- 时间和审批状态 -->
        <!-- 合同号和审批状态 -->
        <div class="is-no-audit-status">
          <span>{{ item.isNo }}</span>
          <span>{{ Number(item.docVersion).toFixed(1) }}</span>
          <span :class="getAuditClassBgc(item.auditStatu)">{{
            item.auditStatusName
          }}</span>
        </div>
        <!-- 签约日期 -->
        <div class="sign-date">
          <span>签约日期</span>
          <span>{{ item.signDate }}</span>
        </div>
        <!-- 公司名称 -->
        <div class="sign-date">
          <span>公司名称</span>
          <span>{{ item.vendorName }}</span>
        </div>
        <!-- 合同金额 -->
        <div class="sign-date">
          <span>合同金额</span>
          <span>{{ moneyFormat(item.totalIsValue) }}</span>
        </div>
        <!-- 销售数量 -->
        <div class="sign-date">
          <span>销售数量</span>
          <span>{{ Number(item.quantity).toFixed(2) }}</span>
        </div>
        <!-- 销售类型 -->
        <div class="sign-date">
          <span>销售类型</span>
          <span>{{ computedSaleType(item.saleType) }}</span>
        </div>
        <!-- 业务员 -->
        <div class="sign-date">
          <span>业务员</span>
          <span
            >{{ item.orgName }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              item.employeeName
            }}</span
          >
        </div>
        <!-- <div class="sign-date">
          <span>版本号</span>
          <span>{{ Number(item.docVersion).toFixed(1) }}</span>
        </div> -->
        <!-- <div class="is-data-audit-status">
          <span>{{ item.isNo }}</span>
          <span>{{ item.docVersion + ".0" }}</span>
          <span :class="getAuditClassBgc(item.auditStatu)">{{
            item.auditStatusName
          }}</span>
        </div> -->
        <!-- 往来单位 -->
        <!-- <div class="vendor-name">
          <span>{{ item.vendorName }}</span>
        </div>
        <div class="employee-code-total">
          <span>{{ item.currencyCode }}</span>
          <span>{{ item.totalIsValue }}</span>
          <span>{{ item.isDate.slice(0, 10) }}</span>
        </div>
        <div class="employee-org-name">
          <span>{{ item.pdtNameC }}</span>
          <span>{{ item.quantity }}</span>
        </div>
        <div class="employee-org-name">
          <span>{{ item.orgName }}</span>
          <span>{{ item.employeeName }}</span>
        </div> -->
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

  <van-action-sheet
    v-model:show="oaStatusShow"
    :click-overlay="onOver"
    @select="longClickAction"
    description="OA审批进度"
    :close-on-click-overlay="overlay"
  >
    <ErpQueryInlandSale :queryForm="queryForm"></ErpQueryInlandSale>
  </van-action-sheet>

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
import { list, deleteDocentry, apply, applySap } from "@/api/erp.isinland.js";
import { useRouter } from "vue-router";

import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { Notify, Dialog } from "vant";
import { moneyFormat } from "@/utils/format";
import { getSaleType } from "@/utils/erp.base.data.js";
import { 
  getDocStatusList, 
} from "@/api/common";

var timer = null;

export default {
  name: "InlandSaleList",
  components: { NavBar, Scroll, ErpQueryInlandSale },
  data() {
    return {
      moneyFormat: moneyFormat,
      longClickActions: [],
      saleTypeList: [],
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
      oaStatusShow: false,
      ///       长按的明细对象
      longClickTargetItem: null,
      longClickTargetIndex: null,
      showQueryForm: false,
      queryForm: {
        pageNum: 0,
        pageSize: 6,
        orgCoNo: "",
        isNo: "",
        deptNo: "",
        auditStatus: "",
        employeeNo: "",
        signDate: "",
        docVersion: ""
      },
      isStatusList: [],
    };
  },
  created() {
    //  document.title = this.$route.matched[0].meta.name;
    getSaleType().then((res) => {
      this.saleTypeList.push(...res);
    });
    getDocStatusList({}).then((res) => {
      this.isStatusList.push(...res.data);
    });
    this.loadData();
  },
  methods: {
    // 计算销售类型
    computedSaleType(saleType) {
      for (var i = 0; i < this.saleTypeList.length; i++) {
        if (this.saleTypeList[i].refId == saleType) {
          return this.saleTypeList[i].refValue;
        }
      }
      return "";
    },

    getAuditClassBgc(audit) {
      if (audit === "Y") {
        return " audit-bgc-blue";
      } else {
        return " audit-bgc-red";
      }
    },

    handleLongClick(item, i) {
      console.log("长按的条码，index", i);
      this.longClickTargetItem = null;
      this.longClickTargetItem = item;
      this.longClickTargetIndex = null;
      this.longClickTargetIndex = i;
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
      if (item.auditStatu !== "Y") {
        this.longClickActions[2] = { name: "提交SAP", disabled: true };
      } else if (item.sapOrderNo) {
        this.longClickActions[2] = { name: "提交SAP", disabled: true };
      } else {
        this.longClickActions[2] = { name: "提交SAP" };
      }

      this.longClickActions[3] = { name: "查阅" };
      //this.longClickActions[4] = { name: "查看OA审批进度" };
    },
    ///   跳转到详情界面
    dispatchDetail(item) {
      this.$router.push({
        path: "/inlandsale/detail",
        query: { 
          docEntry: item.docEntry, 
          isStatusList: JSON.stringify(this.isStatusList)
        },
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
      } else if (action.name === "查看OA审批进度") {
        //this.dispatchDetail(this.longClickTargetItem);
        //this.oaStatusShow = true;
        console.log("查看OA进度");
      } else if (action.name === "删除") {
        //console.log("删除", this.longClickTargetItem);
        this.deleteOrder(this.longClickTargetItem, this.longClickTargetIndex);
      } else if (action.name === "提交审批") {
        //console.log("提交审批", this.longClickTargetItem);
        this.applyOrder(this.longClickTargetItem);
      } else if (action.name === "提交SAP") {
        console.log("提交SAP", this.longClickTargetItem);
        this.applySap(this.longClickTargetItem);
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

    longClickStart(item, i) {
      this.firstTime = new Date().getTime();
      timer = setTimeout(() => {
        this.handleLongClick(item, i);
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

      list(this.queryForm).then((res) => {
        //this.data.push(...res.data)
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },

    /// 删除之后
    afterDeleteOrder(item, index) {
      this.data.splice(index, 1);
    },

    deleteOrder(item, index) {
      console.log("删除", item, index);
      Dialog.confirm({
        title: `确定删除当前销售合同吗?`,
        message: `合同【${item.isNo}】一旦删除，则无法恢复!`,
      })
        .then(() => {
          deleteDocentry({ docEntry: item.docEntry }).then((res) => {
            if (res.code === 1) {
              Notify({ type: "success", message: "删除成功!" });
              this.afterDeleteOrder(item, index);
            } else {
              Notify({ type: "error", message: "删除成功失败!" + res.msg });
            }
          });
        })
        .catch(() => {
          console.log("取消");
        });
    },

    applyOrder(item) {
      apply({ docEntry: item.docEntry })
        .then((res) => {
          if (res.code === 1) {
            Notify({ type: "success", message: "提交审批成功!" });
            this.loadData();
          } else {
            Notify({ type: "danger", message: "提交审批失败!" + res.msg });
          }
        })
        .catch((res) => {
          Notify({ type: "danger", message: "提交审批失败!" + res });
        });
    },
    applySap(item) {
      applySap({ docEntry: item.docEntry })
        .then((res) => {
          Notify({ type: "success", message: "提交SAP成功!" });
          this.loadData();
        })
        // .catch((res) => {
        //   console.log("res", res);
        //   Notify({ type: "danger", message: res });
        // });
    },
    addOrder() {
      this.$router.push({
        path: "/inlandsale/detail",
        query: { 
          docEntry: null, 
          edit: "ADD",
          isStatusList: JSON.stringify(this.isStatusList)
        },
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
    provide("title", "销售合同");
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
      // border-radius: 10px;
      font-size: 14px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      box-sizing: border-box;
      // 审批状态和合同号
      .is-no-audit-status {
        margin: 0;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        // font-size: 18px !important;
        // line-height: 35px;
        line-height: 25px;
        border-bottom: 2px dashed #eee;
        span {
          color: #212121;
        }
        span:nth-child(1) {
          font-size: 16px;
          margin-left: 20px;
          font-weight: 550;
        }
        span:nth-child(2) {
          font-size: 16px;
        }
        span:nth-child(3) {
          font-size: 13px;
          //margin-right: 20px;
        }
        .audit-bgc-red {
          color: white;
          background-color: red;
          height: 25px;
          padding: 0 10px 0 10px;
          font-size: 12px !important;
          border-radius: 10px 0 0px 10px;
        }
        .audit-bgc-black {
          color: white;
          background-color: black;
          height: 25px;
          padding: 0 10px 0 10px;
          font-size: 12px !important;
          border-radius: 10px 0 0px 10px;
        }
        .audit-bgc-blue {
          color: white;
          background-color: #1598fa;
          height: 25px;
          padding: 0 10px 0 10px;
          font-size: 12px !important;
          border-radius: 10px 0 0px 10px;
        }
      }
      // 签约日期
      .sign-date {
        margin: 0;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        line-height: 30px;
        span {
          color: #000;
        }
        span:nth-child(1) {
          color: #9d9d9d;
          margin-left: 20px;
        }
        span:nth-child(2) {
          color: #212121;
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
      // 日期-审批状态

      .is-data-audit-status {
        margin: 0;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        // font-size: 18px !important;
        line-height: 35px;
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