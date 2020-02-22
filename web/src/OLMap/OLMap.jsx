
import React from 'react'
import ReactDOM from 'react-dom';
import './OLMap.css'
import {getFirStyles, getUirStyles, getFlightStyles} from './Styles.js'

import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {defaults as defaultControls, FullScreen, MousePosition, ScaleLine} from 'ol/control';

import {toStringHDMS} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';

import PopUp from '../Container/PopUp/PopUp'
import {popUpStore, setCoordinates} from '../Container/PopUp/PopUpActions'

import { addFIR } from './MapFeatures'

let map;
export const firLayer = new VectorLayer({
  source: new VectorSource({
    features: []
  }),
  style: getFirStyles
})
export const uirLayer = new VectorLayer({
  source: new VectorSource({
    features: [],
  }),
  style: getUirStyles
})
export const flightLayer = new VectorLayer({
  source: new VectorSource({
    features: []
  }),
  style: getFlightStyles
})

export class OLMap extends React.Component {

  componentDidMount() {
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
        mapLayer, firLayer, uirLayer, flightLayer
      ],
      overlays: [overlay],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      controls: defaultControls({
        attributionOptions:{collapsible: true}
      }).extend([
        new FullScreen({source:'root'}),
        new MousePosition({className:'mouse-position-map', coordinateFormat: toStringHDMS}),
        new ScaleLine(),
      ])
    })
    map.on('singleclick', function(event) {
      const coordinate = event.coordinate
      const hdms = toStringHDMS(toLonLat(coordinate))
      map.forEachFeatureAtPixel(map.getPixelFromCoordinate(event.coordinate), (feature) => {
        console.log(feature)
      }, {hitTolerance: 5})
      popUpStore.dispatch(setCoordinates(hdms))
      overlay.setPosition(coordinate);
    })

    //addFIR([[[0, 10e6],[10e6, 10e6], [10e6, 0], [0, 0]]])
  }

  render() {
    return <div id='map' className={'map'}></div>
  }
}