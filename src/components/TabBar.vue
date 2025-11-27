<template>
  <div class="tabbar">
    <van-tabbar v-model="active" @click="handleChange" fixed router>
      <van-tabbar-item
        v-for="(item, index) in tabData"
        :icon="item.icon"
        :to="item.path"
        :key="index"
      >
        <span :class="defaultActive === index ? active : ''">{{
          item.title
        }}</span>
        <!-- <template >
          <img :src="props.active ? item.active : item.normal" />
        </template> -->
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
 
<script>
export default {
  name: "TabBar",
  props: {
    defaultActive: {
      type: Number,
      default: 0,
    },
    tabData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: this.defaultActive,
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("change", val);
    },
  },
};
</script>
 
<style scoped>
.active_tab img {
  width: 3rem;
  height: 3rem;
}
.van-tabbar-item--active {
  color: #0e5cd8;
}
</style>