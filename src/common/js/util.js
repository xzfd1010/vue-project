/**
 * Created by nick on 2017/4/27.
 */

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 正则表单时，第一部分匹配?，第二部分匹配id，第三部分匹配12345
  // []是选择匹配?或者&
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      // [id,12345]
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
