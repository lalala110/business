<template>
<div class="incity-charts">
   <div class="incity-title">
     进城车辆统计
   </div>
  <div class="incity-header">
      <ul>
          <li :class="{'active':isAcitve=='ImonthEcharts'}" @click="toggleTab('ImonthEcharts')" >月</li>
          <li :class="{'active':isAcitve=='IdateEcharts'}" @click="toggleTab('IdateEcharts')">日</li>
          <li :class="{'active':isAcitve=='ItimeEcharts'}" @click="toggleTab('ItimeEcharts')">时</li>
      </ul>
  </div>
 <div class="incity-content">
      <month-echarts :is="currentTab" keep-alive></month-echarts>
  </div>
</div>
</template>

<script>
import ImonthEcharts from './IncityList/ImonthEcharts'
import IdateEcharts from './IncityList/IdateEcharts'
import ItimeEcharts from './IncityList/ItimeEcharts'
export default {
  components: {
    IdateEcharts,
    ImonthEcharts,
    ItimeEcharts
  },
  data () {
    return {
      currentTab: 'ImonthEcharts',
      isAcitve: 'ImonthEcharts'
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
.incity-charts {
  width: 1300px;
  height: 600px;
  position: relative;
}

.incity-title {
  text-align: center;
  font-size: 30px;
  color: #48ffff;
  padding: 30px 10px;
}
.incity-back a {
  color: #48ffff;
  font-size: 20px;
  text-decoration: none;
}
.incity-header {
  height: 40px;
}
.incity-header ul {
  height: 30px;
  margin: 0 auto;
  width: 310px;
}
.incity-header ul li {
  color: #48ffff;
  float: left;
  width: 80px;
  height: 30px;
  border: 1px solid #ddd;
  line-height: 30px;
  font-size: 20px;
  border-radius: 10px;
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
}
.active {
  background: #330099;
}
.incity-search {
  position: absolute;
  top: 60px;
  right: 40px;
}
.incity-search span {
  color: #48ffff;
  font-size: 16px;
}
.incity-search input {
  border: 1px solid #666;
  background: transparent;
  padding: 10px;
  width: 140px;
  height: 10px;
  line-height: 30px;
  margin-left: 10px;
  font-size: 16px;
  color: #48ffff;
}
.incity-search .incity-dire {
  margin-top: 10px;
}
.incity-search .incity-dire input {
  width: 180px;
  padding-right: 20px;
}
.incity-search button {
  border: 1px solid #666;
  background: transparent;
  width: auto;
  padding-left: 5px;
  padding-right: 5px;
  height: 30px;
  color: #48ffff;
  font-size: 16px;
}
</style>
