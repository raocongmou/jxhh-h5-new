<template>
  <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }"> </nav-bar>
  <!--增删改查 工具栏 -->

  <div class="list-tool-btn">
    <van-field v-model="pdtNameC" placeholder="请输入品名检索" />
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
      <div v-for="(item, i) in data" :key="i" @click="itemClick(item)">
        <!-- 时间和审批状态 -->
        <!-- 合同号和审批状态 -->
        <div class="is-no-audit-status">
          <span>{{ item.pdtNameC }}</span>
          <!-- <span :class="getAuditClassBgc(item.auditStatu)">{{
            item.auditname
          }}</span> -->
        </div>
        <!-- 签约日期 -->
        <div class="sign-date">
          <span>商品编号</span>
          <span>{{ item.pdtNo1 }}</span>
        </div>
        <!-- 公司名称 -->
        <div class="sign-date">
          <span>品名(英文)</span>
          <span>{{ item.pdtNameE }}</span>
        </div>

        <div class="sign-date">
          <span>规格</span>
          <span>{{ item.specificationC }}</span>
        </div>
        <div class="sign-date">
          <span>SAP计量单位</span>
          <span>{{ item.sapunit }}</span>
        </div>
        <div class="sign-date">
          <span>销售单位</span>
          <span>{{ item.uOM }}</span>
        </div>
        <div class="sign-date">
          <span>转换比</span>
          <span>{{ item.sapunitrate }}</span>
        </div>
      </div>
    </div>
  </Scroll>
</template>




<script>
import { provide } from "vue";

import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";

import { list } from "@/api/erp.pdt.js";

import { getDefaultOrgCoNo } from "@/utils/user.setting";

export default {
  name: "ProductList",
  components: { NavBar, Scroll },
  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      total: 0,
      pdtNameC: "",
      queryForm: {
        pageNum: 0,
        pageSize: 6,
        pdtNameC: "",
      },
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  watch: {},
  methods: {
    ///   跳转到详情界面
    dispatchDetail(item) {
      this.$router.push({
        path: "/product/detail",
        query: { pdtID: item.pdtId },
      });
    },

    freshData() {
      this.queryForm.pageNum = 0;
      this.data = [];
    },

    loadData() {
      //let orgCo =
      this.queryForm.pdtNameC = this.pdtNameC;
      this.queryForm.pageNum = this.queryForm.pageNum + 1;

      list(this.queryForm).then((res) => {
        //this.data.push(...res.data)
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },

    searchOrder() {
      this.freshData();
      this.loadData();
    },

    setChangeNewOrgCo() {
      this.freshData();
      this.loadData();
    },

    itemClick(item) {
      this.dispatchDetail(item);
    },
  },
  setup() {
    provide("title", "商品资料");
  },
};
</script>

<style scoped lang="less">
::v-deep {
  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.16667rem 0.12667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    background-color: #fff;
    //margin-left: 15px;
    height: 35px;
    margin-right: 5px;

    width: 75%;
  }
}
.list-tool-btn {
  display: flex;
  // height: 35px;
  width: 100%;
  padding: 10px;
  button {
    border-radius: 5px;
    width: 17%;
    margin-right: 5px;
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
      .tow_column {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0;
        line-height: 30px;
        // 签约日期
        .sign-date1 {
          width: 50%;
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