export const CKD = {
  interfacePath: "wareHouse/findWarehouseCkdList", //接口部分路径拼接
  multipleChoice: false,
  title: "出库单",
  dialogSearchCriteria: "expNoticNo",
  dialogSearchCriteria1: "custName",
  placeholder: "销售合同号",
  placeholder1: "客户",
  showFields: [
    {
      enName: "wareHsNo",
      cnName: "单据号"
    },
    {
      enName: "wareHsClss",
      cnName: "单据类型"
    },
    {
      enName: "custName",
      cnName: "客户"
    },
    {
      enName: "objectNo3",
      cnName: "合同类型"
    },
    {
      enName: "expNoticNo",
      cnName: "合同号"
    }
  ]
};
