
import {Fill, Stroke, Style, Circle} from 'ol/style';

const areaStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(205, 55, 55, 0.9)',
    width: 2
  }),
  fill: new Fill({
    color: 'rgba(255, 0, 100, 0.1)'
  })
})

const clickedAreaStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(205, 0, 0, 1)',
    width: 4
  }),
  fill: new Fill({
    color: 'rgba(255, 0, 50, 0.3)'
  })
})

const flightStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(0, 60, 200, 0.8)',
    lineDash: [4],
    width: 2
  })
})

const clickedFlightStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(0, 0, 255, 1)',
    lineDash: [4],
    width: 4
  })
})

const pointStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(0, 0, 255, 1)',
    width: 5
  }),
  fill: new Fill({
    color: 'rgba(0, 0, 255, 1)'
  }),
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: 'rgba(0,0,255, 1)'
    })
  })
})

export function getAreaStyles(feature) {
  if (feature.values_.isClicked) {
    return clickedAreaStyle
  }else {
    return areaStyle
  }
}

export function getFlightStyles(feature) {
  if (feature.values_.isClicked) {
    return clickedFlightStyle
  }else {
    return flightStyle
  }
}

export function getPointStyle() {
  return pointStyle
}
