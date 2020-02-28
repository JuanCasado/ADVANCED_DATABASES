
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

function updateAreas () {
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

function updateFlights () {
  return new Promise(async (resolve)=>{
    const flights = await axios.get('http://localhost:8080/sistema-modelos-avanzados/avion/vuelos')
    const flightsData = flights.data.map(async (flight, index)=>{
      const rawCost = await axios.get('http://localhost:8080/sistema-modelos-avanzados/avion/calculo/?codVuelo='+(index+1))
      const rawRoute = await axios.get('http://localhost:8080/sistema-modelos-avanzados/avion/vuelos/ruta/?codVuelo='+(index+1))
      let distance_acc = 0;
      const conceptos = rawCost.data.conceptos.map((concepto)=>{
        distance_acc += concepto.recorrido
        return {
          name: concepto.area.nombre,
          cost: concepto.costeCalculado,
          distance: concepto.recorrido,
        }
      })
      const costs = [
        ...conceptos, {
          name: 'Total',
          cost: rawCost.data.total,
          distance: distance_acc
        }
      ]
      const route = rawRoute.data.tramo
      return {costs, route}
    })
    Promise.all(flightsData)
    .then((data)=>{
      features.clearFLIGHT()
      resolve(flights.data.map((flight, index)=>{
        const route = features.transformGeometry([JSON.parse(data[index].route)])
        const renderer = <Element name={flight.avion.id} type={flight.origen+' -> '+flight.destino} costs={data[index].costs} route={route[0]}/>
        features.addFLIGHT(route, renderer)
        return renderer
      }))
    })
  })
}

function App () {
  updateAreas ()
  updateFlights ()
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
              <ElementView name={'AREAS'} content={[]} update={updateAreas} />,
              <ElementView name={'FLIGHTS'} content={[]} update={updateFlights} />
            ],
          }
        }}
      />
    </div>
  )
}


export default App;
