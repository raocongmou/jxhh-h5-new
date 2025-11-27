<template>
  <TitleBar />
  <!--增删改查 工具栏 -->
  <div class="tool_bar">
    <van-button size="small" type="primary" @click="query">查找</van-button>
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="employeeName"
    />
  </div>

  <Scroll
    class="wrapper"
    :data="data"
    wrapper="employee"
    :dataToal="total"
    :pullup="pullup"
    :pulldown="pulldown"
    @scrollToTop="freshData"
    @scrollToEnd="loadData"
  >
    <!-- {{ item.orgFullName }}  -->
    <div class="content">
      <div v-for="(item, i) in data" :key="i" @click="itemClick(item)">
        <div class="company-money">
          <span> {{ item.refValue }}</span>
        </div>
      </div>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";

import Scroll from "@/components/Scroll.vue";
import { listVd05SapBank } from "@/api/erp.public.js";

import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "ErpBankSelect",

  components: { Scroll, TitleBar },

  props: {
    showDw: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      data: [],
      datalist: [],
      pullup: true,
      pulldown: true,
      total: 0,
      pageNum: 0,
      employeeName: "",
    };
  },
  created() {
    this.loadData();
  },
  mounted() {},
  watch: {
    listData(value) {
      this.data = this.data.concat(value);
    },
    showDw: {
      handler(oldVal, newVal) {
        if (oldVal) {
          this.query();
        }
      },
    },
  },
  methods: {
    query() {
      this.data = [];
      for (let index = 0; index < this.datalist.length; index++) {
        const element = this.datalist[index];
        if (element.refValue.includes(this.employeeName)) {
          console.log("存在，", element);
          this.data.push(element);
        }
      }
      this.total = this.data.length;
    },
    itemClick(item) {
      ///   单击事件  应该跳转
      this.$emit("selectItem", item);
    },

    freshData() {
      this.pageNum = 0;
      this.data = [];
      ///     下拉刷新的时候，不需要主动调用一次函数，只需要对应的数据重置归零就可以
      //this.loadData();
    },

    loadData() {
      listVd05SapBank().then((res) => {
        //this.data.push(...res.data)
        this.data = this.data.concat(res.data);
        this.datalist = res.data;
        this.total = res.total;
      });
    },
  },
  setup() {
    provide("title", "所属银行");
  },
};
</script>


<style scoped lang="less">
.tool_bar {
  display: flex;
  width: 100%;
  margin-top: 10px;
  button {
    margin-left: 10px;
    width: 20%;
    height: 25px;
  }
}

.van-cell {
  margin-left: 10px;
  padding: 1px;
  width: 68%;
  border: none;
  border-bottom: 1px solid rgb(134, 154, 232);
}
.wrapper {
  background-color: #eeeeee;
  margin-top: 20px;
  height: calc(75vh - 80.47px);
  width: 95%;
  overflow: hidden;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 105vw;
      margin: 10px auto;
      border-radius: 5px;
      font-size: 14px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      .contact-number,
      .company-money {
        margin-left: 20px;
        span {
          width: 250px;
        }
      }
    }
  }
}
</style>