<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item border-1px">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" v-bind:src="food.icon">
              </div>
              <div class="content">
                <h2 class=name>{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object,
      },
    },
    data () {
      return {
        goods: [],
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods);
        }
      });
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../commen/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px // 设置width是为了防止android上显示出现问题
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding-left: 12px
        line-height: 14px
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.2))
          font-size: 12px
        .icon
          display: inline-block
          width: 14px
          height: 14px
          vertical-align: top
          margin: 0 6px 0 0
          background-size: 14px 14px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px;
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159);
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.2))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
        .name
          margin: 2px 0 8px 0
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)


</style>

