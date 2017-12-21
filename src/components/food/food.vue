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
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade">加入购物车
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <!--在这里传入给ratingselect的变量-->
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                      :ratings="food.ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                class="rating-item border-1px-bottom">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img width="12" height="12" :src="rating.avatar" alt="" class="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!(food.ratings && food.ratings.length)">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  // 非花括号是export default引入，花括号不是default
  import {formatDate} from 'common/js/date'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'

  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
//      保持不同的商品初始化状态相同
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
//        第一次可能不存在food.count
        Vue.set(this.food, 'count', 1)
//        动画，解决动画的位置定为不准确，将消失时也做成动画，这样cartcontrol的位置能够被计算
        this.$dispatch('cart.add', event.target)
      },
      needShow(type, text) {
//      判断是否显示内容
        if (this.onlyContent && !text) {
          return false
        }
//      判断选择类型
        if (this.selectType === ALL) {
          return true
        } else {
//        否则根据选择类型来选择
          return type === this.selectType
        }
      }
    },
    events: {
//      监听事件
      'ratingtype.select'(type) {
        this.selectType = type
//      需要更新页面，Vue的DOM更新是异步的
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import '../../common/stylus/mixin.styl'
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
      position: relative
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
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px;
        color: #ffffff
        background: rgb(0, 160, 220);
        &.fade-transition
          transition: all .2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        padding: 0 8px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        text-align: justify

    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px;
        .rating-item
          position: relative
          padding: 16px 0
          border-1px-bottom(rgba(7, 17, 27, .1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px;
            font-size: 0;
            .name
              display: inline-block
              margin-right: 6px;
              vertical-align: top
              font-size: 10px;
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%

          .time
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159)
          .text
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              line-height: 16px;
              margin-right: 4px;
              font-size: 12px;
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px;
          color: rgb(147, 153, 159)
</style>
