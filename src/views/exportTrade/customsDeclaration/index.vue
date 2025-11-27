<template>
  <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }"> </nav-bar>
  <!--增删改查 工具栏 -->

  <div class="list-tool-btn">
    <van-button size="small" icon="search" type="primary" @click="searchOrder"
      >查找</van-button
    >
    <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnPdfView"
        @click="mainBtnClickPDFView"
        >合同预览</van-button
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
        @touchend="longClickEnd"
        @touchstart="longClickStart(item, i)"
      >
        
        <!-- @click="itemClick(item)" -->
        <div class="is-no-audit-status">
          <span>{{ item.entry_Id }}</span>
          <span :class="getAuditClassBgc(item.matchFlag1)">
            {{ item.matchFlag1 }}
          </span>
        </div>
        <!-- 统一编号 -->
        <div class="sign-date">
          <span>统一编号</span>
          <span>{{ item.seq_No }}</span>
        </div>
        <!-- 出口发票号 -->
        <div class="sign-date">
          <span>出口发票号</span>
          <span>{{ item.invoiceNo }}</span>
        </div>
        <!-- 报关状态 -->
        <div class="sign-date">
          <span>报关状态</span>
          <span>{{ item.docStatusNameC }}</span>
        </div>
        <!-- 报关商品 -->
        <div class="sign-date">
          <span>报关商品</span>
          <span>{{ item.pdtName }}</span>
        </div>
        <!-- 币种 -->
        <div class="sign-date">
          <span>币种</span>
          <span>{{ getCurrencyName(item.currencyName) }}</span>
        </div>
        <!-- 金额 -->
        <div class="sign-date">
          <span>金额</span>
          <span>{{ getMoney(item.amount) }}</span>
        </div>
        <!-- 申报日期 -->
        <div class="sign-date">
          <span>申报日期</span>
          <span>{{ getDate(item.d_Date) }}</span>
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

  <van-action-sheet
    v-model:show="oaStatusShow"
    :click-overlay="onOver"
    @select="longClickAction"
    description="OA审批进度"
    :close-on-click-overlay="overlay"
  >
    <ErpQueryInlandSale :queryForm="queryForm"></ErpQueryInlandSale>
  </van-action-sheet>

  <!-- 条件搜索弹窗 -->
  <van-popup
    v-model:show="showQueryForm"
    position="right"
    :style="{ height: '80%', width: '80%' }"
  >
    <Search
      :queryForm="queryForm"
      :data="dataArr"
      title="出口报关单"
      v-on="{ doSearchOrder: doSearchOrder, cancelQuery: cancelQuery }"
    />
  </van-popup>
</template>




<script>
import { provide } from "vue";

import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import { list, deleteDocentry, apply, applySap } from "@/api/erp.isinland.js";
import { getCustomsDeclarationList } from "@/api/exportTrade/customsDeclaration";
import { getTable3XByRef, getCurrencyCodeList } from "@/api/common";
import { dataArr } from "./SerchOptions";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { Notify, Dialog } from "vant";
import { dateFormat, moneyFormat } from "@/utils/format";

var timer = null;

