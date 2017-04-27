<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px-bottom">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!--路由外链-->
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue'
  import { urlParse } from 'common/js/util'
  const ERR_OK = 0 // 用于判断返回状态，同时方便日后维护状态码

  export default{
    data() {
      return {
        seller: {
          // 立即执行函数获取id
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
//  钩子函数
    created() {
//      这里是去向api/seller这个路由获取的数据，获取的response是一个属性，其中的.json方法可以将其转换为json对象
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          // 不能直接赋值，第一个参数，返回结果，this.seller现有对象，response.data添加的属性
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style type="text/stylus" lang="stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px-bottom(rgba(7, 17, 27, 0.1))
    border-1px-top(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
