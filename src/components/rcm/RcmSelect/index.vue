<template>
  <van-field
    v-model="fieldName"
    :input-align="textAlign"
    :is-link="isRightArrow"
    :name="name"
    :required="required"
    :readonly="true"
    :label="label"
    :label-width="labelWidth"
    :placeholder="'点击选择' + placeholder"
    @click="isShowPicker"
    style="width: 100%;"
  />
  <!-- 解决模态框层次太深,css样式被打乱的bug vue3新语法标签-->
  <!-- https://cn.vuejs.org/guide/built-ins/teleport.html#basic-usage -->
  <Teleport to="body">
    <van-popup v-model:show="showPicker" :position="position">
      <van-picker
        :columns="options"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        :value-key="valueKey"
        option-height="44vh"
      />
    </van-popup>
  </Teleport>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "RcmSelect",
  props: {
    labelWidth: {
      type: String,
      // default: ""
    },
    name: {
      //名称
      type: String,
      default: "",
    },
    position: {
      //弹窗位置
      type: String,
      default: "bottom",
    },
    textAlign: {
      //输入框文本位置
      type: String,
      default: "left",
    },
    placeholder: {
      //输入框提示语
      type: String,
      default: "",
    },
    label: {
      //输入框标签
      type: String,
      default: "",
    },
    isRightArrow: {
      //输入框右箭头
      type: Boolean,
      default: false,
    },
    required: {
      //输入框右箭头
      type: Boolean,
      default: false,
    },
    readonly: {
      //输入框可否手动输入文本
      type: Boolean,
      default: true,
    },
    options: {
      //弹窗可选子数据
      type: Array,
      default: () => [],
    },
    selectLabel: {
      //弹窗可选子数据标签
      type: String,
      default: "",
    },
    selectValue: {
      //弹窗可选子数据值
      type: String || Number || Boolean,
    },
    field: {
      //弹窗可选子数据值
      type: String || Number || Boolean,
    },
    valueKey: {
      // 弹窗可选子数据指定字段
      type: String
    },
    btnStatus: {
      type: String
    }
  },
  watch: {
    // 解决异步传值不更新问题
    field: {
      handler(newVal) {
        // 当预选值为0时必须加条件来处理，因为0属于false就会走else
        if (newVal || newVal === 0) {
          this.options.forEach(item => {
            if(newVal == item[this.selectValue]) {
              this.fieldName = item[this.selectLabel];
            } 
          })
        } 
        else {
          this.fieldName = newVal;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      showPicker: false,
      fieldName: this.field,
    };
  },
  methods: {
    // vant(v4版本)
    // onConfirm({ selectedOptions }) {
    //   this.fieldName = selectedOptions[0]?.[this.selectLabel];
    //   // 输入框改变后触发相应事件通知父组件状态改变
    //   this.$emit("change", {
    //     label: selectedOptions[0]?.[this.selectLabel],
    //     value: selectedOptions[0]?.[this.selectValue],
    //   });
    //   this.showPicker = false;
    // },
    // vant(v3版本)
    onConfirm(selectedOptions) {
      this.fieldName = selectedOptions?.[this.selectLabel];
      // 输入框改变后触发相应事件通知父组件状态改变
      this.$emit("change", {
        label: selectedOptions?.[this.selectLabel],
        value: selectedOptions?.[this.selectValue],
      });
      this.showPicker = false;
    },
    // 是否显示
    isShowPicker() {
      if (this.readonly 
      && this.btnStatus === "view"
      ) {
        Notify({ type: "warning", message: "只读状态不允许编辑!" });
        return;
      } else if(this.readonly && this.btnStatus !== "view") {
        return;
      } 
      this.showPicker = true;
    }
  },
};
</script>
