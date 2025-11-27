export const INVOICE = {
  interfacePath: "Invoice/findInvoice", //接口部分路径拼接
  multipleChoice: false,
  title: "出口发票",
  dialogSearchCriteria: "invoiceNo",
  showFields: [
    {
      enName: "invoiceNo",
      cnName: "出口发票号"
    },
    {
      enName: "coNameE",
      cnName: "国外客户"
    },
    {
      enName: "orgName",
      cnName: "部门"
    }
  ]
};

export const ORDER = {
  interfacePath: "Order/findOrder", //接口部分路径拼接
  multipleChoice: false,
  title: "出口订单",
  showFields: [
    {
      enName: "orderNo",
      cnName: "出口订单号"
    },
    {
      enName: "coNameE",
      cnName: "国外客户"
    },
    {
      enName: "orgName",
      cnName: "部门"
    }
  ],
  dialogParam: {
    orderType: "自营出口",
    custNo: ""
  }
};
// 转口销售
export const ZKORDER = {
  interfacePath: "Order/findOrder",
  multipleChoice: false,
  title: "转口销售合同",
  showFields: [
    {
      enName: "orderNo",
      cnName: "转口销售合同号"
    },
    {
      enName: "coNameE",
      cnName: "国外客户"
    },
    {
      enName: "orgName",
      cnName: "部门"
    }
  ],
  dialogParam: {
    orderType: "转口贸易",
    custNo: ""
  }
};
// 样品单
export const SAMPLE = {
  interfacePath: "sampleMng/findSample",
  multipleChoice: false,
  dialogSearchCriteria: "sampleNo",
  title: "样品单",
  showFields: [
    {
      enName: "sampleNo",
      cnName: "样品编号"
    },
    {
      enName: "sampleName",
      cnName: "样品名称"
    },
    {
      enName: "coNameE",
      cnName: "客户公司名称"
    }
  ]
};
export const EMPLOYEE = {
  interfacePath: "SysUser/findSysUserByName",
  multipleChoice: false,
  dialogSearchCriteria: "userName",
  title: "采购员",
  showFields: [
    {
      enName: "userName",
      cnName: "员工"
    },
    {
      enName: "orgName",
      cnName: "部门"
    }
  ]
};
