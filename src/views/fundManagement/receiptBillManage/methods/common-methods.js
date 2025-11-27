import { Notify } from "vant";
import { moneyFormat, dateFormat, rMoneyFormat } from "@/utils/format";
/**  子表新增时判断是否可以继续新增下一条明细内容
  *  (例如商品明细formData.items)
  * @param ---validateField---校验字段的数组---目前只能传一个数组对象
  * (如需传其他形式，请自行扩展)
  * @param ---items---需要进行校验的子表---目前只能是一个数组对象
  * (如需传其他形式，请自行扩展)
  * @param ---index---需要提示具体哪一行字段没有录入---目前是一个数字类型
  * 举例: isCanAddItems(
  * [{enField: "name",cnField: "姓名"}], 
  * [{name: "张三"}],
  * 1
  * )
*/
export function isCanAddItems(validateField, items, index) {
  let isReturn = false;
  // 判断是否可新增
  // for (const [item, indem] in items) {
  items.forEach((item, indem) => {
    for (const { enField, cnField } of validateField) {
      if (
        item[enField] === null ||
        item[enField] === "" ||
        item[enField] === undefined
      ) {
        if (index !== null && index >= 0 && index !== undefined) {
          // console.log("index", index);
          Notify({
            type: "warning",
            message: `当前明细第${index + 1}行${cnField}不能为空!`
          });
        } else {
          // console.log("indem", indem);
          // console.log("index", index);
          Notify({
            type: "warning",
            message: `当前明细第${indem + 1}行${cnField}不能为空!`
          });
        }
        isReturn = true;
      }
    }
  });
  return isReturn;
}
/***
 * @param --type---转化的类型--用户枚举判断
 * @param --dataSource---被转化的数据源--
 * 目前主要用于对金额千分符的互相转化
 * Number表示要转化成数字型以备保存时使用
 * Money表示要转化成千分符格式以备数据初始化使用
 */
export function customFormat(type, dataSource) {
  if (type === "Number") {
    dataSource["amntFeeSum"] = rMoneyFormat(dataSource["amntFeeSum"]);
    dataSource["amntFeeASum"] = rMoneyFormat(dataSource["amntFeeASum"]);
    dataSource["amount"] = rMoneyFormat(dataSource["amount"]);
    dataSource["amountYe"] = rMoneyFormat(dataSource["amountYe"]);
    dataSource.items.forEach((item, index) => {
      dataSource.items[index]["amntFeeSum"] = rMoneyFormat(
        dataSource.items[index]["amntFeeSum"]
      );
    });
  } else if (type === "Money") {
    dataSource["amntFeeSum"] = moneyFormat(dataSource["amntFeeSum"]);
    dataSource["amntFeeASum"] = moneyFormat(dataSource["amntFeeASum"]);
    dataSource["amount"] = moneyFormat(dataSource["amount"]);
    dataSource["amountYe"] = moneyFormat(dataSource["amountYe"]);
    dataSource.items.forEach((item, index) => {
      dataSource.items[index]["amntFeeSum"] = moneyFormat(
        dataSource.items[index]["amntFeeSum"]
      );
    });
  }
}

// 声明:此文件(common-methods.js)最好用来定义当前页面需求的一些公共函数,
// 后续如果想抽离成全局函数,建议自行说明文档
