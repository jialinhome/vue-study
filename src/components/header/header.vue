<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <!-- 两个span连载一块就可以消除期间的间隙 -->
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img v-bind:src="seller.avatar" width="100%">
    </div>
    <div v-show="detailShow" class="detail"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object,
      },
    },
    data () {
      return {
        detailShow: false,
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      console.log(this.classMap);
    },
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../commen/stylus/mixin.styl'

  .header
    position: relative
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 14px
      font-size: 0 // 为了清除图片与文字间的间隙，所以后边的元素都要设置font-size属性
      .avatar
        display: inline-block
        font-size: 14px
        vertical-align: top // 该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐
        img
          border-radius: 2px;
      .content
        display: inline-block
        margin-left: 16px;
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top // 使图片与文字顶部对齐
            width: 12px
            height: 12px
            margin-right: 4px
            line-height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display: inline-block
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px // height 与 line-height 一致可以设置成垂直居中
      padding: 0 22px 0 12px
      white-space: nowrap // 规定段落中的文本不进行换行
      overflow: hidden // 超出的部分隐藏
      text-overflow: ellipsis // text-overflow 属性规定当文本溢出包含元素时发生的事情 ellipsis: 超出的部分变成...
      background-color: rgba(7, 17, 27, 0.2)
      // font-size: 0 // 为了消除前一个span与后一个span字体间的留白，但是这样会使刚才设置的省略号消失，因此不能使用这种方式
      .bulletin-icon
        display: inline-block
        vertical-align: top
        line-height: 12px
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        top: 8px
        right: 12px

    .background
      position: absolute
      overflow: hidden
      top: 0
      left: 0
      z-index: -1
      width: 100%
      height: 100%
      filter: blur(10px) // filter滤镜，产生一个模糊的效果
    .detail
      position: fixed // 采用 fixed 布局
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.8)

</style>

