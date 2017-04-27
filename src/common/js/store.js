/**
 * Created by nick on 2017/4/27.
 */
/**
 * 存储的方法
 */
export function saveToLocal (id, key, value) {
  // 双下划线代表私有
  let seller = window.localStorage.__seller__
  // 未创建seller，创建
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    // 否则查看是否已存储过此id
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

// def默认值
export function loadFromLocal (id, key, def) {
  // 是否存在seller，是否存在id，是否存在value
  let seller = window.localStorage.__seller__
  // 判断是否有seller
  if (!seller) {
    return def
  }
  // 如果有，利用JSON.parse解析，同时获取id
  seller = JSON.parse(seller)[id]
  // 如果没有id，返回默认值
  if (!seller) {
    return def
  }
  // 否则返回value，如果没有value，返回默认值
  let ret = seller[key]
  return ret || def
}
