import request from '../utils/request'
// 审批状态
export function listAuditStatus() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getAuditStatusList',
        method: 'post',
    })
}

// 币种
export function listCurrency() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getCurrencyCodeList',
        method: 'post',
    })
}

// 单据状态
export function listDocStatus() {
    //data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getDocStatusList',
        method: 'post',
    })
}
// 贸易类型
export function listTradeType() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTradeTypeList',
        method: 'post',
    })
}

// 销售类型
export function listSaleType() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=contractType3',
        method: 'post',
    })
}

// 销售合同，收款模式

export function listRecType() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=IsPayMode',
        // url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=PayTerm',
        method: 'post',
    })
}

//   销售合同 收款方式
export function listRecMethod() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByDoc?objRef=PayTerm&objectNo=PM03',
        // url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=PayTerm&objectNo=PM03',
        method: 'post',
    })
}

//往来单位 客户组

export function listVd05Khz() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=hytype',
        method: 'post',
    })
}


export function listVd05Zhhz() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=zhgroup',
        method: 'post',
    })
}



export function listVd05fkfs() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=PayMode',
        method: 'post',
    })
}

export function listVd05SapBank() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=sapbank',
        method: 'post',
    })
}

// 采购合同 付款方式
export function listPayType() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=PayType',
        method: 'post',
    })
}

// 采购合同 交货方式
export function listPODlvTerm() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByRef?objRef=PODlvTerm',
        method: 'post',
    })
}

// 收款领用 分类
export function listRe02CostFee() {
    // data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/table3X/getTable3XByDoc?objRef=costfee&objectNo=RE02&sortId=4',
        method: 'post',
    })
}