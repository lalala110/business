<template>
  <div  class="map-wrap" >

    <div  ref='geoMap'  :style="{cursor: toolFeature ? 'pointer':''}"></div>
    <div class="tooltip" v-show="this.toolFeature" :style="toolPosition">
      设备名称: {{toolFeature && toolFeature.data.name}}<br>
      设备状态：正常<br>
      设备编号：10000<br>
    </div>
    <popup
      ref="popup"
      v-show="this.popupFeature && this.featuresGroup.length === 0  "
      :feature="popupFeature"
      @closePopup="closePopup" >
    </popup>
    <popup
      ref="popups"
      v-for="(fe, i) in featuresGroup"
      :feature="popupFeature"
      :index="i"
      :key="i"
      @closePopup="closePopup">
    </popup>
    <div class="locate-btns-wrap">
      <facilityBar class="nav equipment-list" @showFeature = "showFeatures" :list = "equipmentList" ></facilityBar>
      <facilityBar class="nav facility-list" @showFeature = "showFeatures" :list = "facilityList" ></facilityBar>
      <facilityBar class="nav police-list" @showFeature = "showFeatures" :list = "policeList" ></facilityBar>
    </div>
    <div class="locate-btns-wrap btns-groups " style="bottom: 450px;cursor:pointer;"  >
      <span class="btns" @click="showFeaturesGroup" >显示所有设置状态</span>
      <span class="btns" @click="showTrafficLayer" >交通状况</span>
    </div>

  </div>
</template>

<script>
import blueMap from './mapClass'
import facilityBar from './components/facilityBar.vue'
import popup from './components/popup.vue'
import {getBgLayer, getTrafficOpts} from './getMapData'
import Ol3Echarts from 'ol3-echarts'

const bgMapUrl = 'http://192.168.200.124:6080/arcgis/rest/services/xcbackground/MapServer'
const facilityUrl = 'http://192.168.200.124:6080/arcgis/rest/services/xcfacility/MapServer'
const center = [118.74363250314137, 30.924299417122892]
const projection = 'EPSG:4326'

