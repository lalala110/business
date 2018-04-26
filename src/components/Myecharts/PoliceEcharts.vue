<template>
 <div class="policeCharts">
  <!-- 实现在线警情统计图表的功能 -->
   <p>警情统计</p>
   <div id="policeChart" :style="{width: '1000px', height: '550px'}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartData: [
        {name: '今日', data: [5, 20, 16, 10, 10, 20, 17, 20, 18]},
        {name: '昨日', data: [5, 20, 14, 12, 4, 20, 18, 20, 18]},
        {name: '上周周日', data: [5, 20, 16, 10, 13, 16, 25, 20, 18]}
      ],
      getSerious: []
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
        let getSeriousData = {
          name: this.chartData[i].name,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.chartData[i].data
        }
        this.getSerious.push(getSeriousData)
      }
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('policeChart'))
      // 实现绘制图表的功能
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 1,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '20%',
          right: '4%',
          bottom: '10%',
          top: '10%',
          containLabel: true,
          boundaryGap: true
        },
        xAxis: {
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            length: 0,
            alignWithLabel: true,
            inside: true,
            boundaryGap: true
          }
        },
        yAxis: {
          min: 0,
          max: 25,
          splitNumber: 5,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
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
  .policeCharts{
    position: relative;
    width: 1300px;
    height: 600px;
    /* border:1px solid #ddd; */
    margin:0 auto;
   }
  .policeCharts p{
    font-size: 40px;
    padding-top:20px;
    text-align: center;
    color:#fff;
  }

</style>
