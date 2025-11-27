import { Notify } from "vant";
/**  子表新增时判断是否可以继续新增下一条明细内容
  *  (例如商品明细formData.items)
  * @param ---validateField---校验字段的数组---目前只能传一个数组对象
  * (如需传其他形式，请自行扩展)
  * @param ---items---需要进行校验的子表---目前只能是一个数组对象
  * (如需传其他形式，请自行扩展)
  * 举例: isCanAddItems(
  * [{enField: "name",cnField: "姓名"}], 
  * [{name: "张三"}]
  * )
*/
export function isCanAddItems(validateField, items) {
  let isReturn = false;
  // 判断是否可新增
  for (const item of items) {
    for (const { enField, cnField } of validateField) {
      if (
        item[enField] === null ||
        item[enField] === "" ||
        item[enField] === undefined
      ) {
        Notify({
          type: "warning",
          message: `${cnField}不能为空!`
        });
        isReturn = true;
      }
    }
  }
  return isReturn;
}

// 声明:此文件(common-methods.js)最好用来定义当前页面需求的一些公共函数,
// 后续如果想抽离成全局函数,建议自行说明文档
