/**
 * Date: 12/7/20
 */
const routeMap = [
  {
    path: "/404",
    component: () => import("../views/errorPage/404")
  },
  {
    path: "/502",
    component: () => import("../views/errorPage/502")
  },
  {
    path: "/login",
    component: () => import("../views/login"),
    meta: {
      name: "登录"
    }
  },
  {
    path: "/index",
    component: () => import("../views/index"),
    meta: {
      name: "首页"
    }
  },
  { path: "/", redirect: "/index" },
  // 国内贸易
  {
    path: "/inlandsale/list",
    component: () => import("../views/inlandsale/list/index"),
    meta: { name: "销售合同" }
  },
  {
    path: "/inlandsale/detail",
    component: () => import("../views/inlandsale/detail/index"),
    meta: {
      name: "销售合同详情"
    }
  },
  {
    path: "/domesticTrade/purchaseInvoice",
    component: () => import("../views/domesticTrade/purchaseInvoice"),
    meta: {
      name: "采购发票"
    }
  },
  {
    path: "/domesticTrade/purchaseInvoice/detail",
    component: () => import("../views/domesticTrade/purchaseInvoice/detail"),
    meta: {
      name: "采购发票详情"
    }
  },
  {
    path: "/domesticTrade/saleInvoice",
    component: () => import("../views/domesticTrade/saleInvoice"),
    meta: { name: "销售发票" }
  },
  {
    path: "/domesticTrade/saleInvoice/detail",
    component: () => import("../views/domesticTrade/saleInvoice/detail"),
    meta: { name: "销售发票详情" }
  },

  {
    path: "/isInvoice/list",
    component: () => import("../views/isInvoice/list/index"),
    meta: { name: "国内销售发票" }
  },
  {
    path: "/isInvoice/detail",
    component: () => import("../views/isInvoice/detail/index"),
    meta: { name: "国内销售发票详情" }
  },

  {
    path: "/orders/list",
    component: () => import("../views/orders/list/index"),
    meta: { name: "出口合同" }
  },
  {
    path: "/orders/detail",
    component: () => import("../views/orders/detail/index"),
    meta: { name: "出口合同详情" }
  },
  {
    path: "/exportTrade/document",
    component: () => import("../views/exportTrade/document"),
    meta: { name: "出口单证" }
  },
  {
    path: "/exportTrade/document/detail",
    component: () => import("../views/exportTrade/document/detail"),
    meta: { name: "出口单证详情" }
  },
  {
    path: "/exportTrade/creditLetter",
    component: () => import("../views/exportTrade/creditLetter"),
    meta: { name: "出口信用证" }
  },
  {
    path: "/exportTrade/creditLetter/detail",
    component: () => import("../views/exportTrade/creditLetter/detail"),
    meta: { name: "出口信用证详情" }
  },
  {
    path: "/exportTrade/customsDeclaration",
    component: () => import("../views/exportTrade/customsDeclaration"),
    meta: { name: "出口报关单" }
  },
  {
    path: "/exportTrade/quotaApply",
    component: () => import("../views/exportTrade/quotaApply"),
    meta: { name: "授信额度申请" }
  },
  {
    path: "/exportTrade/quotaApply/detail",
    component: () => import("../views/exportTrade/quotaApply/detail"),
    meta: { name: "授信额度申请详情" }
  },
  {
    path: "/exportTrade/proposalBack",
    component: () => import("../views/exportTrade/proposalBack"),
    meta: { name: "采购询价回填" }
  },
  {
    path: "/exportTrade/proposalBack/detail",
    component: () => import("../views/exportTrade/proposalBack/detail"),
    meta: { name: "采购询价回填详情" }
  },

  {
    path: "/orderszk/list",
    component: () => import("../views/orderszk/list/index"),
    meta: { name: "转口销售合同" }
  },
  {
    path: "/orderszk/detail",
    component: () => import("../views/orderszk/detail/index"),
    meta: { name: "转口销售合同详情" }
  },

  {
    path: "/invoice/list",
    component: () => import("../views/invoice/list/index"),
    meta: { name: "出口单证" }
  },
  {
    path: "/invoice/detail",
    component: () => import("../views/invoice/detail/index"),
    meta: { name: "出口单证详情" }
  },

  {
    path: "/product/list",
    component: () => import("../views/product/list/index"),
    meta: { name: "商品资料" }
  },
  {
    path: "/product/detail",
    component: () => import("../views/product/detail/index"),
    meta: { name: "商品资料详情" }
  },
  {
    path: "/vendor/list",
    component: () => import("../views/vendor/list/index"),
    meta: { name: "往来单位" }
  },
  {
    path: "/vendor/detail",
    component: () => import("../views/vendor/detail/index"),
    meta: { name: "往来单位详情" }
  },

  {
    path: "/quota/list",
    component: () => import("../views/quota/list/index"),
    meta: { name: "授信额度" }
  },
  {
    path: "/quota/detail",
    component: () => import("../views/quota/detail/index"),
    meta: { name: "授信额度" }
  },

  {
    path: "/pdf",
    component: () => import("../views/pdf/index"),
    meta: { name: "文件预览" }
  },
  {
    path: "/pdforder",
    component: () => import("../views/pdforder/index"),
    meta: { name: "合同模板预览" }
  },

  {
    path: "/proposal/list",
    component: () => import("../views/proposal/list/index"),
    meta: { name: "采购询价" }
  },
  {
    path: "/proposal/detail",
    component: () => import("../views/proposal/detail/index"),
    meta: { name: "采购询价详情" }
  },
  {
    path: "/poinvoice/list",
    component: () => import("../views/poinvoice/list/index"),
    meta: { name: "采购发票" }
  },
  {
    path: "/poinvoice/detail",
    component: () => import("../views/poinvoice/detail/index"),
    meta: { name: "采购发票详情" }
  },

  {
    path: "/purchase/list",
    component: () => import("../views/purchase/list/index"),
    meta: { name: "采购合同" }
  },
  {
    path: "/purchase/detail",
    component: () => import("../views/purchase/detail/index"),
    meta: { name: "采购合同详情" }
  },
  // {
  //   path: "/warehouseIn/list",
  //   component: () => import("../views/warehouseIn/list/index"),
  //   meta: { name: "入库单" }
  // },

  // 采购管理
  {
    path: "/cargoManagement/rkd",
    component: () => import("../views/cargoManagement/rkd"),
    meta: { name: "入库单" }
  },

  {
    path: "/cargoManagement/rkd/detail",
    component: () => import("../views/cargoManagement/rkd/detail"),
    meta: { name: "入库单详情" }
  },

  {
    path: "/cargoManagement/rktzd",
    component: () => import("../views/cargoManagement/rktzd"),
    meta: { name: "入库调整单" }
  },

  {
    path: "/cargoManagement/rktzd/detail",
    component: () => import("../views/cargoManagement/rktzd/detail"),
    meta: { name: "入库调整单详情" }
  },

  {
    path: "/warehouseOut/list",
    name: "warehouseOut",
    component: () => import("../views/warehouseOut/list/index"),
    meta: { name: "出库单" }
  },
  {
    path: "/warehouseOut/detail",
    name: "warehouseOutDetail",
    component: () => import("../views/warehouseOut/detail/index"),
    meta: { name: "出库单详情" }
  },
  {
    path: "/cargoManagement/cktzd",
    component: () => import("../views/cargoManagement/cktzd/index"),
    meta: { name: "出库调整单" }
  },
  {
    path: "/cargoManagement/cktzd/detail",
    component: () => import("../views/cargoManagement/cktzd/detail/index"),
    meta: { name: "出库调整单详情" }
  },
  {
    path: "/settlement/list",
    component: () => import("../views/settlement/list/index"),
    meta: { name: "收汇水单" }
  },
  {
    path: "/settlement/detail",
    component: () => import("../views/settlement/detail/index"),
    meta: { name: "收汇水单详情" }
  },
  {
    path: "/payreceipt/list",
    component: () => import("../views/payreceipt/list/index"),
    meta: { name: "收款单" }
  },
  {
    path: "/payreceipt/detail",
    component: () => import("../views/payreceipt/detail/index"),
    meta: { name: "收款单详情" }
  },

  // 资金管理
  {
    path: "/fundManagement/payment",
    component: () => import("../views/fundManagement/payment"),
    meta: { name: "付款通知单" }
  },
  //{path: '/fundManagement/payment/paymentInfo', component: () => import("../views/fundManagement/payment/paymentInfo"), meta: {name: '付款通知单详情'}},
  {
    path: "/fundManagement/payment/detail",
    component: () => import("../views/fundManagement/payment/detail"),
    meta: { name: "付款通知单详情" }
  },

  {
    path: "/payment/list",
    component: () => import("../views/payment/list/index"),
    meta: { name: "付款单" }
  },
  {
    path: "/payment/detail",
    component: () => import("../views/payment/detail/index"),
    meta: { name: "付款单详情" }
  },

  // 收款管理
  {
    path: "/fundManagement/receiptBillManage",
    component: () => import("../views/fundManagement/receiptBillManage"),
    meta: { name: "收款登记领用" }
  },
  {
    path: "/fundManagement/receiptBillManage/detail",
    component: () => import("../views/fundManagement/receiptBillManage/detail"),
    meta: { name: "收款领用详情" }
  },
  {
    path: "/fundManagement/bankBillManage",
    component: () => import("../views/fundManagement/bankBillManage"),
    meta: { name: "收汇登记领用" }
  },
  {
    path: "/fundManagement/bankBillManage/detail",
    component: () => import("../views/fundManagement/bankBillManage/detail"),
    meta: { name: "收汇登记领用详情" }
  },

  // 中信保接口
  {
    path: "/sinosure/quotaBalance",
    component: () => import("../views/sinosure/quotaBalance"),
    meta: { name: "中信保接口限额余额查询" }
  }
  // {path: '/sinosure/quotaBalance/detail', component: () => import("../views/sinosure/quotaBalance/detail"), meta: {name: '中信保接口余额查询详情'}}
];

export default routeMap;
