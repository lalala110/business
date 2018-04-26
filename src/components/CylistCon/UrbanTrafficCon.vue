<template>
  <div class="box"
       :class="classrs==tip?'tfc':''">我是详情页</div>
</template>
<style scoped>
  .box {
    width: 1200px;
    height: 610px;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 50px;
    color: red;
    line-height: 610px;
    text-align: center;
    transform-origin: 50% bottom;
    transition: all 1s ease-out 1s;
    transform: rotateY(270deg);
  }
  .tfc {
    transform: rotateY(360deg);
  }
</style>
<script>
export default {
  name: 'TrafficConditionC',
  props: ['tip'],
  data () {
    return {
      classrs: 1
    }
  },
  created () {

  }
}
</script>
