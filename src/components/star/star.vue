<template>
  <div class="star" v-bind:class="starType">
    <span v-for="itemClass in itemClasses" track-by="$index" v-bind:class="itemClass" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number,
      },
      score: {
        type: Number,
      },
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2; // 这样可以向下取整0.5，如；4.6 -> 4.5, 4.2 -> 4
        let hasDecimal = score % 1 !== 0; // 判断score是不是小数
        let integer = Math.floor(score); // 选取整数部分

        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }

        if (hasDecimal) {
          result.push(CLS_HALF);
        }

        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../commen/stylus/mixin.styl'

  .star
    font-size: 0 // 为了清除间隙
    .star-item //定义star-item的基本样式
      display: inline-block
      background-repeat: no-repeat
  &.star-48
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image("star48_on")
      &.half
        bg-image("star48_half")
      &.off
        bg-image("star48_off")
  &.star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-child
        margin-right: 0
      &.on
        bg-image("star36_on")
      &.half
        bg-image("star36_half")
      &.off
        bg-image("star36_off")
  &.star-24
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
      &:last-child
        margin-right: 0
      &.on
        bg-image("star24_on")
      &.half
        bg-image("star24_half")
      &.off
        bg-image("star24_off")

</style>

