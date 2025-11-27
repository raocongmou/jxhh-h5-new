<template>
  <van-nav-bar
    safe-area-inset-top
    :title="title"
    :left-arrow="showLeft"
    @click-left="onBack"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="setting" size="28" color="#EEE" />
    </template>
  </van-nav-bar>

  <van-popup
    v-model:show="showUserSetting"
    position="right"
    :style="{ height: '80%', width: '80%' }"
  >
    <van-form>
      <div class="setting_class">个人中心设置</div>

      <van-field size="56px" readonly name="用户" label="用户" />
      <van-field size="56px" readonly label="当前平台公司" />
      <van-field
        is-link
        v-model="defaultOrgCoName"
        size="56px"
        readonly
        @click="settingOrgCo()"
      />
      <van-field
        is-link
        label-width="150px"
        readonly
        @click="clearCache()"
        label="清除本地数据缓存"
      />
      <van-field
        is-link
        label-width="150px"
        readonly
        icon-prefix="eixt"
        @click="loginOut()"
        label="退出"
      />
    </van-form>
  </van-popup>
  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    :click-overlay="onOver"
    @select="onSelectOrgCo"
    description="请选择平台公司"
    :close-on-click-overlay="overlay"
  />
</template>

<script>
import { inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Dialog, Notify } from "vant";

import Storage from "@/utils/storage";

import { removeToken } from "@/utils/auth";

import { listOrg } from "@/api/erp.org";

import {
  setDefaultOrgCoNo,
  removeDefaultOrgCoNo,
  removeDefaultOrgCoName,
  setDefaultOrgCoName,
  getDefaultOrgCoName,
  getCookie
} from "@/utils/user.setting";
import { updateOrgCoNo } from "@/api/common";

export default {
  props: {
    showLeft: {
      type: Boolean,
      default: true,
    },
    isCanClick: {
      type: Boolean,
      default: true,
    },
  },
  name: "NavBar",
  data() {
    return {
      showUserSetting: false,
      show: false,
      defaultOrgCoName: "",
      actions: [],
    };
  },

  created() {
    let org = getDefaultOrgCoName();
    this.defaultOrgCoName = org;
  },
  setup() {
    const title = inject(["title"]);
    const rightText = inject(["rightText"]);
    const route = useRoute();
    const router = useRouter();

    return {
      title,
      rightText,
    };
  },

  methods: {
    onBack() {
      if(this.isCanClick) {
        this.$router.back();
      }
      // this.$emit("handleClickBack");
    },
    onClickRight() {
      console.log("右侧按钮点击");
      this.showUserSetting = true;
    },
    /// 设置当前的平台公司 在切换平台公司之前应当询问一下客户
    async settingOrgCo() {
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
    clearCache() {
      Storage.clear();
    },
    loginOut() {
      Storage.clear();
      removeToken();
      removeDefaultOrgCoName();
      removeDefaultOrgCoNo();
      this.$router.push({ path: "/index/login" });
    },
    onSelectOrgCo(item) {
      // setStorage("loginInfo", item);
      // const _self =this;
      let newName = item.name;
      let oldName = getDefaultOrgCoName();
      if (newName === oldName) {
        console.log("没有改变");
        this.show = false;
        return;
      }

      Dialog.confirm({
        title: "切换平台公司",
        message: "当前操作将会切换平台公司,你所做的操作将不会保存!",
      })
      .then(() => {
        //    再询问之后，应该问一下 当前用户 是否
        this.defaultOrgCoName = item.name;
        
        setDefaultOrgCoName(item.name);
        setDefaultOrgCoNo(item.orgCoNo);
        this.$emit("setChangeNewOrgCo");
        // window.location.reload();
        updateOrgCoNo({
          userNo: getCookie('loginInfo').userNo,
          orgCoNo: item.orgCoNo
        }).then(res => {
          if(res.code === 1) {
            Notify({
              type: "success",
              message: `平台公司切换${res.message}`
            });
            // 避免页面停留在原来单据的基础上新增原来的平台公司
            // 造成当前公司做出来的单据是其他公司的单据问题
            // window.location.reload();
            this.$store.dispatch("user/getUserInfos");
            this.show = false;
          }
        })
          // window.location.href = location.href+'?time='+((new Date()).getTime());
        })
      .catch((e) => {
        Notify({
          type: "warning",
          message: "切换平台公司失败,请重试!"
        });
        this.show = false;
      });
      this.show = false;
    },
  },
};
</script>

<style scoped>
.setting_class {
  font-size: 22px;
  font-weight: 800;
  padding: 12px;
  display: flex;
  align-items: center;
}
</style>