export default {
  name: 'geoMap',
  components: {
    facilityBar,
    popup
  },
  data () {
    return {
      equipmentList: [],
      facilityList: [],
      policeList: [],
      currentFeature: null,
      featuresGroup: [],
      toolFeature: null,
      popupFeature: null,
      popupLayer: null,
      trafficLayerStatus: {
        show: '',
        opts: null
      }
    }
  },
  created () {
    this.getList('./static/features/equipmentList.json', 'equipmentList')
    this.getList('./static/features/equipmentList.json', 'facilityList')
    this.getList('./static/features/equipmentList.json', 'policeList')
  },
  mounted () {
    let _this = this
    let map = blueMap.init({center, projection})
    window.map = this.map = map
    map.setTarget(this.$refs.geoMap)
    var echartslayer = new Ol3Echarts({}, {
      target: '.ol-overlaycontainer',
      source: '',
      destination: '',
      hideOnMoving: true,
      forcedRerender: false,
      forcedPrecomposeRerender: false
    })
    echartslayer.appendTo(map)
    this.echartslayer = echartslayer

    getBgLayer(bgMapUrl)
      .then(data => {
        _this.bgMapLayer = blueMap.createTielayer(data)
        _this.view = blueMap.view = blueMap.createView(Object.assign({
          center,
          projection
        }, {
          minZoom: data.minZoom,
          maxZoom: data.maxZoom,
          zoom: data.zoom,
          extent: data.extent
          // extent: [data.extent[0] + 0.0869, data.extent[1], data.extent[2] - 0.0916, data.extent[3] - 0.04138]
        }))
        _this.extent = data.extent
        map.setView(blueMap.view)
        viewChangeRes(blueMap.view)
        map.addLayer(_this.bgMapLayer)
      })
      .catch(err => {
        console.log('添加底图图层出错', err)
      })
    getBgLayer(facilityUrl)
      .then(data => {
        _this.facilityTielLayer = blueMap.createTielayer(data, {zIndex: 1})
      })
      .catch(err => {
        console.log('创建设备图层出错', err)
      })
    map.on('pointermove', (event) => {
      let features = map.getFeaturesAtPixel(event.pixel)
      if (features && features[0]) {
        if (features[0] !== this.toolFeature) {
          features[0].left = event.pixel[0]
          features[0].top = event.pixel[1]
          this.toolFeature = features[0]
        }
      } else if (this.toolFeature) {
        this.toolFeature = null
      }
    })

    map.on('singleclick', (event) => {
      let features = map.getFeaturesAtPixel(event.pixel)
      if (features && features[0]) {
        if (!this.popupLayer) {
          this.popupLayer = blueMap.createOverlayer(this.$refs['popup'].$el)
          map.addOverlay(this.popupLayer)
        }
        if (features[0] !== this.popupFeature) {
          this.popupFeature = features[0]
          this.toolFeature = null
          this.popupLayer.setPosition(event.coordinate)
        } else {
          this.popupFeature = null
          this.popupLayer.setPosition(undefined)
        }
      } else if (this.popupFeature) {
        this.popupFeature = null
        this.popupLayer.setPosition(undefined)
      }
    })
    map.on('moveend', function (evt) {
      let currentExtent = evt.map.getView().calculateExtent()
      let currentCenter = evt.map.getView().getCenter()
      let newCenter = [...currentCenter]
      if (currentExtent[0] < _this.extent[0]) {
        newCenter[0] = newCenter[0] + (_this.extent[0] - currentExtent[0])
      }
      if (currentExtent[2] > _this.extent[2]) {
        newCenter[0] = newCenter[0] + (_this.extent[2] - currentExtent[2])
      }
      if (currentExtent[3] > _this.extent[3]) {
        newCenter[1] = newCenter[1] + (_this.extent[3] - currentExtent[3])
      }
      // if (currentExtent[1] < _this.extent[1]) {
      //   newCenter[1] = newCenter[1] + (_this.extent[1] - currentExtent[1])
      // }
      if (currentCenter[0] !== newCenter[0] || currentCenter[1] !== newCenter[1]) {
        evt.map.getView().setCenter(newCenter)
      }
    })
    function viewChangeRes (view) {
      view.on('change:resolution', function (e) {
        if (blueMap.view.getZoom() >= 18) {
          if (!map.hasFacilityTielLayer) {
            map.addLayer(_this.facilityTielLayer)
            map.hasFacilityTielLayer = true
          }
        } else {
          if (map.hasFacilityTielLayer) {
            map.removeLayer(_this.facilityTielLayer)
            map.hasFacilityTielLayer = false
          }
        }
      })
    }
  },
  updated () {
    if (this.$refs['popups'] && this.featuresGroup) {
      for (let [i, v] of this.$refs['popups'].entries()) {
        v.overlayer = blueMap.createOverlayer(v.$el)
        v.overlayer.setPosition(this.featuresGroup[i].data.coords)
        blueMap.map.addOverlay(v.overlayer)
      }
    }
  },
  methods: {
    showFeatures (eq) {
      if (eq.features) {
        if (eq.features === this.currentFeature) {
          blueMap.map.removeLayer(eq.features)
          this.currentFeature = null
        } else {
          blueMap.map.removeLayer(this.currentFeature)
          blueMap.map.addLayer(eq.features)
          this.currentFeature = eq.features
        }
      } else if (eq.loading !== true) {
        eq.loading = true
        this.$ajax(eq.dataUrl)
          .then(({data}) => {
            eq.features = blueMap.addFeatures(data, eq.imageUrl)
            if (this.currentFeature) {
              blueMap.map.removeLayer(this.currentFeature)
            }
            blueMap.map.addLayer(eq.features)
            this.currentFeature = eq.features
            eq.loading = false
          })
      }
    },
    showFeaturesGroup () {
      if (this.currentFeature) {
        this.featuresGroup.splice(0, 0, ...this.currentFeature.getSource().getFeatures())
      }
    },
    getList (url, variable) {
      let _this = this
      if (url && this[variable]) {
        this.$ajax(url)
          .then(({data}) => {
            _this[variable].splice(0, 0, ...data)
          })
          .catch(err => {
            _this.$ajax.post('/error/collect', err)
          })
      }
    },
    closePopup (i) {
      if (i !== undefined) {
        blueMap.map.removeOverlay(this.$refs['popup'][i])
        this.featuresGroup.splice(i, 1)
      } else {
        this.popupFeature = null
        this.popupLayer.setPosition(undefined)
      }
    },
    showTrafficLayer () {
      if (!this.trafficLayerStatus.data && this.trafficLayerStatus.static !== 'loading') {
        this.trafficLayerStatus.static = 'loading'
        getTrafficOpts('./static/features/playbackroad.geojson')
          .then(opts => {
            this.echartslayer.setChartOptions(opts)
            this.trafficLayerStatus.data = opts
            this.trafficLayerStatus.static = 'show'
          })
          .catch(err => {
            this.$ajax.post('/error/collect', err)
          })
      } else if (this.trafficLayerStatus.static === 'hide') {
        this.echartslayer.show()
        this.trafficLayerStatus.static = 'show'
      } else {
        this.echartslayer.hide()
        this.trafficLayerStatus.static = 'hide'
      }
    }
  },
  computed: {
    toolPosition () {
      return this.toolFeature
        ? {left: this.toolFeature.left + 30 + 'px', top: this.toolFeature.top + 30 + 'px'}
        : {}
    }
  }
}
</script>

<style lang="less"  scope>
  div,ul{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .map-wrap {
    position:relative;
    width: 100%;
    height: 100%;
  }
  .locate-btns-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 334px;
    margin: auto;
    padding: 0 0 0 80px;
    width: 3178px;
    height: 140px;
    >.nav {

      margin-right: 40px;
      float: left;

    }
    .equipment-list{
      width: 1298px;
    }
    .facility-list{
      width: 910px;
    }
    .police-list{
      width: 718px;
    }
  }
  .btns-groups {

    .btns{
      display: inline-block;
      width: auto;
      height: 100px;
      padding:0 32px;
      color: #46E8ff;
      text-align: center;
      font: 42px/100px 'Microsoft Yahei';
      background-color: #0A2C44;
      border-radius: 50px;
      cursor: pointer;
    }
  }
  .tooltip{
    position: absolute;
    padding: 0 20px;
    color: #46E8ff;
    border-radius: 10px;
    font:42px/100px 'Microsoft Yahei';
    background-color: rgba(70, 232, 255, .4);
  }
</style>
