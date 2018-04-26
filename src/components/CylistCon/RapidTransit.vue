<template>
  <div class="RapidTransit"
       :class="classes==tip?'tfy':''"
       :style="{width: '1300px', height: '610px'}">
    <table :style="{width: '1300px', height: '500px'}">
      <caption :style="{fontsize: '35px'}">
        <h4>高速交通情况</h4>
      </caption>
      <tr class="TrtionHeader"
          :style="{fontsize: '32px'}">
        <th>路名</th>
        <th>起点-终点</th>
        <th>方向</th>
        <th>设计车速
          <p>(km/h)</p>
        </th>
        <th>实际车速
          <p>(km/h)</p>
        </th>
        <th>通行量
          <p>(辆/h)</p>
        </th>
        <th>通行压力</th>
      </tr>
      <tr v-for="(item,index) in objL" :key="index" :class="listcolor[item.traffic_stress]">
        <td>{{item.road_name}}</td>
        <td>广广广广广...</td>
        <td>{{item.direction}}</td>
        <td>{{item.default_speed}}</td>
        <td>{{item.real_speed}}</td>
        <td>{{item.traffic_num}}</td>
        <td>空</td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
  .RapidTransit {
    position: absolute;
    width: 1300px;
    height: 600px;
    transform-origin: 50% bottom;
    transition: all 1s;
  }
  .RapidTransit table {
    text-align: center;
  }
  .RapidTransit table caption {
    height: 70px;
    line-height: 70px;
    font-size: 35px;
    color: #46e8ff;
  }
  .RapidTransit table .TrtionHeader {
    height: 70px;
    /* line-height: 70px; */

    color: #46e8ff;
  }
  .tfy {
    transform: rotateY(90deg);
  }
  .red {
    color: #ff5353;
  }
  .yellow{
    color: #ffcf67
  }
  .lawngreen{
    color: #45ffb2
  }
</style>
<script>
import qs from 'qs'
export default {
  name: 'RapidTransit',
  props: ['tip'],
  data () {
    return {
      classes: 1,
      listcolor: {
        '0': 'lawngreen',
        '1': 'yellow',
        '2': 'yellow',
        '3': 'red',
        '4': 'red',
        '5': 'red'
      },
      objL: [
        {
          'road_name': '科韵路4',
          'fname': '广园西路4',
          'createtime': '2018-04-23 17:15:11',
          'traffic_stress': 4,
          'f_longitude': 10.2457,
          'traffic_num': 50,
          'tname': '黄埔大道中4',
          'real_speed': 50,
          't_latitude': 123.1244,
          'district_name': 'tianhe',
          'city_name': 'guangzhou',
          'f_latitude': 120.4587,
          't_longitude': 12.4575,
          'id': 5,
          'default_speed': 40,
          'direction': '由南向北'
        },
        {
          'road_name': '科韵路4',
          'fname': '广园西路4',
          'createtime': '2018-04-23 17:15:11',
          'traffic_stress': 0,
          'f_longitude': 10.2457,
          'traffic_num': 50,
          'tname': '黄埔大道中4',
          'real_speed': 50,
          't_latitude': 123.1244,
          'district_name': 'tianhe',
          'city_name': 'guangzhou',
          'f_latitude': 120.4587,
          't_longitude': 12.4575,
          'id': 5,
          'default_speed': 40,
          'direction': '由南向北'
        },
        {
          'road_name': '科韵路4',
          'fname': '广园西路4',
          'createtime': '2018-04-23 17:15:11',
          'traffic_stress': 2,
          'f_longitude': 10.2457,
          'traffic_num': 50,
          'tname': '黄埔大道中4',
          'real_speed': 50,
          't_latitude': 123.1244,
          'district_name': 'tianhe',
          'city_name': 'guangzhou',
          'f_latitude': 120.4587,
          't_longitude': 12.4575,
          'id': 5,
          'default_speed': 40,
          'direction': '由南向北'
        },
        {
          'road_name': '科韵路4',
          'fname': '广园西路4',
          'createtime': '2018-04-23 17:15:11',
          'traffic_stress': 3,
          'f_longitude': 10.2457,
          'traffic_num': 50,
          'tname': '黄埔大道中4',
          'real_speed': 50,
          't_latitude': 123.1244,
          'district_name': 'tianhe',
          'city_name': 'guangzhou',
          'f_latitude': 120.4587,
          't_longitude': 12.4575,
          'id': 5,
          'default_speed': 40,
          'direction': '由南向北'
        },
        {
          'road_name': '科韵路4',
          'fname': '广园西路4',
          'createtime': '2018-04-23 17:15:11',
          'traffic_stress': 1,
          'f_longitude': 10.2457,
          'traffic_num': 50,
          'tname': '黄埔大道中4',
          'real_speed': 50,
          't_latitude': 123.1244,
          'district_name': 'tianhe',
          'city_name': 'guangzhou',
          'f_latitude': 120.4587,
          't_longitude': 12.4575,
          'id': 5,
          'default_speed': 40,
          'direction': '由南向北'
        }
      ]
    }
  },
  created () {
    this.getCon()
  },
  methods: {
    TrConditionFlip () {
      this.classes = 1
    },
    getCon () {
      const instance = this.$ajax.create({
        baseURL: '/xx',
        timeout: 1000,
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      })
      instance.post('/test/queryCityTrafficStatus', qs.stringify({
        'city_name': 'guangzhou',
        'district_name': 'tianhe'
      }))
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
