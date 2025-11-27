// 格式化金额
export function moneyFormat(val) {
  if (!val) return "0.00";
  var intPart = Number(val) - Number(val) % 1;
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");

  var floatPart = ".00";
  var value2Array = val.toString().split(".");

  if (value2Array.length == 2) {
    floatPart = value2Array[1].toString();

    if (floatPart.length == 1) {
      return intPartFormat + "." + floatPart + "0";
    } else if (floatPart.length >= 6) {
      return intPartFormat + "." + floatPart.slice(0, 6);
    } else {
      return intPartFormat + "." + floatPart;
    }
  } else {
    return intPartFormat + floatPart;
  }
}
// 格式化数字
export function numberFormat(val, n) {
  return val.toFixed(n);
}

export function rMoneyFormat(val) {
  if (!val) return "0.00";
  let f = val.toString().replace(/[^\d\.-]/g, "");
  return f;
}

// export function dateFormat(val){
//     let fullYear = val.getFullYear();
//     let month = val.getMonth() + 1;
//     let monthStr = month < 10 ? '0'+month : month;
//     let day = val.getDate();
//     let dayStr = day < 10 ? '0'+day : day;
//     return   fullYear +'-'+monthStr+'-'+dayStr;
// }

/**
 * #=创建日期对象
 * @param {String|Number|Date} date 日期字符串，数字时间，日期对象
 */
export function createDate(date = new Date()) {
  switch (typeof date) {
    case "string":
      return new Date(date.replace(/-/g, "/").replace(/T|Z/g, " ").trim());
    case "number":
      return new Date(date);
    default:
      return date;
  }
}

export function dateFormat(date, format = "yyyy-MM-dd") {
  if (!date) return date;
  date = createDate(date);
  let o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "H+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds()
    // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}

export const clone = obj => {
  var o;
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === "object") {
    // 如果  他是空的话
    if (obj === null) {
      o = null;
    } else {
      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]));
        }
      } else {
        // 如果  他是对象object的话
        o = {};
        for (var j in obj) {
          o[j] = clone(obj[j]);
        }
      }
    }
  } else {
    o = obj;
  }
  return o;
};
