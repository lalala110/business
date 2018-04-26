<template>
  <div class="TrafficCondition">
    <div class="Cyspans"><span @click="TrCounditionFlip">详情</span></div>
<UrbanTraffic :tip="classer"></UrbanTraffic>
<UrbanTrafficCon :tip="classer"></UrbanTrafficCon>
    </div>
</template>
<style scoped>
  .TrafficCondition{
    position: relative;
    left: 0;
    top: 0;
  }
.TrafficCondition .Cyspans{
  color:#fff;
  font-size: 20px;
  position: absolute;
  width:40px;
  height: 40px;
  top:38px;
  right:48px;
  cursor: pointer;
  z-index: 67;
}
</style>
<script>
import UrbanTraffic from './UrbanTraffic.vue'
import UrbanTrafficCon from './UrbanTrafficCon.vue'
export default {
  components: {
    UrbanTraffic,
    UrbanTrafficCon
  },
  data () {
    return {
      classer: ''
    }
  },
  methods: {
    TrCounditionFlip () {
      this.classer = 1
    }
  }
}
</script>
