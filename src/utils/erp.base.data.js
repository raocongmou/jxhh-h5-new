// 获取ERP的所有的枚举类型的值

import Storage from "./storage"
import {
    listSaleType,
    listTradeType,
    listRecType,
    listRecMethod,
    listCurrency,
    listVd05Khz,
    listVd05Zhhz,
    listVd05fkfs, 
    listPayType,
    listPODlvTerm,
    listRe02CostFee
} from "@/api/erp.public.js"

// 获取  贸易类型
export async function getTredeType() {

    var tradeTypeList = Storage.get("TradeType");

    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        //console.log('storage 返回',tradeTypeList)
        return tradeTypeList;
    } else {
        const respData = await listTradeType();
        tradeTypeList = respData.data;
        Storage.set("TradeType", tradeTypeList);
        return tradeTypeList;
    }


}

export async function getSaleType() {
    var tradeTypeList = Storage.get("SaleType");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listSaleType();
    tradeTypeList = respData.data;
    Storage.set("SaleType", tradeTypeList);
    return tradeTypeList;

}



export async function getRecType() {
    var tradeTypeList = Storage.get("RecType");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listRecType();
    tradeTypeList = respData.data;
    Storage.set("RecType", tradeTypeList);
    return tradeTypeList;

}

export async function getRecMethod() {
    var tradeTypeList = Storage.get("RecMethod");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listRecMethod();
    tradeTypeList = respData.data;
    Storage.set("RecMethod", tradeTypeList);
    return tradeTypeList;

}



export async function getCurrencyCode() {
    var tradeTypeList = Storage.get("CurrencyCode");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listCurrency();
    tradeTypeList = respData.data;
    Storage.set("CurrencyCode", tradeTypeList);
    return tradeTypeList;

}

export async function getVd05KhzList() {
    var tradeTypeList = Storage.get("vd05Khz");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listVd05Khz();
    tradeTypeList = respData.data;
    Storage.set("vd05Khz", tradeTypeList);
    return tradeTypeList;

}


export async function getVd05ZhhzList() {
    var tradeTypeList = Storage.get("vd05Zhhz");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listVd05Zhhz();
    tradeTypeList = respData.data;
    Storage.set("vd05Zhhz", tradeTypeList);
    return tradeTypeList;

}

export async function getVd05FkfsList() {
    var tradeTypeList = Storage.get("vd05Fkfs");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listVd05fkfs();
    tradeTypeList = respData.data;
    Storage.set("vd05Fkfs", tradeTypeList);
    return tradeTypeList;

}

export async function getPm02PayType() {
    var tradeTypeList = Storage.get("pm02PayType");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listPayType();
    tradeTypeList = respData.data;
    Storage.set("pm02PayType", tradeTypeList);
    return tradeTypeList;

}
export async function getPm02DlvTerm() {
    var tradeTypeList = Storage.get("pm02DlvTerm");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listPODlvTerm();
    tradeTypeList = respData.data;
    Storage.set("pm02DlvTerm", tradeTypeList);
    return tradeTypeList;

}

export async function getRe02CopstFee() {
    var tradeTypeList = Storage.get("Re02CostFee");
    if (tradeTypeList &&
        tradeTypeList !== undefined &&
        tradeTypeList !== null &&
        tradeTypeList.length > 0) {
        return tradeTypeList;
    }
    const respData = await listRe02CostFee();
    tradeTypeList = respData.data;
    Storage.set("Re02CostFee", tradeTypeList);
    return tradeTypeList;

}