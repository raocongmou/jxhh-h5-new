////枚举类型的值

export default function() {
  return {
    contractTypeList: [
      { code: "格式合同", name: "格式合同" },
      { code: "非格式合同", name: "非格式合同" }
    ],

    //// 按钮组的 控制显隐性
    btnShow: {
      save: false,
      cancel: false,
      add: false,
      edit: false,
      delete: false,
      applyAudit: false,
      cancelAudit: false,
      sendSap: false,
      pdfView: false,
      isShowPreview: false,
      changeContract: false
    },
    /// 右侧弹窗 是否出现
    popupShow: {
      vendor: false,
      employee: false,
      warehouse: false,
      detail: false
    },

    createOrder: {
      show: false,
      tempOrder: ""
    },

    mainOptionSelect: {
      list: [],
      show: false,
      title: "",
      activeFiled: "",
      dateShow: false
    }
  };
}
