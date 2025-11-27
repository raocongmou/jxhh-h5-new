<template>
  <TitleBar />
  <div class="tool_bar">
    <van-button size="small" type="primary" @click="query">查找</van-button>
    <van-field
      custom-style="-webkit-text-fill-color:rgb(130 127 127 / 83%); "
      v-model="searchCriteria"
    />
  </div>

  <Scroll
    class="wrapper"
    :data="data"
    :dataToal="total"
    :probeType="2"
    :pullup="pullup"
    :pulldown="pulldown"
    @scrollToTop="refresh"
    @scrollToEnd="allowUseScrollEvent?loadData:() => {}"
  >
    <div 
      class="content" 
      @click="handleScrollClick"
      @touchstart="handleScrollClick" 
    >
      <div v-for="(item, i) in data" :key="i">
        <div class="company-money">
          <span v-for="field in showFields" :key="field.enName">
            {{ field.cnName }}: {{ item[field.enName] }}
          </span>
        </div>
        <div class="multi-checkbox">
          <van-checkbox 
            v-model="item.checked" 
            @click="
            multipleChoice ?
            multipleSelect(item.checked, item) : 
            singleSelect(item)
            " 
          />
        </div>
      </div>
    </div>
    <div class="commit-btn">
      <van-button type="primary" :disabled="hasChecked" size="small" @click="commitSelect">完成</van-button>
    </div>
  </Scroll>
</template>


<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";
import TitleBar from "@/components/TitleBar.vue";
import { dialogApi } from "@/api/exportTrade/document";
import { getDefaultOrgCoNo } from "@/utils/user.setting";

export default {
  name: "RcmDialog",
  components: { Scroll, TitleBar },
  props: {
    // 是否多选,默认为多选
    multipleChoice: {
      type: Boolean,
      default: true
    },
    // 显示的字段
    showFields: {
      type: Array,
      default: () => []
    },
    // 接口部分拼接地址
    interfacePath: {
      type: String,
      required: true
    },
    // 查询弹窗标题
    title: {
      type: String,
      default: ""
    },
    // 弹窗接口查询条件对象
    dialogParam: {
      type: Object,
      default: () => ({})
    },
    // 弹窗查询字段
    dialogSearchCriteria: {
      type: String,
      default: "orderNo"
    }
  },
  data() {
    return {
      data: [],
      pullup: true,
      pulldown: true,
      total: 0,
      pageNum: 0,
      searchCriteria: "",//搜索条件
      selectionsArr: [],//多选时接收的数组
      row: {},//单选时接收的地址
      allowUseScrollEvent: true,//点击查询后接口调用两次bug解决方式变量
    };
  },
  created() {
    this.loadData();
  },
  setup(props) {
    provide("title", `选择${props.title}`);
  },
  computed: {
    hasChecked() {
      // 判断data内是不是每一个复选框都是false状态,如果是那么返回true,即<完成>按钮无法点击
      return this.data.every(item => !item.checked);
    }
  },
  methods: {
    // 解决查找时触发两次接口的bug
    handleScrollClick() {
      this.allowUseScrollEvent = true;
    },
    // 完成按钮处理事件
    commitSelect() {
      this.$emit(
        "handleMutiSelectGoods", 
        this.multipleChoice ? 
        this.selectionsArr : 
        this.row
      );
    },
    // 单选逻辑
    singleSelect(item) {
      if(item.checked) {
        this.row = item;
        // 这里必须根据oid来 
        // 因为每个单据唯一共同点就是都有oid这个字段而且是唯一的值
        this.data.forEach((data, i) => {
          if(data.oid !== this.row.oid) {
            this.data[i].checked = false;
          }
        })
      }
    },
    // 多选逻辑
    multipleSelect(checked, item) {
      checked = !checked;
      if(item.checked) {
        this.selectionsArr.push(item);
      } else {
        this.selectionsArr.splice(this.selectionsArr.findIndex(iten => iten.docEntry === item.docEntry), 1);
      }
    },
    refresh() {
      // 初始化工作
      this.pageNum = 0;
      this.data = [];
      this.selectionsArr = [];
      this.row = {};
    },
    query() {
      this.allowUseScrollEvent = false;
      this.refresh();
      this.loadData();
    },
    loadData() {
      this.pageNum = this.pageNum + 1;
      let param = {
        orgCoNo: getDefaultOrgCoNo(),
        pageSize: 20,
        pageNum: this.pageNum,
        ...this.dialogParam
      };
      param[this.dialogSearchCriteria] = this.searchCriteria;
      dialogApi(param, this.interfacePath).then((res) => {
        this.data = this.data.concat(res.data);
        this.total = res.total;
      });
    },
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
  height: calc(75vh - 81.47px);
  width: 100%;
  overflow: hidden;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 95vw;
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
      .multi-checkbox {
        width: 65%;
      }
    }
  }
  &>div:last-child {
    width: 100%;
    position: absolute;
    bottom: 0px;
    margin: auto;
    .van-button--small {
      width: 100%;
    }
  }
}
::v-deep {
  .van-checkbox__icon .van-icon {
    border: 1px solid #000 !important;
  }
}
</style>