import React, { useEffect, useState } from 'react'
import {Map, Layer, Source} from 'react-map-gl';
import './MapView.css'
import * as env from "../../env"
import {heatmapLayer} from './heatmap-style.ts';
import {circleLayer} from './circle-style.ts';

const MapView = () => {

  let [viewport, setViewport] = useState({
      longitude: 144.946457,
      latitude: -37.840935,
      zoom: 12,
      pitch: 40
  })

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [144.80640411005695, -37.720264201404596]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
      {geometry: {type: 'Point', coordinates: [145.02508030410158, -37.80847985083767]}},
    ]
  };


  useEffect(()=>{

  })

  return (
    <div className='map-container'>
      <Map
      mapboxAccessToken={env.MAPBOX_PT}
      initialViewState={viewport}
      // width="100vw" // It always override the view(viewport) width state.
      // height="100vh" // It always override the view(viewport) height state.
      onViewportChange={(newView) => setViewport(newView)}
      mapStyle="mapbox://styles/mapbox/dark-v9" 
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...heatmapLayer} />
          <Layer {...circleLayer} />
        </Source>
      </Map>
    </div>
  );
}

export default MapView;