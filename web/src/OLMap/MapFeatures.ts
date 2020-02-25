
import { Component } from 'react'
import {Polygon, MultiLineString} from 'ol/geom'
import GeometryLayout from 'ol/geom/GeometryLayout'
import Feature from 'ol/Feature'
import {uirLayer, firLayer, flightLayer} from './OLMap'
import VectorLayer from 'ol/layer/Vector';

function createPolygon(coordinates : number[]) {
  return new Polygon(coordinates, GeometryLayout.XY)
}

function createLine(coordinates : number[]) {
  return new MultiLineString(coordinates, GeometryLayout.XY)
}

function createFeature(shape : any, renderer : Component) {
  return new Feature({
    geometry: shape, 
    renderer: renderer
  })
}

function addToLayer (feature : Feature, layer : VectorLayer) {
  layer.getSource().addFeature(feature)
}

export function addFIR (polygon : number[], renderer : Component){
  addToLayer(createFeature(createPolygon(polygon),renderer),firLayer)
}
export function addUIR (polygon : number[], renderer : Component){
  addToLayer(createFeature(createPolygon(polygon),renderer),uirLayer)
}
export function addFLIGHT (line : number[], renderer : Component){
  addToLayer(createFeature(createLine(line),renderer),flightLayer)
}

