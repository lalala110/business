import $ajax from 'axios'
const trafficDefaultOptions = {
  visualMap: {
    show: false,
    type: 'piecewise',
    left: 3178,
    top: 'top',
    min: 0,
    max: 15,
    splitNumber: 5,
    maxOpen: true,
    color: ['red', 'yellow', 'green']
  },
  tooltip: {
    formatter: function (params, ticket, callback) {
      return '<div class="div1">' + params.name + '拥堵指数:' + params.value + '</div>'
    },
    trigger: 'item',
    backgroundColor: 'transparent'
  },
  series: [{
    type: 'lines',
    polyline: true,
    lineStyle: {
      normal: {
        opacity: 1,
        width: 2
      },
      emphasis: {
        width: 4
      }
    },
    effect: {
      show: true,
      symbolSize: 2,
      color: 'white'
    }
  }]
}
function ajaxError (err) {
  $ajax.post('/error/collec', err)
}
function trafficFormatData ({features} = {features: []}) {
  let arrs = []
  for (let i = 0, len = features.length; i < len; i++) {
    let coordinates = features[i].geometry && features[i].geometry.coordinates
    if (!coordinates[0]) break
    arrs.push({
      name: features[i].properties.TROADNAME + features[i].properties.FROADNAME + features[i].properties.NAME,
      value: parseInt(Math.random() * 20),
      coords: coordinates
    })
  }
  return arrs
}

export function getBgLayer (url) {
  return new Promise((resolve, reject) => {
    let layerOpts = {}
    $ajax(url + '?f=pjson')
      .then(({data: {tileInfo, fullExtent, initialExtent: initExtent}} = {data: {}}) => {
        tileInfo.rows && tileInfo.cols && (layerOpts.tileSize = [tileInfo.rows, tileInfo.rows])
        layerOpts.url = url + '/tile/{z}/{y}/{x}'
        layerOpts.proj = 'EPSG:' + (tileInfo.spatialReference && tileInfo.spatialReference.wkid)
        layerOpts.origin = tileInfo.origin ? [tileInfo.origin.x, tileInfo.origin.y] : [0, 0]
        if (tileInfo.lods && tileInfo.lods.length >= 0) {
          let len = tileInfo.lods.length
          layerOpts.resolutions = []
          layerOpts.maxZoom = 24
          layerOpts.zoom = layerOpts.minZoom = layerOpts.maxZoom - len
          for (let val of tileInfo.lods) {
            layerOpts.resolutions.push(val.resolution)
          }
        }
        fullExtent && (layerOpts.extent = [fullExtent.xmin, fullExtent.ymin, fullExtent.xmax, fullExtent.ymax])
        // initExtent && (layerOpts.initExtent = [initExtent.xmin, initExtent.ymin, initExtent.xmax, initExtent.ymax])
        resolve(layerOpts)
      }).catch(ajaxError)
  })
}

export function getTrafficOpts (url, opts = {}) {
  return new Promise((resolve, reject) => {
    $ajax(url)
      .then(({data}) => {
        let backData = Object.assign(trafficDefaultOptions, opts)
        backData.series[0].data = trafficFormatData(data)
        resolve(backData)
      })
      .catch(ajaxError)
  })
}
