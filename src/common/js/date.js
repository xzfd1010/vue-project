/**
 * Created by nick on 2017/4/25.
 */
// 公用的方法
export function formatDate (date, fmt) {
  // 利用正则表达式匹配fmt
  if (/(y+)/.test(fmt)) {
    // RegExp.$1是匹配的第一个值，就是yyyy，用date中的年截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    // 月份要加1，从0开始计算
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 遍历对象
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // 把要替换的值转化为字符串，o中的value
      let str = o[k] + ''
      // 有些月份要补0
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  // 返回替换后的日期格式
  return fmt
}

// 补零函数
function padLeftZero (str) {
  // 从第length个截取，确保补1个0
  return ('00' + str).substr(str.length)
}
