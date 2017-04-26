import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

import 'common/stylus/index.styl'

// 相当于全局注册
Vue.use(VueRouter)
Vue.use(VueResource)

// 下面这行用于跳过eslint的规则
/* eslint-disable no-new */

// 路由器的根组件
let app = Vue.extend(App)

let router = new VueRouter({
  linkActiveClass: 'active'
})

// 配置路由
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

router.start(app, '#app')

// 设置默认启动
// router.go('/goods')
