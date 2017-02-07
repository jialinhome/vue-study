<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
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

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header';

  export default {
    data () {
      return {
        seller: {},
      };
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.seller = response.data;
          console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header,
    },
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./commen/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a // .tab-item下的直接a子元素
        display: block /*目的是点击a标签边上的空白地方也可以实现跳转，a元素会自动撑满父元素*/
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active // a元素中有active类的元素
          color: rgb(240, 20, 20)
</style>
