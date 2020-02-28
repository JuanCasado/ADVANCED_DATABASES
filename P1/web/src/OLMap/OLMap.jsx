
import React from 'react'
import ReactDOM from 'react-dom';
import './OLMap.css'
import {getAreaStyles, getFlightStyles, getPointStyle} from './Styles.js'

import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {defaults as defaultControls, FullScreen, MousePosition, ScaleLine} from 'ol/control';

import {toStringHDMS} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';

import PopUp from '../Container/PopUp/PopUp'
import {popUpStore, setCoordinates, setContent} from '../Container/PopUp/PopUpActions'

import * as mapFeatures from './MapFeatures'

let map = null;
export const areaLayer = new VectorLayer({
  source: new VectorSource({
    features: []
  }),
  style: getAreaStyles
})

export const flightLayer = new VectorLayer({
  source: new VectorSource({
    features: []
  }),
  style: getFlightStyles
})

export const pointLayer = new VectorLayer({
  source: new VectorSource({
    features: []
  }),
  style: getPointStyle
})

export class OLMap extends React.Component {

  componentDidMount() {
    if (map == null){
      const mapLayer = new TileLayer({source: new OSM()})
      const popup = <PopUp store={popUpStore}/>
      const popupDiv = document.createElement('popup-div');
      ReactDOM.render(popup, popupDiv)
      const overlay = new Overlay({
        element: popupDiv,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      map = new Map({
        target: 'map',
        layers: [
          mapLayer, areaLayer, flightLayer, pointLayer
        ],
        overlays: [overlay],
        view: new View({
          center: [397e5, 43e5],
          zoom: 5.8
        }),
        controls: defaultControls({
          attributionOptions:{collapsible: true}
        }).extend([
          new FullScreen({source:'root'}),
          new MousePosition({className:'mouse-position-map', coordinateFormat: (coordinate)=>{return toStringHDMS(toLonLat(coordinate))}}),
          new ScaleLine(),
        ])
      })
      map.on('singleclick', function(event) {
        const coordinate = event.coordinate
        const hdms = toStringHDMS(toLonLat(coordinate))
        const features = []
        mapFeatures.removeClicks()
        map.forEachFeatureAtPixel(map.getPixelFromCoordinate(event.coordinate), (feature) => {
          features.push(feature.values_.renderer)
          mapFeatures.addClick(feature)
        }, {hitTolerance: 2})
        popUpStore.dispatch(setContent(features))
        popUpStore.dispatch(setCoordinates(hdms))
        overlay.setPosition(coordinate)
        mapFeatures.clearLayer(pointLayer)
      })
    }
  }

  render() {
    return <div id='map' className={'map'}></div>
  }
}