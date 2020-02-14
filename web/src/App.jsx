
import React from 'react';
import './App.css';

import Drawer from './SideBar/Drawer'
import { OLMap } from './OLMap/OLMap'
import SatelliteIcon from '@material-ui/icons/Satellite'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import FlightIcon from '@material-ui/icons/Flight'

import ElementView from './Container/ElementView'
import createElement from './Container/Element'

import * as features from './OLMap/MapFeatures'

function update () {
  return new Promise((resolve)=>{
    console.log('UPDATE')
    resolve([createElement('FIR', 'name'), createElement('FIR', 'name2'), createElement('FIR', 'name3')])
  })
}
function create (value) {
  features.addFIR(value)
  return new Promise((resolve)=>{
    console.log('CREATE:' + value)
    resolve([])
  })
}

function App () {
  return (
    <div className="App">
      <Drawer configuration={{
          content: <OLMap/>,
          tabs: {
            icon: [
              <SatelliteIcon/>,
              <FlightTakeoffIcon/>,
              <FlightIcon/>
            ],
            panel: [
              <ElementView name={'FIR'} content={[]} update={update} createNew={create}/>,
              <ElementView name={'UIR'} content={[]} update={update} createNew={create}/>,
              <ElementView name={'FLIGHT'} content={[]} update={update} createNew={create}/>
            ],
          }
        }}
      />
    </div>
  )
}


export default App;
