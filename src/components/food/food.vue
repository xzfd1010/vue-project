<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <!--图片加载存在异步的过程-->
        <img :src="food.image" alt="">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
        </div>
      </div>
      <div class="cartcontrol-wrapper">
        <cartcontrol :food="food"></cartcontrol>
      </div>
      <div class="buy" v-show="!food.count || food.count===0"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.foods, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .food
    position: fixed
    left: 0;
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff;
    &.move-transition
      transform: translate3d(0, 0, 0)
      transition: all .2s linear
    &.move-enter, &.move-leave
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      /*w3c标准：padding设置100%时，计算是相对于宽度计算的*/
      padding-top: 100%
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px;
          color: #fff

    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px;
        line-height: 10px
        height: 10px;
        font-size: 0;
        .sell-count, .rating
          font-size: 10px;
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px;
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          color: rgb(240, 20, 20)
          font-size: 14px
        .old
          text-decoration: line-through;
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
