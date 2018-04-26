<template>
 <div class="license-chart">
   <div class="title">
       <span>进城车牌归属地统计</span>
       <form name="reg_testdate">
          <div class="select-time">
             <span>时间</span>
             <select name="showyear" id="showyear" v-model="showyear" >
            <option v-for="yearitem in yearArr" :value="yearitem" :key="yearitem.id">
                {{ yearitem }}
              </option>
          </select>年
          <select name="showmonth" id="showmonth" v-model="showmonth">
              <option v-for="monthitem in monthArr" :value="monthitem" :key="monthitem.id">
              {{ monthitem }}
              </option>
          </select>月
          <select name="showdate" id="showdate" v-model="showdate">
             <option v-for="dateitem in dateArr" :value="dateitem" :key="dateitem.id">
              {{ dateitem }}
              </option>
          </select>日
          </div>
         <span>时间段</span>
          <input type="time"> 至 <input type="time">
          <button>搜索</button>
       </form>
  </div>
   <div class="content">
     <div class="content-table">
       <table>
        <tr>
        <th>序号</th>
        <th>车牌归属地</th>
        <th>占比</th>
        <th>数量</th>
        </tr>
        <tr v-for= "(item,index) in newArr" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.value}}</td>
        </tr>
       </table>
     </div>
     <div class="content-chart">
       <div id="cityChart" :style="{width: '650px', height: '450px'}"></div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      yearArr: [],
      monthArr: [],
      showyear: '',
      showmonth: '',
      showdate: '',
      dateArr: [],
      pieArr: [
        {name: '安徽', value: 20},
        {name: '上海', value: 20},
        {name: '福建', value: 2},
        {name: '江苏', value: 30},
        {name: '广东', value: 5},
        {name: '其他', value: 3}
      ],
      tatalArr: [],
      newArr: []
    }
  },
  beforeMount: function () {
    for (let i = 2007; i < 2019; i++) {
      this.yearArr.push(i)
    }
    this.getSeriousData()
  },
  mounted () {
    this.getSeriousData()
    this.drawLine()
  },
  methods: {
    getSeriousData () {
      let sum = 0
      this.pieArr.forEach((val, idx, arr) => {
        sum += val.value
        return sum
      })
      this.newArr = this.pieArr.filter((val, index, arr) => {
        val.percent = (val.value / sum) * 100 + '%'
        return val.name !== '其他'
      })
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('cityChart'))
      // 实现绘制图表的功能
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        grid: {
          right: '5%',
          top: '2%',
          bottom: '30%',
          containLabel: true,
          boundaryGap: true
        },
        series: [
          {
            name: '进出城车辆统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            label: {
              normal: {
                formatter: '{b} : {c} ({d}%)',
                color: '#48ffff',
                textStyle: {
                  fontSize: 18
                },
                align: 'center',
                lineStyle: {
                  color: '#000'
                }
              }
            },
            labelLine: {
              length: 10
            },
            data: this.pieArr
          }
        ]
      })
    }
  },
  watch: {
    showyear (yearval) {
      this.showyear = yearval
      this.monthArr = []
      for (let i = 1; i <= 12; i++) {
        this.monthArr.push(i)
      }
    },
    showmonth (monthval) {
      this.showmonth = monthval
      this.dateArr = []
      let day = new Date(this.showyear, this.showmonth, 0)
      let datetotal = day.getDate()
      for (let i = 1; i <= datetotal; i++) {
        this.dateArr.push(i)
      }
    }
  }

}
</script>

<style lang="less" scope>
.license-chart {
   width:1300px;
   height: 540px;
   position: relative;
   border: 1px solid #666;
   padding: 0 20px;
}
.license-chart .title  {
  text-align: center;
  font-size: 30px;
  color: #48ffff;
  padding: 30px;
}
.license-chart form {
    font-size:18px;
    color:#48ffff;
    float:right;
}
.license-chart form select {
  width:70px;
  height: 25px;
}
.license-chart form input {
  height: 25px;
 }
.license-chart form .select-time {
  margin-bottom: 10px;
}
.license-chart form button {
  font-size: 18px;
  height: 30px;
  background: transparent;
  width:auto;
  padding-left:5px;
  padding-right:5px;
  border:1px solid #48ffff;
}
.content .content-table {
  float:left;
}
.content .content-table th,td {
  text-align: left;
  color:#48ffff;
  padding-right: 30px;
  font-size: 24px;
  padding-bottom: 14px;
}
.content .content-table td {
  text-align: center;
}
.content .content-chart {
  padding:0 40px 60px 0;
  float: right;
}
 </style>
