<template>
<div class="cart-charts">
   <div class="cart-back"><a href="#">返回</a></div>
   <div class="cart-title">
     环比值
   </div>
  <div class="chart-header">
      <ul>
          <li :class="{'active':isAcitve=='TsmonthEcharts'}" @click="toggleTab('TsmonthEcharts')">月</li>
          <li :class="{'active':isAcitve=='TsdateEcharts'}"  @click="toggleTab('TsdateEcharts')">日</li>
          <li :class="{'active':isAcitve=='TstimeEcharts'}" @click="toggleTab('TstimeEcharts')">时</li>
      </ul>
  </div>
  <div class="chart-search">
    <span>收费站名称</span>
    <input type="text" value="XXXX收费站">
    &nbsp;&nbsp;
   <span>方向</span>
    <input type="text" value="进城" style="width:50px">
    <button>搜索</button>
  </div>
  <div class="chart-content">
      <Tsmonth-echarts :is="currentTab" keep-alive></Tsmonth-echarts>
  </div>
</div>
</template>

<script>
import TsmonthEcharts from './TstationList/TsMonthEcharts'
import TsdateEcharts from './TstationList/TsDateEcharts'
import TstimeEcharts from './TstationList/TsTimeEcharts'
export default {
  components: {
    TsmonthEcharts,
    TsdateEcharts,
    TstimeEcharts
  },
  data () {
    return {
      currentTab: 'TsmonthEcharts',
      isAcitve: 'TsmonthEcharts'
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
.chart-header .active {
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
