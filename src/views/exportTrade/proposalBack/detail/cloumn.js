export default function() {
  return {
    formData: {
      poNo: "",
      auditStatus: "",
      orgCoNo: "", //平台公司
      orgName: "",
      orgNo: "",
      employeeName: "",
      employeeNo: "",
      vendorName: "",
      vendorNo: "",
      refNo: "",
      orderType: "",
      payMode: "",
      payDetail: "",
      soType: null,
      currencyCode: "",
      exchRate: null,
      poDate: null,
      poStatus: null,
      remark: null,
      items: [],
      filterItems: []
    },
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
      pdfView: false
    }
  };
}
