<template>
  <div class="page-wrap">
    <nav-bar :left-arrow="false"> </nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image width="400" height="200" :src="`../image/home-title.jpg`"
      /></van-swipe-item>
    </van-swipe>
    <van-collapse v-model="activeNames" accordion>
      <template v-for="item in tableList" :key="item.id">
        <van-collapse-item :title="item.name" :name="item.id">
          <van-grid :column-num="3">
            <van-grid-item
              v-for="child in item.children"
              :key="child.id"
              icon="orders-o"
              :text="child.name"
              @click="handleClick(child.path)"
            />
          </van-grid>
        </van-collapse-item>
      </template>
    </van-collapse>
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
import NavBar from "@/components/NavBar";

import { reactive, ref } from "vue";

import { useRouter } from "vue-router";

import Storage from "@/utils/storage";

import { listOrg } from "@/api/erp.org";

import {
  getDefaultOrgCoNo,
  setDefaultOrgCoNo,
  setDefaultOrgCoName,
} from "@/utils/user.setting";

export default {
  name: "index",
  components: { NavBar },
  data() {
    return {
      overlay: false,
      show: false,
      actions: [],
      actionItem: { name: null },
    };
  },

  methods: {
    /// 选择了平台公司作为切换
    onSelectOrgCo(item) {
      this.show = false;
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
  },
  setup() {
    const tableList = reactive([
      {
        id: "1",
        name: "采购管理",
        children: [
          {
            id: 10,
            name: "产品询价单",
            path: "/proposal/list",
          },
          {
            id: 11,
            name: "采购合同",
            path: "/purchase/list",
          },
          {
            id: 13,
            name: "入库单",
            path: "/warehouseIn/list",
          },
          {
            id: 14,
            name: "采购发票",
            path: "/poinvoice/list",
          },
          {
            id: 15,
            name: "付款单",
            path: "/payment/list",
          },
        ],
      },
      {
        id: "2",
        name: "国内销售管理",
        children: [
          {
            id: 20,
            name: "销售合同",
            path: "/inlandsale/list",
          },
          {
            id: 21,
            name: "销售发票",
            path: "/isInvoice/list",
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
          },
          {
            id: 31,
            name: "转口销售合同",
            path: "/orderszk/list",
          },
          {
            id: 32,
            name: "出口单证",
            path: "/invoice/list",
          },
          {
            id: 33,
            name: "出口报关单",
            path: "/inlandsale/list",
          },
          {
            id: 34,
            name: "出口信用证",
            path: "/inlandsale/list",
          },
          {
            id: 35,
            name: "中信保限额余额查询",
            path: "/inlandsale/list",
          },
        ],
      },
      {
        id: "4",
        name: "货物管理",
        children: [
          {
            id: "41",
            name: "出库单",
            path: "/warehouseOut/list",
          },
          {
            id: "42",
            name: "出库调整单",
            path: "/warehouseOutM/list",
          },
        ],
      },
      {
        id: "5",
        name: "收款管理",
        children: [
          {
            id: "51",
            name: "收款单",
            path: "/payreceipt/list",
          },
          {
            id: "52",
            name: "收汇水单",
            path: "/settlement/list",
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
          },
          {
            id: "62",
            name: "往来单位",
            path: "/vendor/list",
          },
          {
            id: "63",
            name: "授信额度申请",
            path: "/quota/list",
          },
        ],
      },
    ]);
    const activeNames = ref(["1"]);
    const router = useRouter();
    const handleClick = (path) => {
      console.log("handleClick:" + path);
      router.push({ path });
    };
    return {
      tableList,
      handleClick,
      router,
      activeNames,
    };
  },

  provide: {
    title: "汇和ERP",
  },
};
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 190px;
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
