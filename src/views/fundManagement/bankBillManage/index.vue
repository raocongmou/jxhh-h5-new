<template>
  <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }"> </nav-bar>
  <!--增删改查 工具栏 -->

  <div class="list-tool-btn">
    <!-- <van-button size="small" icon="add" type="primary" @click="addOrder"
      >新增</van-button
    > -->
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
        <div class="is-no-audit-status">
          <span>{{ item.settlementNo }}</span>
          <span :class="getAuditClassBgc(item.control2)">{{
            getControl2(item.control2)
          }}</span>
        </div>
        <!-- 付款公司 -->
        <div class="sign-date">
          <span>付款公司</span>
          <span>{{ item.cmpId }}</span>
        </div>
        <!-- 收汇类型 -->
        <div class="sign-date">
          <span>收汇类型</span>
          <span>{{ getRecType(item.recType) }}</span>
        </div>
        <!-- 水单币种 -->
        <div class="sign-date">
          <span>水单币种</span>
          <span>{{ getCurrencyName(item.currencyCodeSd) }}</span>
        </div>
        <!-- 汇率 -->
        <div class="sign-date">
          <span>汇率</span>
          <span>{{ item.exchangeRate }}</span>
        </div>
        <!-- 应收汇金额 -->
        <div class="sign-date">
          <span>应收汇金额</span>
          <span>{{ getFormatMoney(item.totalMoneySd) }}</span>
        </div>
        <!-- 结汇日期 -->
        <div class="sign-date">
          <span>结汇日期</span>
          <span>{{ getDate(item.settlementDate) }}</span>
        </div>
        <!-- 制单日期 -->
        <div class="sign-date">
          <span>制单日期</span>
          <span>{{ getDate(item.inputDate) }}</span>
        </div>
        <!-- 经办人 -->
        <div class="sign-date">
          <span>经办人</span>
          <span>{{ item.empName }}</span>
        </div>
        <!-- 经办人 -->
        <!-- <div class="tow_column">
          <div class="sign-date3">
            <span>经办人</span>
          </div>
          <div class="sign-date4">
            <span>{{ item.orgName }}</span>
            <span>{{ item.empName }}</span>
          </div>
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
    <!-- <SearchReceiptBillManage
      :queryForm="queryForm"
      v-on="{
        doSearchOrder: doSearchOrder,
        cancelQuery: cancelQuery,
        selectDateTime: selectDateTime,
      }"
    /> -->
    <Search
      :queryForm="queryForm"
      title="收汇领用"
      :data="dataArr"
      ref="formRef"
      v-on="{ 
        doSearchOrder: doSearchOrder, 
        cancelQuery: cancelQuery,
        selectDateTime: selectDateTime,
      }"
    />
  </van-popup>
</template>




<script>
import { provide } from "vue";

import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import SearchReceiptBillManage from "./components/SearchReceiptBillManage.vue";
import { deleteDocentry, apply, applySap } from "@/api/erp.isinland.js";
import { bankBillManageList } from "@/api/fundManagement/bankBillManage";
import { useRouter } from "vue-router";
import { getCurrencyCodeList, getTable3XByRef } from "@/api/common";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { Notify, Dialog } from "vant";
import { getSaleType } from "@/utils/erp.base.data.js";
import { dataArr } from "./SearchOptions";
import { dateFormat, moneyFormat } from "@/utils/format";

var timer = null;

