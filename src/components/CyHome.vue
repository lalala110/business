<template>
  <div class="CyHome">
    <CyHeader></CyHeader>
    <div class="page-list">
      <ul class="page-oul">
        <li>
          <CyList></CyList>
        </li>
        <li>
          <CyList></CyList>
        </li>
        <li>
          <CyList>
            <TrafficCoundtion></TrafficCoundtion>
          </CyList>
        </li>
        <li>
          <CyList>
            <UrbanIntersection></UrbanIntersection>
          </CyList>
        </li>
        <li>
          <CyList></CyList>
        </li>
        <li>
          <CyList></CyList>
        </li>
      </ul>
    </div>
    <div class="page-listR">
      <ul class="page-oul">
        <li>
          <CyList :comName="comNameList"
                  @dropevent="dropevent">
            <div :is='comName'></div>
            <span @click='closeEcharts'
                  v-if='showbtn'>
              <img src="../assets/images/close.png"
                   alt="">
            </span>
          </CyList>
        </li>
        <li>
          <CyList>
            <div>
              <cars-echarts></cars-echarts>
            </div>
          </CyList>
        </li>
        <li>
          <CyList>
            <div>
              <Crank-echarts></Crank-echarts>
            </div>
          </CyList>
        </li>
        <li>
          <CyList>
            <FlinkCarsEcharts></FlinkCarsEcharts>
          </CyList>
        </li>
        <li>
          <CyList>
          </CyList>
        </li>
        <li>
          <CyList></CyList>
        </li>
      </ul>
    </div>
    <CyBottombtn @drap="drap"></CyBottombtn>
  </div>
</template>
<style scoped>
.page-list {
  width: 2753px;
  /*height: 1992px;*/
  position: absolute;
  top: 54px;
  left: 56px;
}
.page-list ul {
  width: 100%;
}

.page-list ul li {
  float: left;
  margin-bottom: 22px;
  margin-right: 22px;
  position: relative;
}

.page-listR {
  width: 2753px;
  position: absolute;
  top: 54px;
  right: 56px;
}
.page-listR ul {
  width: 100%;
}
.page-listR ul li {
  float: right;
  margin-bottom: 22px;
  margin-right: 22px;
  position: relative;
}
.page-listR li span {
  color: #fff;
  font-size: 20px;
  position: absolute;
  width: 40px;
  height: 40px;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.page-list li span img {
  width: 40px;
  height: 40px;
}
.page-listR li span:hover {
  background: #f00;
}
</style>
<script>
import CyHeader from './CyHeader.vue'
import CyList from './CyList.vue'
import CyBottombtn from './CyBottombtn.vue'
import PoliceEcharts from './Myecharts/PoliceEcharts'
import CarsEcharts from './Myecharts/CarsEcharts'
import CrankEcharts from './Myecharts/CrankEcharts'
import TrafficCoundtion from './CylistCon/TrafficCondition.vue'
import UrbanIntersection from './CylistCon/UrbanIntersection.vue'
import TstationEcharts from './Myecharts/TstationEcharts'
import FlinkCarsEcharts from './Myecharts/FlinkCarsEcharts'
export default {
  name: 'CyHome',
  components: {
    CyHeader,
    CyList,
    CyBottombtn,
    PoliceEcharts,
    CarsEcharts,
    TrafficCoundtion,
    UrbanIntersection,
    CrankEcharts,
    TstationEcharts,
    FlinkCarsEcharts
  },
  data () {
    return {
      comNameList: '',
      comName: 'PoliceEcharts',
      showbtn: false
    }
  },
  methods: {
    drap (drap) {
      this.comNameList = drap.dataset.name
    },
    dropevent (val) {
      this.comName = val
      this.showbtn = true
    },
    // 当点击关闭按钮的时候，将图表关闭
    closeEcharts () {
      this.comName = ''
      this.showbtn = false
    }
  }
}
</script>
