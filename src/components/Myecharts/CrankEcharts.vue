<template>
<div class="crank-charts">
   <div class="crank-back"><a href="#">返回</a></div>
   <div class="crank-title">
     环比值
   </div>
  <div class="crank-header">
      <ul>
          <li :class="{'active':isAcitve=='RmonthEcharts'}" @click="toggleTab('RmonthEcharts')">月</li>
          <li :class="{'active':isAcitve=='RdateEcharts'}" @click="toggleTab('RdateEcharts')">日</li>
          <li :class="{'active':isAcitve=='RtimeEcharts'}" @click="toggleTab('RtimeEcharts')">时</li>
      </ul>
  </div>
  <div class="crank-search">
    <span>路口</span>
    <input type="text" value="状元路-水阳江大道">
    <button>搜索</button>
     <div class="crank-dire">
    <span>方向</span>
    <input type="text" value="鳌峰路-水阳江大道">
     </div>
    </div>
  <div class="crank-content">
      <month-echarts :is="currentTab" keep-alive></month-echarts>
  </div>
</div>
</template>

<script>
import RmonthEcharts from './BusyRankList/RmonthEcharts'
import RdateEcharts from './BusyRankList/RdateEcharts'
import RtimeEcharts from './BusyRankList/RtimeEcharts'
export default {
  components: {
    RmonthEcharts,
    RdateEcharts,
    RtimeEcharts
  },
  data () {
    return {
      currentTab: 'RmonthEcharts',
      isAcitve: 'RmonthEcharts'
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
 .crank-charts{
   width:1300px;
   height:600px;
   position: relative;
 }
 .crank-back {
   padding-top:30px;
   padding-left:40px;
   font-size: 20px;
   color:#48ffff
 }
 .crank-title {
   text-align: center;
   font-size:30px;
   color:#48ffff;
   padding-bottom:10px;
  }
 .crank-back a {
   color:#48ffff;
   font-size: 20px;
   text-decoration: none;
 }
.crank-header {
   height:40px;
}
.crank-header ul{
    height:30px;
    margin:0 auto;
    width:310px;
}
.crank-header ul li {
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
.crank-header .active {
   background: #330099;
}
.crank-search {
  position: absolute;
  top:60px;
  right:40px;
}
.crank-search span {
  color:#48ffff;
  font-size:16px;
}
.crank-search input {
   border: 1px solid #fff;
   background:transparent;
   padding:10px;
   width:140px;
   height:10px;
   line-height: 30px;
   margin-left:10px;
   font-size:16px;
   color:#48ffff
}
.crank-search .crank-dire {
    margin-top: 10px;
}
.crank-search .crank-dire input {
    padding-right:50px;
}
.crank-search button {
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
