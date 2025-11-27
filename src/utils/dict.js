const dict = {
  auditStatus:  [
    { name: "未申请审批", code: "D" },
    { name: "申请审批", code: "S" },
    { name: "审批同意", code: "Y" },
    { name: "审批不同意", code: "N" },
    { name: "申请撤销", code: "SU" },
    { name: "撤销同意", code: "UN" },
    { name: "上报", code: "UP" },
    { name: "不作为检索条件", code: "" }
  ]
}

export function filterDict (val, dictName) {
  const arr = dict[dictName]
  let name = ''
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].code === val) {
        name = arr[i].name
        break
      }
    }
  }
  return name
}