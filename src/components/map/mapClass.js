import 'ol/ol.css'
import ol from 'openlayers'
const Map = ol.Map
const View = ol.View
const Tile = ol.layer.Tile
const TileImage = ol.source.TileImage
const TileGrid = ol.tilegrid.TileGrid
const Vector = ol.layer.Vector
const VectorSource = ol.source.Vector
const Feature = ol.Feature
const Point = ol.geom.Point
const Style = ol.style.Style
const Icon = ol.style.Icon
const Text = ol.style.Text
const Overlay = ol.Overlay

function MapClass () {
  this.init = function ({controls = []} = {}) {
    this.map = new Map({
      controls,
      layers: []
    })
    return this.map
  }
}
MapClass.prototype['createView'] = function (opts) {
  let view = new View(Object.assign({
    center: [118.76826591073414, 30.932710824593595],
    projection: 'EPSG:4326',
    zoom: 13,
    maxZoom: 20
  }, opts))
  return view
}
MapClass.prototype['addFeatures'] = function (data, img) {
  let featureSource = new VectorSource()
  let featureLayer = new Vector({
    zIndex: 99,
    source: featureSource
  })
  let imageIcon = new Icon({
    src: img,
    scale: 0.2
  })
  let textStyle = new Text({
    text: ''
  })

  for (let i = 0, len = data.length; i < len; i++) {
    var feature = new Feature({
      geometry: new Point(data[i].coords)
    })
    textStyle.setText(data[i].name)
    feature.setStyle(new Style({
      image: imageIcon,
      text: textStyle
    }))
    feature.data = data[i]
    featureSource.addFeature(feature)
  }

  return featureLayer
}
MapClass.prototype['createOverlayer'] = (element, opts = {}) => {
  return new Overlay(Object.assign({
    element,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  }, opts))
}

MapClass.prototype['createTielayer'] = function (opts = {}, layerOpts = {}) {
  var resolutions = opts.resolutions
  let tilegrid = new TileGrid({
    origin: opts.origin,
    resolutions,
    extent: opts.extent
  })
  let source = new TileImage({
    projection: opts.proj,
    tileGrid: tilegrid,
    url: opts.url
  })
  var layer = new Tile({
    source,
    zIndex: layerOpts.zIndex || 0
  })
  return layer
}

export default new MapClass()
