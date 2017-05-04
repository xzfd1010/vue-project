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

const routes = [{
  path: '/',
  component: goods
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}]

// 初始化router对象
const router = new VueRouter({
  linkActiveClass: 'active',
  // routes对象是一个数组，path路径 + 组件
  routes
})

// 下面这行用于跳过eslint的规则
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render函数，vue2.0的特性，可以通过javascript函数初始化模板，不必传入template
  render: h => h(App)
})
