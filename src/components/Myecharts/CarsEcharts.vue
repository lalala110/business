<template>
<div class="cart-charts">
   <div class="cart-back"><a href="#">返回</a></div>
   <div class="cart-title">
     环比值
   </div>
  <div class="chart-header">
      <ul>
          <li :class="{'active':isAcitve=='monthEcharts'}" @click="toggleTab('monthEcharts')">月</li>
          <li :class="{'active':isAcitve=='dateEcharts'}" @click="toggleTab('dateEcharts')">日</li>
          <li :class="{'active':isAcitve=='timeEcharts'}" @click="toggleTab('timeEcharts')">时</li>
      </ul>
  </div>
  <div class="chart-search">
    <span>路口名称</span>
    <input type="text" value="状元路-水阳江大道">
    <button>搜索</button>
  </div>
  <div class="chart-content">
      <month-echarts :is="currentTab" keep-alive></month-echarts>
  </div>
</div>
</template>

<script>
import monthEcharts from './List/MonthsEcharts'
import dateEcharts from './List/DataEcharts'
import timeEcharts from './List/TimeEcharts'
export default {
  components: {
    monthEcharts,
    dateEcharts,
    timeEcharts
  },
  data () {
    return {
      currentTab: 'monthEcharts',
      isAcitve: 'monthEcharts'
    }
  },
  methods: {
    toggleTab (tab) {
      this.currentTab = tab
      this.isAcitve = tab
    }
  }
}
</script>

<style lang="less" scope >
 .cart-charts{
  width:1300px;
  height:600px;
  position: relative;
 }
 .cart-back {
  padding-top:30px;
  padding-left:40px;
  font-size: 20px;
  color:#48ffff
 }
 .cart-title {
  text-align: center;
  font-size:30px;
  color:#48ffff;
  padding-bottom:10px;
  }
 .cart-back a {
  color:#48ffff;
  font-size: 20px;
  text-decoration: none;
 }
.chart-header {
  height:40px;
}
.chart-header ul{
  height:30px;
  margin:0 auto;
  width:310px;
}
.chart-header ul li {
  color:#48ffff;
  float:left;
  width:80px;
  height:30px;
  border:1px solid #ddd;
  line-height:30px;
  font-size:20px;
  border-radius:10px;
  margin-right:20px;
  text-align:center;
  cursor:pointer;
}
.active {
   background: #330099;
}
.chart-search {
  position: absolute;
  top:110px;
  right:40px;
}
.chart-search span {
  color:#48ffff;
  font-size:16px;
}
.chart-search input {
  border: 1px solid #fff;
  background:transparent;
  width:140px;
  height:30px;
  line-height: 30px;
  margin-left:10px;
  font-size:16px;
  color:#48ffff
}
.chart-search button {
  border: 1px solid #ddd;
  background:transparent;
  width:auto;
  padding-left:5px;
  padding-right:5px;
  height: 30px;
  color:#48ffff;
  font-size:16px;
}
</style>
