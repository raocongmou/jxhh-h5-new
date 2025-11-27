<template>
  <div class="page-wrap">
    <nav-bar :left-arrow="false"> </nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>

    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in info"
        :key="item.id"
        icon="photo-o"
        :text="item.name"
        @click="handleClick(item.path)"
      />
    </van-grid>
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

import { reactive } from "vue";

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
    ///       设置平台公司
    this.settingDefaultOrgCoNo();
  },
  setup() {
    const info = reactive([
      {
        id: 1,
        name: "销售合同",
        path: "/inlandsale/list",
      },
      {
        id: 2,
        name: "商品资料",
        path: "/product/list",
      },
      {
        id: 3,
        name: "产品询价单",
        path: "/proposal/list",
      },
    ]);

    const router = useRouter();
    const handleClick = (path) => {
      console.log("handleClick:" + path);
      router.push({ path });
    };
    return {
      info,
      handleClick,
      router,
    };
  },

  provide: {
    title: "汇和ERP",
  },
};
</script>

<style scoped lang="less">
.page-wrap {
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
