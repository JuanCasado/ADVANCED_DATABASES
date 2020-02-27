
import {Fill, Stroke, Style} from 'ol/style';

const firStyles = {
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
const uirStyles = {
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'rgba(50, 0, 200, 1)',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
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


export function getFirStyles(feature) {
  
  return firStyles[feature.getGeometry().getType()]
}

export function getUirStyles(feature) {

  return uirStyles[feature.getGeometry().getType()]
}

export function getFlightStyles(feature) {

  return flightStyles[feature.getGeometry().getType()]
}