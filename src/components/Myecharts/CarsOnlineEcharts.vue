<template>
  <div class="online-cars">
     <div class="title">
       <span>在网车辆数</span>
       <select name="" id="">
         <option value="urban">市区</option>
         <option value="middlecity">中心城区</option>
      </select>
  </div>
  <div class="score">
    <span class="score-rate">61.9%</span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="car-number">5678量</div>
  </div>
  <div id="carsOnlineChart" :style="{width: '1200px', height: '500px'}"></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      chartData: [
        {name: '今日', data: [70, 40, 30, 75, 16, 10, 10, 20, 17, 20, 18]},
        {name: '上月同日', data: [5, 20, 14, 12, 4, 20, 18, 20, 18]},
        {name: '去年同日', data: [5, 20, 16, 10, 13, 16, 25, 20, 18]}
      ],
      getSerious: [],
      getLengend: [],
      yMax: null,
      MaxArr: []
    }
  },
  mounted () {
    this.getSeriousData()
    this.drawLine()
  },
  methods: {
    // 遍历图表里面的数据
    getSeriousData () {
      for (let i = 0; i < this.chartData.length; i++) {
        let getSeriousData = {}
        if (i === 0) {
          getSeriousData = {
            name: this.chartData[i].name,
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: this.chartData[i].data,
            lineStyle: {
              width: 6
            }
          }
        } else {
          getSeriousData = {
            name: this.chartData[i].name,
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: this.chartData[i].data
          }
        }
        let getLengendData = {
          name: this.chartData[i].name,
          icon: 'rect'
        }
        this.getSerious.push(getSeriousData)
        this.getLengend.push(getLengendData)
        this.MaxArr.push(Math.max(...this.chartData[i].data))
      }
      this.yMax = Math.max(...this.MaxArr.splice(-3))
      this.yMax = this.yMax % 10 === 0 ? this.yMax : Math.ceil(this.yMax / 10) * 10
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('carsOnlineChart'))
      // 实现绘制图表的功能
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'horizontal',
          itemWidth: 15,
          itemHeight: 15,
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          x: 'right',
          right: '30%',
          data: this.getLengend
        },
        grid: {
          left: '8%',
          right: '2%',
          bottom: '10%',
          top: '10%',
          containLabel: true,
          boundaryGap: true
        },
        xAxis: {
          data: ['00:00', '03:00', '06:00', '12:00', '15:00', '18:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          axisLine: {
            lineStyle: {
              color: '#48ffff',
              width: 2
            }
          },
          axisTick: {
            show: false,
            length: 0,
            alignWithLabel: false,
            inside: true,
            lineStyle: {
              color: '#48ffff'
            }
          }
        },
        yAxis: {
          max: this.yMax,
          interval: this.yMax / 5,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: this.getSerious
      })
    }
  }
}
</script>

<style scoped>
.online-cars {
  width: 1240px;
  height: 540px;
  position: relative;
  padding: 30px;
}
.online-cars .title{
 text-align: center;
 font-size: 30px;
 height: 50px;
 line-height: 50px;
 color:#48ffff;
}
.online-cars select {
  float:right;
  width:120px;
  height: 30px;
  margin-top:10px;
  background-color:transparent;
  border: 1px solid #ddd;
  border-radius: 5px;
  color:#48ffff;
  padding-left:10px;
}
.score {
  position: relative;
  display: inline-block;
  height: 30px;
  top:30px;
  left:10%;
  line-height: 10px;
  color:#f3e507;
  font-size: 16px;
}
.score span {
  width:10px;
  height: 30px;
  background: #f3e507;
  display: inline-block;
}
.score span:nth-child(n+14) {
  background:#0860f5;
}
.score .car-number {
  position: absolute;
  top:50%;
  left:100%;
  transform:translate(10%,-50%);
  display:inline-block;
  height: 30px;
  line-height: 30px;
  background: transparent;
  color:#f3e507;
  font-size: 16px;
  width:100px;
}
.score .score-rate {
  font-size:16px;
  color:#f3e507;
  position: absolute;
  top:-50%;
  left:60%;
  background: transparent;
  display: inline-block;
}
</style>
