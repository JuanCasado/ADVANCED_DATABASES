
import React from 'react';
import './App.css';

import Drawer from './SideBar/Drawer'
import { OLMap } from './OLMap/OLMap'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import FlightIcon from '@material-ui/icons/Flight'

import ElementView from './Container/ElementView'
import {Element} from './Container/Element'

import axios from 'axios'
import * as features from './OLMap/MapFeatures'

function update () {
  return new Promise((resolve, reject)=>{
    axios.get('http://localhost:8080/sistema-modelos-avanzados/area')
    .then((areas)=>{
      features.clearAreas()
      resolve(areas.data.map((area)=>{
        const renderer = <Element name={area.nombre} type={area.tipoArea.nombre}/>
        features.addArea(features.transformGeometry(JSON.parse(area.frontera)), renderer)
        return renderer
      }))
    })
    .catch((error)=>reject(error))
  })
}

function App () {
  return (
    <div className="App">
      <Drawer configuration={{
          content: <OLMap/>,
          tabs: {
            icon: [
              <FlightTakeoffIcon/>,
              <FlightIcon/>
            ],
            panel: [
              <ElementView name={'AREAS'} content={[]} update={update} />,
              <ElementView name={'FLIGHTS'} content={[]} update={update} />
            ],
          }
        }}
      />
    </div>
  )
}


export default App;
