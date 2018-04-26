<template>
  <div class="CyListA"
       @drop='drop($event)'
       draggable='true'
       @dragover='allowDrop($event)'>
    <slot></slot>
  </div>
</template>
<style scoped>
.CyListA {
  width: 1300px;
  height: 610px;
  background-image: url(../assets/images/CyHeader/borderbg.png);
}
</style>
<script>
import echarts from '../components/Myecharts/PoliceEcharts'
export default {
  props: ['comName'],
  name: 'CyList',
  data () {
    return {
      target: ''
    }
  },
  components: {
    echarts
  },
  methods: {
    //  实现将拖拽按钮的时候，显示出对应的组件
    drop (event) {
      this.$nextTick(() => {
        this.target = this.comName
        this.$emit('dropevent', this.target)
      })
      event.preventDefault()
    },
    allowDrop (event) {
      event.preventDefault()
    }
  }
}
</script>
