<template>
  <div class="ol-popup" >
    <span  id="popup-closer" class="ol-popup-closer" @click="closePopup"></span>
    <p>{{feature && feature.data.name}}</p>
    <div class="video-areo">
      <video
          ref="my-player"
          class="video-js">
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
export default {
  name: 'popue',
  props: ['popup-data', 'index', 'feature'],
  data () {
    return {
      player: ''
    }
  },
  mounted () {
    this.player = videojs(this.$refs['my-player'], {
      'autoplay': false,
      'loop': true,
      'controls': true,
      'sources': [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }]

    })
    // this.player.play()
  },
  methods: {
    closePopup (evt) {
      this.$emit('closePopup', this.index)
    }
  }
}
</script>

<style lang="less"  scope>
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px 50px;
  font:42px/100px 'Microsoft Yahei';
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 75px;
  left: -80px;
  min-width: 280px;

  .video-areo{
    width: 600px;
    height: 400px;
    color: #46E8ff;
    background-color: #0A2C44;
     .video-js{
      width: 100%;
      height: 100%;
     }

  }
}
.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 40px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 41px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
