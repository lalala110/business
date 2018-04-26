<template>
  <div>
    <div id="OtimeEchart" :style="{width: '1200px', height: '440px'}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getX: ['0:00', '2:00', '4:00', '6:00', '8:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', ''],
      getData: [
        {name: '4.15', data: [420, 132, 101, 134, 90, 230, 210, 345, 280, 270, 180, 256]},
        {name: '4.16', data: [320, 200, 256, 234, 290, 230, 210, 390, 267, 300, 101, 134]},
        {name: '4.17', data: [220, 230, 256, 234, 290, 230, 210, 390, 267, 300, 101, 134]},
        {name: '4.18', data: [120, 230, 256, 234, 290, 230, 234, 290, 230, 101, 134, 90]}
      ],
      //  默认选中的选项
      select: {},
      lineColor: [],
      getSerious: [],
      getLengend: [],
      getSelect: {},
      initBackground: [],
      yMax: '',
      MaxArr: [],
      fontColor: []
    }
  },
  //  挂载前先,初始化颜色
  beforeMount: function () {
    for (let i = 0; i < this.getData.length; i++) {
      if (i === this.getData.length - 3 || i === this.getData.length - 2 || i === this.getData.length - 1) {
        this.select[this.getData[i].name] = true
      } else {
        this.select[this.getData[i].name] = false
      }
      this.GetColor()
    }
    this.initColor()
  },
  mounted () {
    this.getSeriousData()
    this.drawLine()
  },
  methods: {
    //  初始化颜色
    initColor () {
      let arr = Object.values(this.select)
      let that = this
      let newArr = arr.map(function (v, i) {
        return v ? that.lineColor[i] : '#fff'
      })
      let fontColor = arr.map(function (v, i) {
        return v ? '#fff' : '#48ffff'
      })
      //  默认字体颜色
      this.fontColor = fontColor
      //  添加选中的选项的颜色到数组里
      this.initBackground = newArr
    },
    //  遍历里面的数据
    //  获取自定义的颜色
    GetColor () {
      let colorValue = '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f'
      let colorArr = colorValue.split(',')
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += colorArr[Math.floor(Math.random() * 16)]
      }
      color = color.replace(/\s/ig, '')
      //  将颜色添加到数组里
      this.lineColor.push(color)
    },
    getSeriousData () {
      for (let i = 0; i < this.getData.length; i++) {
        let getSeriousData = {
          name: this.getData[i].name,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.getData[i].data,
          itemStyle: {
            normal: {
              // 当前线条颜色
              color: this.lineColor[i]
            }
          }
        }
        let getLengendData = {
          name: this.getData[i].name,
          textStyle: {
            fontSize: 16,
            // 默认字体颜色
            color: this.fontColor[i],
            borderColor: '#666',
            borderWidth: 1,
            padding: [5, 10],
            borderRadius: 5,
            backgroundColor: this.initBackground[i]
          }
        }
        this.getSerious.push(getSeriousData)
        this.getLengend.push(getLengendData)
        this.MaxArr.push(Math.max(...this.getData[i].data))
      }
      this.yMax = Math.max(...this.MaxArr.splice(-3))
      this.yMax = this.yMax % 30 === 0 ? this.yMax : Math.ceil(this.yMax / 30) * 30
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('OtimeEchart'))
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          orient: 'horizontal',
          x: 'left',
          left: '15%',
          y: 'bottom',
          itemWidth: 0,
          itemHeight: 0,
          inactiveColor: '#48ffff',
          data: this.getLengend,
          selected: this.select
        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        toolbox: {},
        xAxis: {
          axisTick: {
            length: 10,
            alignWithLabel: true,
            inside: true,
            boundaryGap: true
          },
          name: '时间',
          nameTextStyle: {
            color: '#48ffff',
            fontSize: 16
          },
          type: 'category',
          data: this.getX,
          // 坐标轴两边留白
          boundaryGap: false,
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolOffset: [0, 10],
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            color: '#48ffff',
            margin: 10,
            showMaxLabel: false
          },
          // 去掉网格线
          splitLine: { show: false }
        },
        yAxis: {
          axisTick: {
            length: 10,
            alignWithLabel: true,
            inside: true
          },
          nameLocation: 'end',
          max: this.yMax + this.yMax / 6,
          interval: this.yMax / 6,
          boundaryGap: ['0', '10%'],
          // 去掉网格线
          splitLine: { show: false },
          name: '数量',
          nameTextStyle: {
            color: '#48ffff',
            fontSize: 16,
            align: 'left',
            padding: [0, 50, 0, 0]
          },
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            color: '#48ffff',
            showMinLabel: false,
            showMaxLabel: false
          }
        },
        series: this.getSerious
      }
      myChart.setOption(option)
      // 实现点击按钮添加一条折线的效果
      myChart.on('legendselectchanged', (params) => {
        for (let i = 0; i < option.legend.data.length; i++) {
          if (option.legend.data[i].name === params.name) {
            if (this.select[params.name] === false) {
              option.legend.data[i].textStyle.color = '#fff'
              option.legend.data[i].textStyle.backgroundColor = this.lineColor[i]
              this.select[params.name] = true
              myChart.setOption(option)
            } else {
              option.legend.data[i].textStyle.backgroundColor = '#fff'
              option.legend.data[i].textStyle.color = '#48ffff'
              this.select[params.name] = false
              myChart.setOption(option)
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
 </style>
