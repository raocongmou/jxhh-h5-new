import request from '../utils/request'

export function list(data) {
    data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/inlandSale/listForMobile',
        //  url: '/api/tscp-enterprise/poinvocie/list'
        method: 'post',
        //data
        params: data
    })
}

// 国内销售合同-销售合同商品 通过销售合同号获取
// orgCoNo
// isNo
export function inlandSaleItemInfoByNo(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/inlandSaleItemInfoByNo`,
        method: 'post',
        params
    })
}

// 4根据平台公司、销售合同号查询出口发票、转口销售商品
export function findInvoiceItemSelect(params) {
    return request({
      url: `/api/tscp-enterprise/wareHouse/findInvoiceItemSelect`,
      method:'post',
      params
    })
  }

export function detail(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/inlandSaleInfo`,
        method: 'post',
        params //docEntry
    })
}

export function deleteOrder(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/deleteByList`,
        method: 'delete',
        params //docEntry
    })
}

export function deleteDocentry(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/delete`,
        method: 'delete',
        params //docEntry
    })
}



//http://123.60.70.111:8523/api/tscp-enterprise/inlandSale/apply?docEntry=669
export function apply(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/apply`,
        method: 'post',
        params //docEntry
    })
}

export function undoApply(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/undoApply`,
        method: 'post',
        params //docEntry
    })
}


export function applySap(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/submitToSap`,
        method: 'post',
        params //docEntry
    })
}

export function save(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/add`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: params //docEntry
    })
}

export function update(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/update`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: params //docEntry
    })
}

export function updateFile(params) {
    return request({
        url: `/api/tscp-enterprise/inlandSale/file/update`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: params //docEntry
    })
}


export function listRe02(data) {
    data.clientId = '2DE239C109891D060606E794F195F612'
    return request({
        url: '/api/tscp-enterprise/inlandSale/findInlandSale',
        //  url: '/api/tscp-enterprise/poinvocie/list'
        method: 'post',
        //data
        params: data
    })
}