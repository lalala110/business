<template>
  <div class="CyBottombtn">
    <ul>
      <li>
        <div>
          <button data-name="PoliceEcharts"
                  draggable='true'
                  @dragstart='drag($event)'>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
      <li>
        <div>
          <button>在网警员</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.CyBottombtn {
  position: absolute;
  left: 2840px;
  bottom: 16px;
}
.CyBottombtn ul li {
  float: left;
}
.CyBottombtn ul li div {
  width: 280px;
  height: 280px;
  background: url('../assets/images/CyHeader/ringpg.png') no-repeat;
  text-align: center;
  line-height: 300px;
  margin-right: 40px;
  /*opacity: 0.7;*/
  /*box-shadow: 0px 0px 10px 10px #46E8FF;*/
}
.CyBottombtn ul li div button {
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
  box-shadow: 0px 0px 46px 5px #000;
  opacity: 1;
}
</style>
<script>
export default {
  components: {
  },
  name: 'CyBottombtn',
  data () {
    return {
    }
  },
  methods: {
    //  实现将拖拽按钮的时候，显示出对应的组件
    drag (event) {
      this.$emit('drap', event.target)
    }
  }
}
</script>
