export default new class FieldConfig {
  getConfig() {
    return [
      {
        fieldName: 'computedOrgCo',
        readonly: true,
        label_width: '85',
        name: '平台公司',
        label: '平台公司',
        placeholder: '平台公司',
        required: true,
        fieldType: 'variable'
      },
      {
        fieldName: 'auditStatusName',
        readonly: true,
        label_width: '85',
        name: '审批状态',
        label: '审批状态',
        placeholder: '审批状态',
      },
      {
        fieldName: 'isNo',
        readonly: true,
        label_width: '85',
        name: '销售合同号',
        label: '销售合同号',
        placeholder: '系统生成，无需录入',
        required: true
      },
      {
        fieldName: 'isDate',
        readonly: true,
        label_width: '85',
        name: '制单日期',
        label: '制单日期',
        placeholder: '系统生成，无需录入'
      },
      {
        fieldName: 'orgName',
        readonly: true,
        label_width: '85',
        name: '部门',
        label: '部门',
        placeholder: '部门',
        required: true
      },
      {
        fieldName: 'employeeName',
        readonly: true,
        label_width: '85',
        name: '业务员',
        label: '业务员',
        placeholder: '请选择业务员',
        required: true,
        is_link: true,
        fieldClick: {
          name: 'mainSelecteEmployee',
          params: []
        }
      },
      {
        fieldName: 'computedTrade',
        readonly: true,
        label_width: '85',
        name: '贸易方式',
        label: '贸易方式',
        placeholder: '请选择贸易方式',
        is_link: true,
        fieldClick: {
          name: 'mainFieldClick',
          params: ['tradType']
        },
        fieldType: 'variable'
      },
      {
        fieldName: 'computedSaleType',
        readonly: true,
        label_width: '85',
        name: '销售类型',
        label: '销售类型',
        placeholder: '请选择销售类型',
        is_link: true,
        fieldClick: {
          name: 'mainFieldClick',
          params: ['saleType']
        },
        fieldType: 'variable',
        required: true
      },
      {
        fieldName: 'orderMode',
        readonly: true,
        label_width: '85',
        name: '合同类型',
        label: '合同类型',
        placeholder: '请选择合同类型',
        is_link: true,
        fieldClick: {
          name: 'mainFieldClick',
          params: ['orderMode']
        },
        fieldType: 'variable',
        required: true
      },
    ]
  }
}()