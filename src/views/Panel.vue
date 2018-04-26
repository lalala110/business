<template>
  <div class="panel-wrapper">
    <geoMap></geoMap>
    <CyHeader class="header"></CyHeader>
    <div class="chart-wrapper left">
      <div class="chart-box">
        <TrafficCondition></TrafficCondition>
      </div>
      <div class="chart-box">
        <RapidTransit></RapidTransit>
      </div>
      <div class="chart-box">
        <UrbanIntersection></UrbanIntersection>
      </div>
      <div class="chart-box">
        <TollGate></TollGate>
      </div>
      <div class="chart-box">
        <UrbanSection></UrbanSection>
      </div>
      <div class="chart-box">
        <HighCongestion></HighCongestion>
      </div>
    </div>
    <div class="chart-wrapper right">
      <div class="chart-box">
        <CarsEcharts></CarsEcharts>
      </div>
      <div class="chart-box">
        <CrankEcharts></CrankEcharts>
      </div>
      <div class="chart-box">
        <PoliceEcharts></PoliceEcharts>
      </div>
      <div class="chart-box">
        <OutcityEcharts></OutcityEcharts>
      </div>
      <div class="chart-box">
        <FlinkCarsEcharts></FlinkCarsEcharts>
      </div>
      <div class="chart-box">
        <CarsOnlineEcharts></CarsOnlineEcharts>
      </div>
    </div>
    <ul class="ploice-online">
      <li v-for="i in [0,1,2,3,4,5,6,7]"
          :key='i'>
        <span>在网警员</span>
      </li>
    </ul>
  </div>
</template>

<script>
import CyHeader from '../components/CyHeader.vue'
import geoMap from '../components/map/map.vue'
import CarsEcharts from '../components/Myecharts/CarsEcharts'
import PoliceEcharts from '../components/Myecharts/PoliceEcharts'
// import GrankEchaerts from '../components/Myecharts/GrankEchaerts'
import TrafficCondition from '../components/CylistCon/TrafficCondition.vue'
import UrbanIntersection from '../components/CylistCon/UrbanIntersection.vue'
import UrbanSection from '../components/CylistCon/UrbanSection.vue'
import RapidTransit from '../components/CylistCon/RapidTransit.vue'
import TollGate from '../components/CylistCon/TollGate.vue'
import HighCongestion from '../components/CylistCon/HighCongestion.vue'
// import qs from 'qs'
import CrankEcharts from '../components/Myecharts/CrankEcharts'
import TstationEcharts from '../components/Myecharts/TstationEcharts'
import FlinkCarsEcharts from '../components/Myecharts/FlinkCarsEcharts'
import CarsOnlineEcharts from '../components/Myecharts/CarsOnlineEcharts'
import IncityEcharts from '../components/Myecharts/IncityEcharts'
import OutcityEcharts from '../components/Myecharts/OutcityEcharts'
export default {
  name: 'panel',
  components: {
    geoMap,
    CyHeader,
    CarsEcharts,
    TrafficCondition,
    UrbanIntersection,
    CrankEcharts,
    PoliceEcharts,
    UrbanSection,
    TstationEcharts,
    FlinkCarsEcharts,
    CarsOnlineEcharts,
    RapidTransit,
    TollGate,
    HighCongestion,
    IncityEcharts,
    OutcityEcharts
  },
  data () {
    return {
      msg: ''
    }
  }
  /*,
  created () {
    const $ajax = this.$ajax.create({
      baseURL: '/apis',
      timeout: 1000,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpcCI6IjE5Mi4xNjguMjAwLjExOSIsImV4cCI6MTUyNDIxNTIwMiwidXNlcm5hbWUiOiJjeWwifQ.QZPczF30lbnaVFgkvyCI6qth4i7X3ZfQ6BiWUZSc7Q7joFTXd8sHzi1ctv0Kgsrn2JAtNsiGse-cHFLcEbPGgQ'}
    })

    // $ajax.post('/weather/list?page=1&rows=10&userCityName=广州&userArea=&currTime=2018-04-18 14:11:00')
    /*    let params = new FormData()
    params.append('page', 1)
    params.append('rows', 10)
    params.append('userCityName', '广州')
    params.append('userArea', '')
    params.append('currTime', '2018-04-18 14:11:00')
    $ajax.post('/weather/list', params)

    $ajax.post('/weather/list', qs.stringify({
      'page': 1,
      'rows': 10,
      'userCityName': '广州',
      'userArea': '',
      'currTime': '2018-04-18 14:11:00'
    }))
  } */
}
</script>

<style scoped lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
div {
  padding: 0;
  box-sizing: border-box;
}
.header {
  position: absolute !important;
  top: 0;
}
.panel-wrapper {
  position: relative;
  width: 8586px;
  height: 2046px;
  left: 0;
  top: 0;
  user-select: none;
  overflow: hidden;
}
.chart-wrapper {
  position: absolute;
  top: 54px;
  width: 2644px;
  height: auto;
  overflow: hidden;

  &.left {
    left: 56px;
  }
  &.right {
    right: 34px;
  }
  .chart-box {
    float: left;
    margin: 0 22px 22px 0;
    width: 1300px;
    height: 610px;
    background-image: url('/static/img/borderbg.0240688.png');
    overflow: hidden;
  }
}
.ploice-online {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  margin: auto;
  width: 2880px;
  height: 280px;

  > li {
    box-sizing: border-box;
    float: left;
    width: 260px;
    height: 260px;
    margin: 0 30px;
    padding-left: 24px;
    line-height: 256px;
    border: #0a3844 2px solid;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 10px #46e8ff;
    background-color: transparent;

    > span {
      display: inline-block;
      width: 210px;
      height: 210px;
      border-radius: 50%;
      border: 1px solid #0a3844;
      text-align: center;
      line-height: 210px;
      font-size: 42px;
      color: #46e8ff;
      background-color: #0a3844;
      -webkit-box-shadow: 0px 0px 46px 5px #000;
      box-shadow: 0px 0px 46px 5px #000;
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
