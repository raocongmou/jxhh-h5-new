<template>
  <div class="page-wrap">
    <nav-bar :showLeft="false"> </nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image width="380" height="190" :src="`../image/home-title.jpg`"
      /></van-swipe-item>
    </van-swipe>
    <Scroll class="wrappers" wrapper="tableListRef">
      <div>
        <div v-for="item in tableList" :key="item.id" class="menu-class">
          <div class="menu-item-class">
            <h3>{{ item.name }}</h3>
            <div class="menu-item-class-div">
              <div
                class="table-list-box"
                v-for="child in item.children"
                :key="child.id"
                @click="handleClick(JSON.stringify(child))"
              >
                <img :src="child.imgUrl" />
                <p>{{ child.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      :click-overlay="onOver"
      @select="onSelectOrgCo"
      description="请选择平台公司"
      :close-on-click-overlay="overlay"
    />
  </div>
</template>

<script>
import { Notify } from "vant";
import NavBar from "@/components/NavBar";
import { ref } from "vue";
import Scroll from "@/components/Scroll.vue";
import { useRouter } from "vue-router";
import Storage from "@/utils/storage";
import { listOrg } from "@/api/erp.org";
import {
  getDefaultOrgCoNo,
  setDefaultOrgCoNo,
  setDefaultOrgCoName,
} from "@/utils/user.setting";
import { isUserMenuControl } from "@/api/common";

export default {
  name: "index",
  components: { NavBar, Scroll },
  data() {
    return {
      overlay: false,
      show: false,
      actions: [],
      actionItem: { name: null },
      tableList: [
        {
          id: "2",
          name: "国内销售管理",
          children: [
            {
              id: 20,
              name: "销售合同",
              path: "/inlandsale/list",
              imgUrl: "../image/is-icon.png",
              moduleNo: "IE_M2_Import_Sale_E",
            },
            // {
            //   id: 21,
            //   name: "销售发票",
            //   path: "/domesticTrade/saleInvoice",
            //   imgUrl: "../image/saleInvoice.png",
            //   moduleNo: "IE_M2_Import_ISInv_E",
            //   // moduleNo: "a_m_yw_inlandinvoice",
            // },
            {
              id: 22,
              name: "出库单",
              path: "/warehouseOut/list",
              imgUrl: "../image/ckd.png",
              moduleNo: "IM_M2_JCHECKOUT_E1",
            },
            {
              id: 23,
              name: "出库调整单",
              path: "/cargoManagement/cktzd",
              imgUrl: "../image/is-icon.png",
              moduleNo: "IM_M2_cktzd",
            },
          ],
        },
        {
          id: "4",
          name: "采购管理",
          children: [
            {
              id: 20,
              name: "采购询价",
              path: "/proposal/list",
              imgUrl: "../image/poProposal.png",
              moduleNo: "IE_M2_poProposal",
            },
            {
              id: 24,
              name: "采购询价回填",
              path: "/exportTrade/proposalBack",
              imgUrl: "../image/is-icon.png",
              moduleNo: "IE_M2_poProposal_back",
            },
            {
              id: 21,
              name: "采购合同",
              path: "/purchase/list",
              imgUrl: "../image/purchaseOrder.png",
              moduleNo: "IE_M2_PurchaseOrder",
              // moduleNo: "a_m_reveivegoods",
            },
            {
              id: 22,
              name: "付款单",
              path: "/fundManagement/payment",
              imgUrl: "../image/payment.png",
              moduleNo: "IE_M2_Payroll_E",
              // moduleNo: "a_m_yw_payment",
            },

            {
              id: 23,
              name: "采购发票",
              path: "/domesticTrade/purchaseInvoice",
              imgUrl: "../image/purchaseInvoice.png",
              moduleNo: "IE_M2_PurchInvoice_E",
            },
            {
              id: 23,
              name: "入库单",
              path: "/cargoManagement/rkd",
              imgUrl: "../image/is-icon.png",
              moduleNo: "IM_M2_JCHECKIN_E1",
            },
            {
              id: 24,
              name: "入库调整单",
              path: "/cargoManagement/rktzd",
              imgUrl: "../image/is-icon.png",
              moduleNo: "IM_M2_rktzd",
            },
          ],
        },
        {
          id: "3",
          name: "出口（转口）销售管理",
          children: [
            {
              id: 30,
              name: "出口合同",
              path: "/orders/list",
              imgUrl: "../image/orders.png",
              moduleNo: "IE_M2_Contractsis_E",
            },
            {
              id: 31,
              name: "转口销售合同",
              path: "/orderszk/list",
              imgUrl: "../image/orderszk.png",
              moduleNo: "IE_M2_ContractsisZ_E",
            },
            {
              id: 32,
              name: "出口单证",
              path: "/exportTrade/document",
              imgUrl: "../image/document.png",
              moduleNo: 'IE_M2_Documents'
            },
            {
              id: 33,
              name: "出口报关单",
              path: "/exportTrade/customsDeclaration",
              imgUrl: "../image/customsDeclaration.png",
              moduleNo: "IE_M2_DEC_Mng",
              // moduleNo: "IE_M2_DEC_Q",
            },
            {
              id: 34,
              name: "出口信用证",
              path: "/exportTrade/creditLetter",
              imgUrl: "../image/creditLetter.png",
              moduleNo: "IE_M2_LCDoc_List_E",
            },
            {
              id: 35,
              name: "中信保限额余额查询",
              path: "/sinosure/quotaBalance",
              imgUrl: "../image/quotaBalance.png",
              moduleNo: "IE_M2_QuotaBalance_Q",
              // moduleNo: "IE_M1_EDI",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "61",
              name: "商品资料",
              path: "/product/list",
              imgUrl: "../image/product-icon.png",
              moduleNo: "SM_M2_SPZL",
              // moduleNo: "IE_W_Products_New",
            },
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/vnedor-icon.png",
              moduleNo: "SM_M2_WLDW_Mng",
              // moduleNo: "IE_M2_Vendor_Q",
            },
            {
              id: "63",
              name: "授信额度申请",
              path: "/exportTrade/quotaApply",
              imgUrl: "../image/quotaApply.png",
              moduleNo: "IE_M2_QuotaApply"
            },
          ],
        },
        {
          id: 7,
          name: "资金管理",
          children: [
            {
              id: 71,
              name: "收款领用",
              path: "/fundManagement/receiptBillManage",
              imgUrl: "../image/vnedor-icon.png",
              moduleNo: "IM_M2_Accept_Regst_G"
            },
            {
              id: 71,
              name: "收汇领用",
              path: "/fundManagement/bankBillManage",
              imgUrl: "../image/vnedor-icon.png",
              moduleNo: "IE_M2_settlement_G"
            },
          ],
        },
      ],
    };
  },

  methods: {
    /// 选择了平台公司作为切换
    onSelectOrgCo(item) {
      this.show = false;
      // setStorage("loginInfo", item);
      setDefaultOrgCoNo(item.orgCoNo);
      setDefaultOrgCoName(item.name);
    },

    async settingDefaultOrgCoNo() {
      const defaultOrgCoNo = getDefaultOrgCoNo();
      if (
        defaultOrgCoNo &&
        defaultOrgCoNo !== undefined &&
        defaultOrgCoNo !== ""
      ) {
        return;
      }
      console.log("当前默认公司", defaultOrgCoNo);
      let orgActionList = Storage.get("orgCoList");
      if (!orgActionList || orgActionList.length === 0) {
        const respData = await listOrg();
        orgActionList = respData.data;
        Storage.set("orgCoList", orgActionList);
      }
      for (var i = 0; i < orgActionList.length; i++) {
        var orgActionShow = { name: "", orgCoNo: "" };
        orgActionShow.name = orgActionList[i].orgAbbrName;
        orgActionShow.orgCoNo = orgActionList[i].orgNo;
        this.actions[i] = orgActionShow;
      }
      this.show = true;
    },
  },

  created() {
    // 设置平台公司
    this.settingDefaultOrgCoNo();
    document.title = this.$route.matched[0].meta.name;
  },
  // mounted() {
  //   console.log("zzzzzzzzzzzzzzzzz", this.$route.matched);
  // },
  setup() {
    const activeNames = ref(["1"]);
    const router = useRouter();
    const handleClick = async(child) => {
      const { path, moduleNo } = JSON.parse(child);
      const orgCoNo = getDefaultOrgCoNo();
      const res = await isUserMenuControl({ orgCoNo, moduleNo });
      if(res.data && res.data.length) {
        router.push(path);
      } else {
        Notify({
          type: "warning",
          message: "当前平台公司没有此模块的权限!",
        });
      }
    };
    return {
      handleClick,
      router,
      activeNames,
    };
  },

  provide: {
    title: "原药购销系统",
  },
};
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  margin-top: 5px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  height: 190px;
}
.menu-class {
  flex-direction: column;
  margin-bottom: 5px;
  //padding-top: 5px;
  .menu-item-class {
    border: 1px solid #eee;
    margin: 10px;
    padding: 10px;
    // width: 25;
    .menu-item-class-div {
      display: flex;
      flex-direction: row;
      width: calc(100vw - 40px);
      flex-wrap: wrap;
      .table-list-box {
        margin-top: 15px;
        width: 25%;
        text-align: center;
        img {
          width: 35px;
          height: 35px;
        }
        p {
          font-size: 13px;
          color: #555555;
          font-family: "Microsoft YaHei";
        }
      }
    }
    h3 {
      font-size: 15px;
      margin-left: 1px;
      font-weight: 500;
      color: #555555;
      font-family: "Microsoft YaHei";
    }
  }
}
.wrappers {
  background-color: #fff;
  height: calc(100vh - 228.83px);
  width: 100%;
  overflow: hidden;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 95vw;
      margin: 10px auto;
      border-radius: 15px;
      // font-size: 16px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      .contact-number,
      .company-money {
        margin-left: 20px;
      }
    }
  }
}
::v-deep {
  .van-grid-item__content--center {
    background-color: rgb(255, 255, 255);
    // padding: 0;
  }

  .van-grid-item {
    border: 1px solid #eee;
  }
  .van-grid {
    margin-top: 0px;
  }
  .van-cell__title {
    color: #000;
    font-size: 16px;
  }
  .van-hairline--top-bottom {
    margin: 5px;
  }
}
</style>
