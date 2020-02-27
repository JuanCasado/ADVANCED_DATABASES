
import {Fill, Stroke, Style} from 'ol/style';

const areaStyles = {
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'rgba(205, 55, 55, 1)',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 100, 0.1)'
    })
  }),
}

const flightStyles = {
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 60, 255, 1)',
      lineDash: [4],
      width: 2
    })
  })
}


export function getAreaStyles(feature) {
  
  return areaStyles[feature.getGeometry().getType()]
}

export function getFlightStyles(feature) {

  return flightStyles[feature.getGeometry().getType()]
}