export default {
  name: "PurchaseInvoice",
  components: { NavBar, Scroll },
  data() {
    return {
      dataArr: dataArr,
      matchDataList: {},
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
      longClickTargetItem: null,
      longClickTargetIndex: null,
      showQueryForm: false,
      queryForm: {
        pageNum: 0,
        pageSize: 6,
        invoiceNo: "",
        entry_Id: "",
        seq_No: "",
        matchFlag: "",
        d_Date1: "",
        d_Date2: "",
        ieDate1: "",
        ieDate2: "",
        employeeName: "",
        orgName: ""
      },
      auditStatusList: [],
      currencyCodeList: [],
      tradeTypeList: []
    };
  },
  created() {
    // this.getMatchDataList();
    // getSaleType().then((res) => {
    //   this.saleTypeList.push(...res);
    // });
    getTable3XByRef({
      objRef: "InlandPurchase"
    }).then(res => {
      this.tradeTypeList.push(...res.data);
    });
    getCurrencyCodeList({}).then(res => {
      this.currencyCodeList.push(...res.data);
    })
    this.loadData();
  },
  methods: {
    getMoney(val) {
      return moneyFormat(val);
    },
    /// 模板预览
    mainBtnClickPDFView() {
      let keyValue = this.formData.docEntry;
      let keyName = "docEntry";
      let moduleName = "d_pm03_jxhh";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
        },
      });
    },
    getDate(date) {
      return dateFormat(date, "yyyy-MM-dd");
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
    getFlag2(flag2) {
      let flag2Val = "";
      this.tradeTypeList.forEach(item => {
        if(item.refValueCode == flag2) {
          flag2Val = item.refValue;
        }
      })
      return flag2Val;
    },
    getAuditClassBgc(audit) {
      if (audit === "一致") {
        return " audit-bgc-blue";
      } else {
        return " audit-bgc-red";
      }
    },
    handleLongClick(item, i) {
      this.longClickTargetItem = null;
      this.longClickTargetItem = item;
      this.longClickTargetIndex = null;
      this.longClickTargetIndex = i;
      this.createDataLongClickActions(item);
      this.longClickShow = true;
    },

    createDataLongClickActions(item) {
      //  是否 可以删除
      // if (
      //   item.auditStatu === "N" ||
      //   item.auditStatu === "D" ||
      //   item.auditStatu === "UN"
      // ) {
      //   this.longClickActions[0] = { name: "删除", color: "#ee0a24" };
      //   this.longClickActions[1] = { name: "提交审批" };
      // } else {
      //   this.longClickActions[0] = { name: "删除", disabled: true };
      //   this.longClickActions[1] = { name: "提交审批", disabled: true };
      // }
      // ///  是否可以提交SAP
      // if (item.auditStatu !== "Y") {
      //   this.longClickActions[2] = { name: "提交SAP", disabled: true };
      // } else if (item.sapOrderNo) {
      //   this.longClickActions[2] = { name: "提交SAP", disabled: true };
      // } else {
      //   this.longClickActions[2] = { name: "提交SAP" };
      // }
      this.longClickActions[4] = { name: "预览" };
      // this.longClickActions[3] = { name: "查阅" };
      //this.longClickActions[4] = { name: "查看OA审批进度" };
    },
    ///   跳转到详情界面
    dispatchDetail(item) {
      let oid = item.oid.replace(/\s+/g, "");
      this.$router.push({
        path: "/exportTrade/creditLetter/detail",
        query: { creditNo: oid },
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
      } else if (action.name === "预览") {
        this.print(this.longClickTargetItem)
      }
    },
    // 预览
    print(data) {
      console.log("data", data);
      let keyValue = data.seq_No;
      let keyName = "docEntry";
      let moduleName = "d_ed11_download_print_1";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
        },
      });
    },
    handleClick(item) {
      this.dispatchDetail(item);
    },

    // itemClick(item) {
    //   if (this.onceClick) {
    //     this.handleClick(item);
    //   }
    // },

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

      getCustomsDeclarationList(this.queryForm).then((res) => {
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },

    /// 删除之后
    afterDeleteOrder(item, index) {
      this.data.splice(index, 1);
    },

    deleteOrder(item, index) {
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
    searchOrder() {
      this.queryForm.orgCoNo = getDefaultOrgCoNo();
      this.showQueryForm = true;
    },
    /// 查询控件 回调接口
    doSearchOrder(queryForm) {
      this.queryForm = queryForm;
      this.freshData();
      this.loadData();
      this.showQueryForm = false;
    },

    cancelQuery() {
      this.showQueryForm = false;
    },
    setChangeNewOrgCo() {
      this.freshData();
      this.loadData();
    },
  },
  setup() {
    provide("title", "出口报关单");
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
            // color: #212121;
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