<template>
  <div class="page-wrap">
    <nav-bar :showLeft="false"> </nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image width="400" height="200" :src="`../image/home-title.jpg`"
      /></van-swipe-item>
    </van-swipe>
    <Scroll class="wrappers" wrapper="tableListRef">
      <div>
        <div v-for="item in tableList" :key="item.id" class="menu-class">
          <div class="menu-item-class">
            <h3>{{ item.name }}</h3>
            <div
              class="table-list-box"
              v-for="child in item.children"
              :key="child.id"
            >
              <img :src="child.imgUrl" />
              <p>{{ child.name }}</p>
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
import NavBar from "@/components/NavBar";

import { reactive, ref } from "vue";
import Scroll from "@/components/Scroll.vue";
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
            },
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },

        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
            },
          ],
        },
        {
          id: "6",
          name: "基础数据",
          children: [
            {
              id: "62",
              name: "往来单位",
              path: "/vendor/list",
              imgUrl: "../image/is-icon.png",
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
    const activeNames = ref(["1"]);
    const router = useRouter();
    const handleClick = (path) => {
      console.log("handleClick:" + path);
      router.push({ path });
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
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 190px;
}
.menu-class {
  flex-direction: column;
  margin-bottom: 10px;
  .menu-item-class {
    width: 25;
    h3 {
      margin-left: 15px;
    }
    .table-list-box {
      padding: 10px;
      width: 25%;
      margin-top: 15px;
      text-align: center;
      img {
        width: 35px;
        height: 35px;
      }
      p {
      }
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
