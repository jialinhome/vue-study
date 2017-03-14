<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item border-1px" v-bind:class="{'current': currentIndex===$index}" v-on:click="selectMenu($index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" v-bind:src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';

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
        listHeight: [],
        scrollY: 0, // 获得scroll的Y坐标
      };
    },
    computed: {
      currentIndex () { // 当scrollY滚动的时候，currentIndex 会跟着变化
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // 如果scrollY的值落在第i个li上
          // !height2 为undefined的时候，说明到了组后一个
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods);
          this.$nextTick(() => { // 防止dom还没填充内容的时候对BScroll进行初始化，导致不生效
            this._initScroll();
            this._caculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu (index, event) {
        // 如果在电脑端浏览器上点击item，会触发两次点击事件，一次是正常的点击事件，一次是better-scroll派发的点击事件，这个是阻止better-scroll派发的那次点击事件
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      // 初始化better-scroll
      _initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true, // 使scroll里边包含的内容可以点击
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3, // 检测scroll实时滚动的位置
        });
        // 给scroll绑定监听事件，计算scrollY的值
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算右侧foods的高度,计算每一个li从顶部到父元素顶部的高度
      _caculateHeight () {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
    },
    components: {
      shopcart,
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
        padding:0 12px 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          top: -1px
          background: #ffffff
          font-weight: 700
          .text
            border-none()
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
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)



</style>

