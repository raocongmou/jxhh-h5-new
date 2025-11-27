<template>
  <TitleBar />
  <van-form label-width="120">
    <template v-for="item in data" :key="item.id">
      <!-- 普通输入框 -->
      <van-row v-if="item.isPlain">
        <van-field
          v-model="queryForms[item.field]"
          :label="item.label"
          :placeholder="'请输入' + item.label"
        />
      </van-row>
      <!-- 选择下拉框 -->
      <van-row v-else-if="item.isSelect">
        <RcmSelect
          :select-label=item.selectLabel
          :select-value=item.selectValue
          :options=this[item.option]
          :textAlign="'left'"
          :label=item.label
          :placeholder=item.label
          :readonly=false
          :isRightArrow=true
          :position="'bottom'"
          :field=queryForms[item.field]
          :valueKey=item.selectLabel
          @change="({label, value}) => changeRcmSelect({label,value}, item.field)"
        />
      </van-row>
      <!-- 多选日期(开始、结束日期) -->
      <van-row v-else>
        <van-field
          v-model="queryForms[item.field]"
          is-link
          readonly
          :label="item.label"
          :placeholder="item.label"
          @click="item.isDateRange?timeRangeClick(item.field):dateTimeFieldClick(item.field)"
        />
      </van-row>
    </template>
  </van-form>
  <div class="btn-tool">
    <van-button
      round
      color="#1fa2e8"
      type="primary"
      size="small"
      class="width:50%"
      @click="query()"
      >查找
    </van-button>

    <van-button
      round
      type="danger"
      size="small"
      color="#e85452"
      @click="resetQuery()"
      >重置</van-button
    >
    <!-- 时间选择 -->
    <van-calendar
      v-model:show="selectTimeShow"
      @confirm="(val) => selectDateTime(val, 'date')"
      :min-date="minDate"
    />
    <van-calendar
      v-model:show="selectRangeTimeShow"
      @confirm="(val) => selectDateTime(val, 'dateRange')"
      :min-date="minDate"
      type="range"
    />
  </div>
</template>

<script>
import { computed, provide } from "vue";
import TitleBar from "@/components/TitleBar.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { 
  getTable3XByDoc,
  getAuditStatusList 
} from "@/api/common";

export default {
  name: "Search",
  components: { TitleBar },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    orgCoNo: {
      type: String,
      default: "",
    },
    queryForm: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      queryForms: this.queryForm,
      selectTimeShow: false,
      selectRangeTimeShow: false,
      payTypeList: [], // 付款类型
      auditStatusList: [],
      activeFormFiled: "",
      minDate: new Date(2020, 0, 1),
      matchFlag1List: [
        { refValue: "未匹配", refValueCode: 0 },
        { refValue: "一致", refValueCode: 1 },
        { refValue: "有差异", refValueCode: 2 },
      ],
      cFlagList: [
        { value: 0, label: "未入库" },
        { value: 1, label: "部分入库" },
        { value: 2, label: "入库完成" },
        { value: 3, label: "作废" }
      ],
      quotaTypeList: [
        {id: "赊销额度", text: "赊销额度"},
        {id: "信保额度", text: "信保额度"},
      ],
      ysFlagList: [// 验收标记
        { refValueCode: 0, refValue: "未验收" },
        { refValueCode: 1, refValue: "已验收" }
      ],
      sapTypeList: [
        {refValueCode: "成功", refValue: "成功"},
      ],
      control2List: [
        {value: 0, label: "未制证"},
        {value: 1, label: "公司预收"},
        {value: 20, label: "未制证提交"},
        {value: 21, label: "公司预收提交"},
        {value: 22, label: "撤销提交"},
        {value: 30, label: "业务员预收"},
        {value: 32, label: "预收转销"},
        {value: 33, label: "预收转销提交"},
        {value: 80, label: "制证完成"},
      ],
    };
  },
  created() {
    getTable3XByDoc({
      objRef: "recMode",
      objectNo: "PM09"
    }).then(res => {
      this.payTypeList.push(...res.data);
    });
    getAuditStatusList({}).then(res => {
      this.auditStatusList.push(...res.data);
    });
  },
  methods: {
    getType(isDateRange) {
      let type = "";
      if(isDateRange) {
        type = "range";
      } else {
        type = "single";
      }
      return type;
    },
    changeRcmSelect({value}, field) {
      this.queryForms[field] = value;
    },
    ///   单击事件  应该跳转
    itemClick(item) {
      this.$emit("selectVendorItem", item);
    },

    query() {
      this.$emit("doSearchOrder", this.queryForms);
    },
    resetQuery() {
      // this.queryForms = {};
      for(var key in this.queryForms) {
        if(key !== "objectNo" && key !== "pageNum" && key !== "pageSize") {
          this.queryForms[key] = "";
        }
      }
    },
    cancel() {
      this.$emit("cancelQuery");
    },
    dateTimeFieldClick(item) {
      console.log("item", item);
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    timeRangeClick(item) {
      this.activeFormFiled = item;
      this.selectRangeTimeShow = true;
    },
    selectDateTime(val, dateType) {
      if(dateType === "date") {
        this.queryForms[this.activeFormFiled] = dateFormat(val);
      } else {
        const [startDate, endDate] = val; 
        this.$emit("selectDateTime", { startDate, endDate,  field: this.activeFormFiled});
      }
      this.activeFormFiled = "";
      this.selectTimeShow = false;
      this.selectRangeTimeShow = false;
    },
  },
  setup(props) {
    provide("title", computed(() => `${props.title}查询`));
    // provide("title", "出口信用证查询");
  },
};
</script>
<style scoped lang="less">
.btn-tool {
  margin-top: 25px;
  width: 100%;
  display: flex;
  button {
    flex: 1;
    height: 27px;
    margin: 0 17px;
  }
}
.wrapper {
  background-color: #eeeeee;
  margin-top: 20px;
  height: calc(100vh - 81.47px);
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
        }
      }
    }
  }
}
</style>