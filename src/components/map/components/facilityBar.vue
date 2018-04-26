<template>
  <div  class="bar-wrap" >
    <span class="arrow back" @click = "scrollMove(1)"></span>
    <div ref ="scrollWrap" class="scroll-items-wrap">
      <div  class="scroll-items"  >
        <ul ref = 'ulItem' :style="{width: barWidth + 'px'}">
          <li v-for="(eq, index) in list" :class="{loading: eq.loading}"  :key="index" >
            <span @click="showFeature(eq)">{{eq.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <span class="arrow more" @click = "scrollMove(-1)"></span>
  </div>
</template>

<script>
import IScroll from 'iscroll'
export default {
  name: 'facilityBar',
  props: ['list'],
  data () {
    return {
      scrollBar: '',
      btnWidth: null
    }
  },
  mounted () {
    this.scrollBar = new IScroll(this.$refs['scrollWrap'], { scrollX: true, scrollY: false, mouseWheel: true })
  },
  updated () {
    !this.btnWidth && this.$refs['ulItem'].firstChild && (this.btnWidth = this.$refs['ulItem'].firstChild.offsetWidth)
    this.scrollBar.refresh()
  },
  methods: {
    scrollMove (v) {
      this.scrollBar.scrollBy(v * this.btnWidth, 0, 300)
    },
    showFeature (eq) {
      this.$emit('showFeature', eq)
    }
  },
  computed: {
    barWidth () {
      return this.btnWidth ? this.list.length * this.btnWidth : 0
    }
  }
}
</script>

<style lang="less" scope >

  .bar-wrap{
    position: relative;
    padding: 0 100px;
    height: 140px;
    border-radius: 70px;
    background-color: rgba(70, 232, 255, .4);
    -webkit-user-select: none;
    .scroll-items-wrap{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .arrow{
      position: absolute;
      display: block;
      top:0;
      bottom: 0;
      margin: auto;
      width: 44px;
      height: 72px;
      cursor: pointer;
    }
    .arrow.back{
      left: 30px;
      background: transparent url('../../../assets/images/back.png') center/cover no-repeat;
    }
    .arrow.more{
      right: 30px;
      background: transparent url('../../../assets/images/more.png') center/cover no-repeat;
    }
  }
  .scroll-items{

    position: absolute;
    width: auto;
    height: 100%;
    touch-action: none;
    overflow: hidden;

    ul{
      padding: 20px 0;
      width: 100%;
      height: 100%;
      white-space: nowrap;

      >li{
        float: left;
        width: 195px;
        height: 100px;
        color: #46E8ff;
        text-align: center;
        font:42px/100px 'Microsoft Yahei';
        >span{
          width: 180px;
          display: block;
          background-color: #0A2C44;
          border-radius: 50px;
          cursor: pointer;
        }
      }
    }
  }
</style>
