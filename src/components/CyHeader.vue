<template>
  <div class="CyHeader"
       v-cloak>
    <div class="CyHeader-l">
      <span class="CyHeader-lS"
            v-cloak>{{Cymsg | datefmt('HH:mm:ss')}}</span>
      <span class="CyHeader-lI"></span>
      <div class="CyHeader-lRX">
        <span class="CyHeader-lR"
              v-cloak>{{Cymsg | datefmt('YYYY/MM/DD')}}</span>
        <span class="CyHeader-lX"
              v-cloak>{{Cymsg | datefmt('dddd')}}</span>
      </div>
    </div>
    <div class="CyHeader-c">
      <h3>宣城交通大脑</h3>
    </div>
    <div class="CyHeader-r">
      <div class="CyHeader-rSI">
        <img class="CyHeader-rS"
             src="../assets/images/CyHeader/sunlight.png"
             alt="">
        <span class="CyHeader-rI"
              v-cloak> {{Cygetwe.temperature}}°C</span>
      </div>
      <span class="CyHeader-rIX"></span>
      <div class="CyHeader-rRX">
        <span class="CyHeader-rR"
              v-cloak>风力:&nbsp;&nbsp;{{Cygetwe.windForce}}</span>
        <span class="CyHeader-rX"
              v-cloak>湿度:&nbsp;&nbsp;{{Cygetwe.humidity}}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
[v-cloak] {
  display: none !important;
}

.CyHeader {
  /*width: 8708px;*/
  width: 3050px;
  position: relative;
  left: 0;
  top: 8px;
}

.CyHeader-l {
  width: 868px;
  height: 236px;
  background-image: url(../assets/images/CyHeader/timebg.png);
  position: absolute;
  left: 2753px;
  top: 8px;
  color: #46e8ff;
  display: flex;
  flex-direction: row;
}

.CyHeader-l .CyHeader-lI {
  width: 2px;
  height: 100px;
  background-color: #46e8ff;
  margin-top: 68px;
  margin-left: 20px;
}

.CyHeader-l .CyHeader-lS {
  padding-left: 78px;
  flex: 1;
  font-size: 90px;
  font-family: 'DINPro Regular';
  text-align: center;
  line-height: 236px;
}

.CyHeader-l .CyHeader-lRX {
  padding-left: 15px;
  flex: 1;
}

.CyHeader-l .CyHeader-lRX .CyHeader-lR {
  padding-top: 60px;
  display: block;
  width: 100%;
  font-family: 'DINPro Regular';
  font-size: 46px;
}

.CyHeader-l .CyHeader-lRX .CyHeader-lX {
  width: 100%;
  font-family: FZLTXHK;
  margin-top: 18px;
  font-size: 50px;
}

.CyHeader-c {
  width: 1496px;
  height: 296px;
  background-image: url(../assets/images/CyHeader/titlebg.png);
  text-align: center;
  line-height: 296px;
  position: absolute;
  left: 3537px;
  top: 0;
}

.CyHeader-c h3 {
  font-family: FZDHTK;
  font-size: 129px;
  color: #46e8ff;
}

.CyHeader-r {
  width: 868px;
  height: 236px;
  background-image: url(../assets/images/CyHeader/weatherbg.png);
  position: absolute;
  left: 4984px;
  top: 10px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.CyHeader-r .CyHeader-rSI {
  line-height: 236px;
  flex: 1.5;
}

.CyHeader-r .CyHeader-rSI .CyHeader-rS {
  margin-left: 180px;
  margin-top: 10px;
}

.CyHeader-r .CyHeader-rSI .CyHeader-rI {
  width: 100%;
  color: #f6a703;
  font-size: 90px;
  font-family: 'DINPro Regular';
}

.CyHeader-r .CyHeader-rRX {
  flex: 1;
  color: #46e8ff;
}

.CyHeader-r .CyHeader-rIX {
  width: 2px;
  height: 100px;
  background-color: #46e8ff;
  margin-top: 68px;
  margin-left: 30px;
}

.CyHeader-r .CyHeader-rRX .CyHeader-rR {
  padding-top: 68px;
  display: block;
  width: 100%;
  font-family: MicrosoftYaHei Regular;
  font-size: 32px;
  margin-left: 90px;
  position: relative;
  top: 0;
  left: 0;
}

.CyHeader-r .CyHeader-rRX .CyHeader-rR::before {
  content: '';
  background: url('../assets/images/CyHeader/fspg.png') no-repeat;
  width: 34px;
  height: 34px;
  position: absolute;
  bottom: 1px;
  left: -60px;
}

.CyHeader-r .CyHeader-rRX .CyHeader-rX {
  width: 100%;
  font-family: FZLTXHK;
  margin-top: 18px;
  font-size: 32px;
  margin-left: 90px;
  position: relative;
  top: 0;
  left: 0;
}

.CyHeader-r .CyHeader-rRX .CyHeader-rX::before {
  content: '';
  background: url('../assets/images/CyHeader/sdpg.png') no-repeat;
  width: 24px;
  height: 33px;
  position: absolute;
  bottom: 0;
  left: -54px;
}
</style>
<script>
import qs from 'qs'
export default {
  name: 'CyHeader',
  data () {
    return {
      Cymsg: new Date(),
      Cygetwe: {}
    }
  },
  created () {
    this.cysj()
    this.getweather()
  },
  methods: {
    cysj () {
      let hm = this
      return setInterval(function () {
        hm.Cymsg = new Date()
      }, 1000)
    },
    getweather () {
      let _this = this
      const $ajax = this.$ajax.create({
        baseURL: '/apis',
        timeout: 1000,
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpcCI6IjE5Mi4xNjguMjAwLjExOSIsImV4cCI6MTUyNDIxNTIwMiwidXNlcm5hbWUiOiJjeWwifQ.QZPczF30lbnaVFgkvyCI6qth4i7X3ZfQ6BiWUZSc7Q7joFTXd8sHzi1ctv0Kgsrn2JAtNsiGse-cHFLcEbPGgQ'}
      })
      $ajax.post('/weather/list', qs.stringify({
        'page': 1,
        'rows': 10,
        'userCityName': '广州',
        'userArea': '',
        'currTime': '2018-04-18 14:11:00'
      }))
        .then(function (response) {
          _this.Cygetwe = response.data.obj
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
