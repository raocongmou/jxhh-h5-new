<template>
  <van-nav-bar safe-area-inset-top :title="title" :left-arrow="false">
  </van-nav-bar>
</template>

<script>
import { inject } from "vue";

export default {
  name: "TitleBar",

  setup() {
    const title = inject(["title"]);

    return {
      title,
    };
  },
};
</script>

<style scoped>
</style>
