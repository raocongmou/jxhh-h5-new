<template>
  <div>
    <keep-alive :exclude="login">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
    //TabBar,
  },
  data() {
    return {
      tabbarList: [
        {
          title: "首页",
          path: { name: "home" },
        },
        {
          title: "标准",
          path: { name: "Standardization" },

          // normal: require("../../src/assets/images/standard_black.png"),
          // active: require("../../src/assets/images/standard_selected.png"),
        },
        {
          title: "商户",
          path: { name: "inventory" },

          // normal: require("../../src/assets/images/standard_black.png"),
          // active: require("../../src/assets/images/standard_selected.png"),
        },
        {
          title: "我的",
          path: { name: "setup" },
        },
      ],
    };
  },
};
</script>

<style scoped>
:root {
}
</style>
