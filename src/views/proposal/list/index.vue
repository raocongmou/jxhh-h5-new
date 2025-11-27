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
        <div class="is-no-audit-status">
          <span>{{ item.poNo }}</span>
          <span :class="getAuditClassBgc(item.auditStatus)">
            {{ getAuditStatusName(item.auditStatus) }}
          </span>
        </div>
        <div class="sign-date">
          <span>制单日期</span>
          <span>{{ getDate(item.poDate) }}</span>
        </div>
        <div class="sign-date">
          <span>客户名称</span>
          <span>{{ item.vendorName }}</span>
        </div>
        <div class="sign-date">
          <span>贸易方式</span>
          <span>{{ getOrderType(item.orderType) }}</span>
        </div>
        <div class="sign-date">
          <span>结算方式</span>
          <span>{{ item.payMode }}</span>
        </div>
        <div class="tow_column">
          <div class="sign-date3">
            <span>业务员</span>
          </div>

          <div class="sign-date4">
            <span>{{ item.orgName }}</span>
            <span>{{ item.employeeName }}</span>
          </div>
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

  <van-popup
    v-model:show="showQueryForm"
    position="right"
    :style="{ height: '80%', width: '80%' }"
  >
    <search
      :queryForm="queryForm"
      :auditStatusList="auditStatusList"
      v-on="{ 
        doSearchOrder: doSearchOrder, 
        cancelQuery: cancelQuery,
      }"
    ></search>
  </van-popup>
</template>

<script>
import { provide } from "vue";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
// 获取当前选中orgCoNo
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { getAuditStatusList, getCurrencyCodeList, getDocStatusList, getTable3XByRef } from "@/api/common";
// 查询的处理组件
import search from "./search.vue";
// 接口
import { list } from "@/api/erp.proposal.js";
import { dateFormat } from "@/utils/format";

var timer = null;

export default {
  name: "ProposalList",
  components: { search, NavBar, Scroll },
  data() {
    return {
      auditStatusList: [],
      currencyCodeList: [],
      statusList: [],
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
        startPoDate: null,
        endPoDate: null,
        pageNum: 0,
        auditStatus: "",
        pageSize: 6,
        orgCoNo: "",
        vendorName: "",
        payMode: "",
        poNo: "",
        deptNo: "",
        employeeNo: "",
      },
      orderTypeList: []
    };
  },
  created() {
    this.loadData();
    getAuditStatusList({}).then(res => {
      this.auditStatusList.push(...res.data);
    });
    getCurrencyCodeList().then((res) => {
      this.currencyCodeList.push(...res.data);
    });
    getDocStatusList({}).then(res => {
      this.statusList.push(...res.data);
    });
    getTable3XByRef({objRef: "InlandPurchase"}).then(res => {
      this.orderTypeList.push(...res.data);
    });
  },
  methods: {
    getOrderType(orderType) {
      let orderTypes = "";
      this.orderTypeList.forEach(item => {
        if(item.refValueCode === orderType) {
          orderTypes = item.refValue;
        }
      });
      return orderTypes || orderType;
    },
    getDate(date) {
      return dateFormat(date, "yyyy-MM-dd");
    },
    getAuditStatusName(statusCode) {
      let statusName = "";
      this.auditStatusList.forEach(item => {
        if(item.statusCode === statusCode) {
          statusName = item.statusName;
        }
      })
      return statusName;
    },
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
      this.$router.push({
        path: "/proposal/detail",
        query: { 
          docEntry: item.docEntry,
          auditStatusList: JSON.stringify(this.auditStatusList),
          currencyCodeList: JSON.stringify(this.currencyCodeList),
          statusList: JSON.stringify(this.statusList),
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

    getAuditClassBgc(audit) {
      if (audit === "Y") {
        return " audit-bgc-blue";
      } else {
        return " audit-bgc-red";
      }
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
    /// 新增一个 采购询价单
    addOrder() {
      this.$router.push({
        path: "/proposal/detail",
        query: { 
          docEntry: null, 
          edit: "add",
          auditStatusList: JSON.stringify(this.auditStatusList),
          currencyCodeList: JSON.stringify(this.currencyCodeList),
          statusList: JSON.stringify(this.statusList),
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
    provide("title", "采购询价");
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
          white-space: nowrap;
        }
        span:nth-child(2) {
          color: #212121;
          margin-right: 20px;
          flex-wrap: nowrap;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-indent: 2em;
          overflow: hidden;
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
      .tow_column {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0;
        line-height: 30px;
        // 签约日期
        .sign-date3 {
          width: 65%;
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

        .sign-date4 {
          width: 80%;
          margin: 0;
          flex-direction: row;
          justify-content: space-between;
          display: flex;
          line-height: 30px;
          span {
            // color: #000;
            color: #212121;
          }
          span:nth-child(1) {
            // color: #9d9d9d;
            margin-left: 5px;
            margin-right: 20px;
          }
          span:nth-child(2) {
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
      }
    }
  }
}
</style>