export default {
  name: "bankBillManage",
  components: { NavBar, Scroll, SearchReceiptBillManage },
  data() {
    return {
      dataArr: dataArr,
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
      // queryForm: {
      //   pageNum: 0,
      //   pageSize: 6,
      //   raNo: "",
      //   cmpId: "",
      //   issueDate: [],
      //   comform: "",
      //   orgName: "",
      //   employeeName: "",
      // },
      queryForm: {
        pageNum: 0,
        pageSize: 6,
        settlementNo: "",
        cmpId: "",
        settlementDateRange: [],
        startSettlementDate: "",
        endSettlementDate: "",
        inputDateRange: [],
        startInputDate: "",
        endInputDate: "",
        applyNo: "",
        settlementBank: "",
        orgName: "",
        employeeName: "",
      },
      currencyCodeList: [],
      recTypeList: [],
      // 确认状态
      comformFlagList: [
        { value: "Y", label: "已确认" },
        { value: "N", label: "末确认" },
      ],
      // 收款模式
      control2List: [
        { value: 0, label: "未制证" },
        { value: 1, label: "公司预收" },
        { value: 20, label: "未制证提交" },
        { value: 21, label: "公司预收提交" },
        { value: 22, label: "撤销提交" },
        { value: 30, label: "业务员预收" },
        { value: 32, label: "预收转销" },
        { value: 33, label: "预收转销提交" },
        { value: 80, label: "制证完成" },
      ]
    };
  },
  created() {
    document.title = this.$route.matched[0].meta.name;
    getSaleType().then((res) => {
      this.saleTypeList.push(...res);
    });
    getCurrencyCodeList({}).then(res => {
      this.currencyCodeList.push(...res.data);
    });
    getTable3XByRef({
      objRef: "SettleType"
    }).then(res => {
      this.recTypeList.push(...res.data);
    })
    this.loadData();
  },
  methods: {
    getFormatMoney(value) {
      return moneyFormat(value)
    },
    getRecType(recType) {
      let recTypeName = "";
      recType = recType.replace(/[\t\r\f\n\s]*/g, "");
      this.recTypeList.forEach(item => {
        if(item.refValueE == recType) {
          recTypeName = item.refValue;
        }
      });
      return recTypeName;
    },
    getControl2(control2) {
      this.control2List.forEach(item => {
        if(item.value === control2) {
          control2 = item.label;
        }
      });
      return control2;
    },
    getCurrencyName(currencyCode) {
      let currencyName = "";
      this.currencyCodeList.forEach(item => {
        if(item.currencyCode === currencyCode) {
          currencyName = item.currencyName;
        }
      })
      return currencyName;
    },
    getDate(date) {
      return dateFormat(date, "yyyy-MM-dd");
    },
    getConfirm(confirm) {
      let confirmVal = "";
      this.comformFlagList.forEach((item) => {
        if (item.value === confirm) {
          confirmVal = item.label;
        }
      });
      return confirmVal;
    },
    selectDateTime({ startDate, endDate, field }) {
      const rangeField = field.split("Range")[0].slice(0, 1).toLocaleUpperCase() + field.split("Range")[0].slice(1);
      this.queryForm[field] = [
        dateFormat(startDate, "yyyy-MM-dd"), 
        dateFormat(endDate, "yyyy-MM-dd")
      ];
      this.queryForm[`start${rangeField}`] = 
      dateFormat(startDate, "yyyy-MM-dd");
      this.queryForm[`end${rangeField}`] = 
      dateFormat(endDate, "yyyy-MM-dd");
    },
    // 选择制单日期
    // selectDateTime({ startDate, endDate }) {
    //   this.queryForm.issueDate = [
    //     dateFormat(startDate, "yyyy-MM-dd"),
    //     dateFormat(endDate, "yyyy-MM-dd"),
    //   ];
    //   this.queryForm.startIssueDate = dateFormat(startDate, "yyyy-MM-dd");
    //   this.queryForm.endIssueDate = dateFormat(endDate, "yyyy-MM-dd");
    // },
    ///// 计算销售类型
    computedSaleType(saleType) {
      //let saleType = this.formData.saleType;
      for (var i = 0; i < this.saleTypeList.length; i++) {
        if (this.saleTypeList[i].refId == saleType) {
          return this.saleTypeList[i].refValue;
        }
      }
      return "";
    },

    getAuditClassBgc(audit) {
      if (audit === 80) {
        return " audit-bgc-blue";
      } else {
        return " audit-bgc-red";
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
      // 跳转之前发送网络请求
      // this.$store.dispatch("bankbillmanage/getActionSelectDatas");
      this.$router.push({
        path: "/fundManagement/bankBillManage/detail",
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

      bankBillManageList(this.queryForm).then((res) => {
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
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
    },
    addOrder() {
      // 跳转之前发送网络请求
      // this.$store.dispatch("bankbillmanage/getActionSelectDatas");
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
    provide("title", "收汇领用");
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
          flex-wrap: nowrap;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-indent: 2em;
          overflow: hidden;
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
            color: #000;
          }
          span:nth-child(1) {
            color: #9d9d9d;
            margin-left: 5px;
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
      }
    }
  }
}
</style>