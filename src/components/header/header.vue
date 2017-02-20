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
    <div v-show="detailShow" class="detail" transition="fade">
      <!-- sticky footers 实现套路-->
      <!-- 需要最小高度撑满屏幕 -->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <star v-bind:size="48" v-bind:score="seller.score"></star>
          </div>
          <div class="title">
            <!-- flex item 采用div是由于在某些android浏览器下span会有宽度的问题 -->
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <!-- flex item 采用div是由于在某些android浏览器下span会有宽度的问题 -->
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!-- v-on:的缩写是@，既v-on:click可以写成@click -->
      <div class="detail-close" v-on:click="hideDetail">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue';

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
      hideDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      console.log(this.classMap);
    },
    components: {
      star,
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
      overflow: auto;
      transition: all 0.5s
      // backdrop-filter: blur(10px)
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height: 100% // 最小高度与包含其的容器一样高
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px // sticky footer 必需的样式，等于下边footer的高度
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative // 采用relative是由于relative是相对于其自身应该在文档流的位置进行定位
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-weight: 700px
              font-size: 14px
          .supports
              width: 80%
              margin: 0 auto
              .support-item
                padding: 0 12px
                margin-bottom: 12px
                font-size: 0
                &:last-child
                  margin-bottom: 0
                .icon
                  display: inline-block
                  width: 16px
                  height: 16px
                  vertical-align: top
                  margin: 0 6px 0 0
                  background-size: 16px 16px
                  &.decrease
                    bg-image('decrease_2')
                  &.discount
                    bg-image('discount_2')
                  &.guarantee
                    bg-image('guarantee_2')
                  &.invoice
                    bg-image('invoice_2')
                  &.special
                    bg-image('special_2')

                .text
                  line-height: 16px
                  font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px

</style>

