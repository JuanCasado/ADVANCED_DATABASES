
import { Component } from 'react'
import {Polygon, MultiLineString, Point} from 'ol/geom'
import GeometryLayout from 'ol/geom/GeometryLayout'
import Feature from 'ol/Feature'
import {areaLayer, flightLayer, pointLayer} from './OLMap'
import VectorLayer from 'ol/layer/Vector';
import {fromLonLat} from 'ol/proj'

function createPolygon(coordinates : number[]) {
  return new Polygon(coordinates, GeometryLayout.XY)
}

function createLine(coordinates : number[]) {
  return new MultiLineString(coordinates, GeometryLayout.XY)
}

function createFeature(shape : any, renderer : Component) {
  return new Feature({
    geometry: shape, 
    renderer: renderer,
    isClicked: false
  })
}

function addToLayer (feature : Feature, layer : VectorLayer) {
  layer.getSource().addFeature(feature)
}

export function clearLayer (layer : VectorLayer) {
  layer.getSource().clear()
}

export function addArea (polygon : number[], renderer : Component){
  addToLayer(createFeature(createPolygon(polygon),renderer),areaLayer)
}

export function clearAreas (){
  clearLayer(areaLayer)
}

export function addFLIGHT (line : number[], renderer : Component){
  addToLayer(createFeature(createLine(line),renderer),flightLayer)
}

export function clearFLIGHT (){
  clearLayer(flightLayer)
}

export function transformGeometry (geometry : number[][][]) {
  return [geometry[0].map((point)=>{return fromLonLat(point)})]
}

export function addClick (feature : any) {
  feature.values_.isClicked = true
  feature.changed()
}

function removeClicksLayer (layer : VectorLayer) {
  layer.getSource().forEachFeature((feature : any)=>{
    if (feature.values_.isClicked) {
      feature.values_.isClicked = false
      feature.changed()
    }
  })
}

export function removeClicks () {
  removeClicksLayer(areaLayer)
  removeClicksLayer(flightLayer)
}

export function addPoint (coordinates : number[]) {
  clearLayer(pointLayer)
  console.log('nep Point')
  addToLayer(new Feature({
    geometry: new Point(coordinates, GeometryLayout.XY), 
  }), pointLayer)
}


