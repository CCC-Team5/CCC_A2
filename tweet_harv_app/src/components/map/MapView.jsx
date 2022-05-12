//contain cluster layer
import React, { useEffect, useState, useMemo } from 'react'
import { Map, Layer, Source } from 'react-map-gl';
import './MapView.css'
import * as env from "../../env"
import { heatmapLayer } from './heatmap-style.ts';
import { circleLayer } from './circle-style.ts';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers.ts';
import ChartDataService from '../../services/ChartDataService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import ControlPanel, {Mode} from './control-panel.tsx';
// marker reference: https://visgl.github.io/react-map-gl/examples/controls
import {
  Marker,
  Popup,
} from 'react-map-gl';
import Pin from './pin.tsx';

const MapView = () => {
  const [selectedMapType, setSelectedMapType] = useState("cluster");

  const onRadioChange = (e) => {
    setSelectedMapType(e.target.value)
    console.log(e.target.value)
  }
  let [viewport, setViewport] = useState({
    longitude: 144.946457,
    latitude: -37.840935,
    zoom: 12,
    pitch: 40
  })

  const [popupInfo, setPopupInfo] = useState(null);
  const [geojson1, setGeojson1] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('false');

  React.useEffect(() => {
    setLoading(true);

    ChartDataService.getMap().then((res) => {
      setLoading(false);
      setGeojson1(res.data)
      console.log(res.data);
    }).catch((e) => {
      setLoading(false)
      setError('Could not fetch housing trend!')
      console.log('error getting housing trend: ', e)
    })
  }, [])

  const marker_data = [
    { "city": "Melbourne Central", "image": "https://www.shoppingcentrenews.com.au/wp-content/uploads/2022/02/Melbourne-Central-5.jpg", "state": "Melbourne", "latitude": -37.81004, "longitude": 144.96277 },
    { "city": "University of Melbourne", "image": "https://www.unimelb.edu.au/__data/assets/image/0016/4004026/17099_0019.jpg", "state": "Melbourne", "latitude": -37.79818, "longitude": 144.96094 },
    { "city": "State Library Victoria", "image": "https://www.slv.vic.gov.au/sites/default/files/styles/feature_image/public/strategic-plan-hero.jpg?itok=CCmv7jIG", "state": "Melbourne", "latitude": -37.80964, "longitude": 144.96520 },
    { "city": "Melbourne Airport", "image": "https://grimshaw.global/assets/lib/2021/05/21/210409_Grimshaw_Airport-0242.jpg", "state": "Melbourne", "latitude": -37.67065, "longitude": 144.84328 }, 
    { "city": "Federation Square", "image": "https://images.squarespace-cdn.com/content/v1/5e57b89fbb687c386d2d6be8/1605283435752-D1BL0DKTGZ855OT42T77/Federation-Square-site-02.jpg", "state": "Melbourne", "latitude": -37.81791, "longitude": 144.96907 }, 
    { "city": "St Paul's Cathedral", "image": "http://shipoffools.com/wp-content/uploads/2018/02/melbourne_paul-1.jpg", "state": "Melbourne", "latitude": -37.81688, "longitude": 144.96765 }, 
    { "city": "Southern Cross", "image": "https://www.railway-technology.com/wp-content/uploads/sites/13/2017/10/1-image-11.jpg", "state": "Melbourne", "latitude": -37.81824, "longitude": 144.95254 }, 
    { "city": "Marvel Stadium", "image": "https://www.delawarenorth.com/~/media/delawarenorth/images/venue%20images/australia/marvel-stadium-t1.jpg?h=350&la=en&w=804", "state": "Melbourne", "latitude": -37.81638, "longitude": 144.94752 }, 
    { "city": "Queens Victoria Market", "image": "http://syn.org.au/app/uploads/Screen-Shot-2018-05-08-at-9.13.58-am-768x432.png", "state": "Melbourne", "latitude": -37.80733, "longitude": 144.95676 }, 
    { "city": "Parliament House", "image": "https://i.pinimg.com/originals/d4/66/17/d46617a8f5b5783d09b4d2d39a2817b5.jpg", "state": "Melbourne", "latitude": -37.81067, "longitude": 144.97384 },
    { "city": "South Melbourne Market", "image": "https://images.squarespace-cdn.com/content/v1/58d860ab29687f4e2b16bbb9/1580794640363-3FQKU7A9M2ENK575GO3J/IMG_4432-1.jpg", "state": "Melbourne", "latitude": -37.83119, "longitude": 144.95580 }];

  const pins = useMemo(
    () =>
      marker_data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
          {/* <img src="https://materialdesignicons.com/api/download/icon/svg/379B9D93-434B-46E7-9ABC-CAFAB694B209" /> */}
        </Marker>
      )),
    []
  );

  // const geojson1 = {
  //   "features": [
  //     { "geometry": { "coordinates": [145.02508030410158, -37.80847985083767], "type": "Point" } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": { "type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767] } },
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [144.80640411005695, -37.720264201404596]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -37.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -36.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -36.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -36.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -36.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -36.80847985083767]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -36.8084798507]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -37.80847985083769]}},
  //     { "geometry": {"type": 'Point', "coordinates": [143.02508030410158, -37.80847985083769]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410158, -37.80847985083769]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410157, -37.80847985083769]}},
  //     { "geometry": {"type": 'Point', "coordinates": [145.02508030410130, -37.80847985083769]}},
  //   ], "type": "FeatureCollection"
  // };

  // const mapRef = useRef<MapRef>(null);
  const mapRef = React.useRef();

  const onClick = event => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500
      });
    });
  };

  useEffect(() => {
  })

  let layerData = <></>
  if (selectedMapType == "heatmap") {
    layerData = <><Layer {...heatmapLayer} /></>
  }
  if (selectedMapType == "circle") {
    layerData = <><Layer {...circleLayer} /></>
  }
  if (selectedMapType == "cluster") {
    layerData = <><Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} /></>
  }

  return (
    <>
      <div
        className={"radio-container"}
        style={{
          position: "fixed",
          zIndex: 999,
          right: 10,
          top: 20,
          width: 200,
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
          <RadioGroup onChange={onRadioChange} value={selectedMapType}>
            <FormControlLabel value="heatmap" control={<Radio />} label="Heatmap" />
            <FormControlLabel value="circle" control={<Radio />} label="Circle" />
            <FormControlLabel value="cluster" control={<Radio />} label="Cluster" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='map-container'>

        <Map
          mapboxAccessToken={env.MAPBOX_PT}
          initialViewState={viewport}
          width="100vw" // It always override the view(viewport) width state.
          height="100vh" // It always override the view(viewport) height state.
          onViewportChange={(newView) => setViewport(newView)}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
        // ref={mapRef}
        >

          {!loading && <Source id="my-data" type="geojson" data={geojson1}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={20}
          >
            {selectedMapType == "cluster" &&
              [<Layer {...clusterLayer} />,
              <Layer {...clusterCountLayer} />,
              <Layer {...unclusteredPointLayer} />]}
            {selectedMapType == "circle" &&
              [<Layer {...circleLayer} />]
            }
            {selectedMapType == "heatmap" &&
              [<Layer {...heatmapLayer} />]
            }
          </Source>}
          {pins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                <b style={{ fontFamily: "sans-serif" }}> {popupInfo.city}, {popupInfo.state} </b>
                {/* <b style={{ fontFamily: "sans-serif" }}> {popupInfo.city}, {popupInfo.state} |{' '} </b> */}
                {/* <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a> */}
              </div>
              <img width="100%" src={popupInfo.image} />
            </Popup>
          )}
        </Map>
      </div>
    </>
  );

}

export default MapView;