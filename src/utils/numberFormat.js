// 此方法内部当前对象的属性data需要参考MDN的浏览器兼容问题
export function numberFormat(id, that) {
  const separator = ",";
  const reg = new RegExp(separator, "g");
  let lastValue = "";
  const inputDom = null;
  that.$nextTick(_ => {
    inputDom = document.getElementById(id);
  });
  console.log("inputDom", inputDom);
  // 获取光标位置
  function getCursorPosition(formatString, string) {
    let cursorPosition = inputDom.selectionStart;
    let index = cursorPosition - 1;
    // 光标前一个字符如果是分隔符
    if (string[index] === separator) {
      index -= 1;
    }
    // 计算光标前一个字符重复了几次
    let count = 0;
    for (let i = 0; i < index; i++) {
      if (string[i] === string[index]) {
        count++;
      }
    }
    // 计算光标位置
    let n = 0;
    for (let j = 0; j < formatString.length; j++) {
      if (formatString[j] === string[index]) {
        if (n === count) {
          cursorPosition = j + 1;
          break;
        }
        n++;
      }
    }
    return cursorPosition;
  }

  // 获取被删除的字符串
  function getDeletedString(lastString, string) {
    let deletedString = "",
      count = 0;
    for (let i = 0; i < lastString.length; i++) {
      if (lastString[i] === string[count]) {
        if (deletedString) {
          break;
        }
        count++;
      } else {
        deletedString += lastString[i];
      }
    }
    return deletedString;
  }

  // 格式化输入内容
  function format(replaceValue) {
    let amount = "";
    let sign = "";
    // 小数点左边
    let leftOfPoint = replaceValue;
    // 小数点右边
    let rightOfPoint = "";
    if (replaceValue.includes(".")) {
      [leftOfPoint, rightOfPoint] = replaceValue.split(".");
    }
    // 解决-号(负数)bug
    if (leftOfPoint.indexOf("-") > -1) {
      sign = "-";
      leftOfPoint = leftOfPoint.replace("-", "");
    }
    const length = leftOfPoint.length;
    // 余数
    const n = length % 3;
    // 我这里使用循环遍历字符串添加千分符，大家也可以使用正则表达式
    if (length > 3) {
      for (let i = 0; i < length; i++) {
        amount += leftOfPoint[i];
        // 判断条件说明:
        // 如果leftOfPoint = '1234578'，则n = 2
        // 当i = 1，i + 1 = 2 = n，amount = 12,345678
        // 当i = 4，i + 1 = 5 > n，(i + 1 - n) % 3 = 0，amount = 12,345,678
        if (
          i + 1 === n ||
          (i + 1 > n && i + 1 < length && (i + 1 - n) % 3 == 0)
        ) {
          amount += separator;
        }
      }
    } else {
      amount = leftOfPoint;
    }
    // 如果有小数
    if (rightOfPoint) {
      amount += "." + rightOfPoint;
    }
    return sign + amount;
  }
  // 监听input事件
  inputDom.addEventListener("input", function(e) {
    let value = inputDom.value;
    // 直接输入小数点
    if (value === ".") {
      inputDom.value = "";
      return;
    }
    let cursorPosition = inputDom.selectionStart;
    // 如果输入2个小数点或输入分隔符
    if (value.indexOf(".") !== value.lastIndexOf(".") || e.data === separator) {
      let leftOfCursor = value.substring(0, cursorPosition - 1);
      let rightOfCursor = value.substring(cursorPosition);
      inputDom.value = leftOfCursor + rightOfCursor;
      inputDom.selectionStart = cursorPosition - 1;
      inputDom.selectionEnd = cursorPosition - 1;
      return;
    } else if (value[value.length - 1] === ".") {
      // 末尾输入小数点
      return;
    }

    // let formatValue = moneyFormat(value);
    let formatValue = format(value.replace(reg, ""));

    // 由于delete键是向后删除的，所以需要判断被删除的字符是不是分隔符，如果是，则光标向后移动一位
    if (
      e.inputType === "deleteContentForward" &&
      getDeletedString(lastValue, value) === separator
    ) {
      cursorPosition += 1;
    } else {
      cursorPosition = getCursorPosition(formatValue, value);
    }

    inputDom.value = formatValue;
    inputDom.selectionStart = cursorPosition;
    inputDom.selectionEnd = cursorPosition;
    lastValue = formatValue;
  });
}
