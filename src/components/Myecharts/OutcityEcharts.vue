<template>
<div class="outcity-charts">
   <div class="outcity-title">
     出城车辆统计
   </div>
  <div class="outcity-header">
      <ul>
          <li :class="{'active':isAcitve=='OmonthEcharts'}" @click="toggleTab('OmonthEcharts')" >月</li>
          <li :class="{'active':isAcitve=='OdateEcharts'}" @click="toggleTab('OdateEcharts')">日</li>
          <li :class="{'active':isAcitve=='OtimeEcharts'}" @click="toggleTab('OtimeEcharts')">时</li>
      </ul>
  </div>
 <div class="outcity-content">
      <month-echarts :is="currentTab" keep-alive></month-echarts>
  </div>
</div>
</template>

<script>
import OmonthEcharts from './OutcityList/OmonthEcharts'
import OdateEcharts from './OutcityList/OdateEcharts'
import OtimeEcharts from './OutcityList/OtimeEcharts'
export default {
  components: {
    OdateEcharts,
    OmonthEcharts,
    OtimeEcharts
  },
  data () {
    return {
      currentTab: 'OmonthEcharts',
      isAcitve: 'OmonthEcharts'
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
 .outcity-charts{
   width:1300px;
   height:600px;
   position: relative;
 }

 .outcity-title {
   text-align: center;
   font-size:30px;
   color:#48ffff;
   padding: 30px 10px;
  }
 .outcity-back a {
   color:#48ffff;
   font-size: 20px;
   text-decoration: none;
 }
.outcity-header {
   height:40px;
}
.outcity-header ul{
    height:30px;
    margin:0 auto;
    width:310px;
}
.outcity-header ul li {
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
.outcity-search {
  position: absolute;
  top:60px;
  right:40px;
}
.outcity-search span {
  color:#48ffff;
  font-size:16px;
}
.outcity-search input {
   border: 1px solid #666;
   background:transparent;
   padding:10px;
   width:140px;
   height:10px;
   line-height: 30px;
   margin-left:10px;
   font-size:16px;
   color:#48ffff
}
.outcity-search .outcity-dire {
    margin-top: 10px;
}
.outcity-search .outcity-dire input {
    width:180px;
    padding-right:20px;
}
.outcity-search button {
  border: 1px solid #666;
  background:transparent;
  width:auto;
  padding-left:5px;
  padding-right:5px;
  height: 30px;
  color:#48ffff;
  font-size:16px;
}
</style>
