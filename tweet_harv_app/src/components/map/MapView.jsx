/*
 * react-map-gl
 * Version: 7.0
 * 
 * Copyright 2022 react-map-gl Contributors
 * https://github.com/visgl/react-map-gl/tree/7.0-release
*/
import React, { useEffect, useState, useMemo } from 'react'
import { Map, Layer, Source } from 'react-map-gl';
import './MapView.css'
import * as env from "../../env"
import { circleLayer } from './circle-style.ts';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers.ts';
import ChartDataService from '../../services/ChartDataService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  Marker,
  Popup,
} from 'react-map-gl';
import { MdAccountBalance } from 'react-icons/md';
import {MdDirectionsTransitFilled} from 'react-icons/md';
import {MdFlight} from 'react-icons/md';
import {MdOutlineSchool} from 'react-icons/md'; 
import {MdShoppingCart} from 'react-icons/md'; 
import {ImBooks} from 'react-icons/im'; 
import {GiChurch} from 'react-icons/gi';
import {FaGolfBall} from 'react-icons/fa'; 
import {FaUmbrellaBeach} from 'react-icons/fa'; 
import {CgGym} from "react-icons/cg"; 
import {GrAid} from "react-icons/gr";

const ZOOM_LEVELES = {
	'cluster': 12,
	'circle': 12
}

const MapView = () => {
  const [selectedMapType, setSelectedMapType] = useState("cluster");
  const [zoomLevel, setZoomLevel] = useState(ZOOM_LEVELES[selectedMapType])

  const onRadioChange = (e) => {
    setSelectedMapType(e.target.value)
    setZoomLevel(ZOOM_LEVELES[e.target.value])
    console.log(e.target.value)
  }
  let [viewport, setViewport] = useState({
    longitude: 144.975,
    latitude: -37.82,
    zoom: ZOOM_LEVELES[selectedMapType],
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
    }).catch((e) => {
      setLoading(false)
      setError('Could not fetch housing trend!')
      console.log('error getting housing trend: ', e)
    })
  }, [])

  const marker_data = [
    { "city": "Melbourne Central", "icon": "shopping", "image": "https://www.shoppingcentrenews.com.au/wp-content/uploads/2022/02/Melbourne-Central-5.jpg", "state": "Melbourne", "latitude": -37.81004, "longitude": 144.96277 },
    { "city": "University of Melbourne", "icon": "university", "image": "https://www.unimelb.edu.au/__data/assets/image/0016/4004026/17099_0019.jpg", "state": "Melbourne", "latitude": -37.79818, "longitude": 144.96094 },
    { "city": "State Library Victoria", "icon": "library", "image": "https://www.slv.vic.gov.au/sites/default/files/styles/feature_image/public/strategic-plan-hero.jpg?itok=CCmv7jIG", "state": "Melbourne", "latitude": -37.80964, "longitude": 144.96520 },
    { "city": "Melbourne Airport", "icon": "airport", "image": "https://grimshaw.global/assets/lib/2021/05/21/210409_Grimshaw_Airport-0242.jpg", "state": "Melbourne", "latitude": -37.67065, "longitude": 144.84328 }, 
    { "city": "Federation Square", "icon": "building", "image": "https://images.squarespace-cdn.com/content/v1/5e57b89fbb687c386d2d6be8/1605283435752-D1BL0DKTGZ855OT42T77/Federation-Square-site-02.jpg", "state": "Melbourne", "latitude": -37.81791, "longitude": 144.96907 }, 
    { "city": "St Paul's Cathedral","icon": "church",  "image": "http://shipoffools.com/wp-content/uploads/2018/02/melbourne_paul-1.jpg", "state": "Melbourne", "latitude": -37.81688, "longitude": 144.96765 }, 
    { "city": "Southern Cross", "icon": "trainStation", "image": "https://www.railway-technology.com/wp-content/uploads/sites/13/2017/10/1-image-11.jpg", "state": "Melbourne", "latitude": -37.81824, "longitude": 144.95254 }, 
    { "city": "Marvel Stadium", "icon": "building", "image": "https://www.delawarenorth.com/~/media/delawarenorth/images/venue%20images/australia/marvel-stadium-t1.jpg?h=350&la=en&w=804", "state": "Melbourne", "latitude": -37.81638, "longitude": 144.94752 }, 
    { "city": "Queens Victoria Market","icon": "shopping",  "image": "http://syn.org.au/app/uploads/Screen-Shot-2018-05-08-at-9.13.58-am-768x432.png", "state": "Melbourne", "latitude": -37.80733, "longitude": 144.95676 }, 
    { "city": "Parliament House","icon": "building",  "image": "https://i.pinimg.com/originals/d4/66/17/d46617a8f5b5783d09b4d2d39a2817b5.jpg", "state": "Melbourne", "latitude": -37.81067, "longitude": 144.97384 },
    { "city": "South Melbourne Market","icon": "shopping",  "image": "https://images.squarespace-cdn.com/content/v1/58d860ab29687f4e2b16bbb9/1580794640363-3FQKU7A9M2ENK575GO3J/IMG_4432-1.jpg", "state": "Melbourne", "latitude": -37.83119, "longitude": 144.95580 }, 
    { "city": "Ss Peter & Paul Ukrainian Catholic Cathedral","icon": "church",  "image": "https://auv.org.au/wp-content/uploads/2021/04/katedra11.jpg", "state": "Melbourne", "latitude": -37.79600, "longitude": 144.94390 }, 
    { "city": "Sunshine Golf Club","icon": "golf",  "image": "https://golf-designers.com/wp-content/uploads/2012/09/MD-PCD-2.jpg", "state": "Melbourne", "latitude": -37.79469, "longitude": 144.77586 }, 
    { "city": "Chelsea Beach","icon": "beach",  "image": "https://www.travelvictoria.com.au/images/chelsea/banner2.jpg", "state": "Melbourne", "latitude": -38.05285, "longitude": 145.11363 }, 
    { "city": "St Kilda Beach","icon": "beach",  "image": "https://exp.cdn-hotels.com/hotels/44000000/43010000/43007200/43007149/eefca7bf_z.jpg?impolicy=fcrop&w=500&h=333&q=medium", "state": "Melbourne", "latitude": -37.86771, "longitude": 144.97397 }, 
    { "city": "Chapel Street","icon": "shopping",  "image": "https://media.timeout.com/images/105739823/image.jpg", "state": "Melbourne", "latitude": -37.83748, "longitude": 144.99593 }, 
    { "icon": "beach", "latitude": -37.98667, "longitude": 145.05351 }, 
    { "icon": "gym", "latitude": -37.81761, "longitude": 145.21539 },
    { "icon": "gym", "latitude": -37.98567, "longitude": 145.20658 }, 
    { "icon": "gym", "latitude": -37.81979, "longitude": 144.98347 }];

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
          {city.icon === 'building' && <MdAccountBalance size = "25" color= "#F0F0F0" cursor="pointer" />} 
          {city.icon === 'trainStation' && <MdDirectionsTransitFilled size = "25" color= "#F0F0F0" cursor="pointer"/>}  
          {city.icon === 'airport' && <MdFlight size = "25" color= "#F0F0F0" cursor="pointer"/>} 
          {city.icon === 'university' && <MdOutlineSchool size = "25" color= "#F0F0F0" cursor="pointer"/>}
          {city.icon === 'shopping' && <MdShoppingCart size = "25" color= "#F0F0F0" cursor="pointer"/>} 
          {city.icon === 'library' && <ImBooks size = "25" color= "#F0F0F0" cursor="pointer"/>} 
          {city.icon === 'church' && <GiChurch size = "25" color= "#F0F0F0" cursor="pointer"/>} 
          {city.icon === 'golf' && <FaGolfBall size = "25" color= "#F0F0F0" cursor="pointer"/>}
          {city.icon === 'beach' && <FaUmbrellaBeach size = "25" color= "#F0F0F0" cursor="pointer"/>}
          {city.icon === 'gym' && <CgGym size = "25" color= "#F0F0F0" cursor="pointer"/>}
          {city.icon === 'hospital' && <GrAid size = "25" color= "#F0F0F0" cursor="pointer"/>}

        </Marker>
      )),
    []
  );

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
  if (selectedMapType === "circle") {
    layerData = <><Layer {...circleLayer} /></>
  }
  if (selectedMapType === "cluster") {
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
            <FormControlLabel value="circle" control={<Radio />} label="Circle" />
            <FormControlLabel value="cluster" control={<Radio />} label="Cluster" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='map-container'>

        <Map
          mapboxAccessToken={env.MAPBOX_PT}
          initialViewState={viewport}
          zoom={zoomLevel}
          width="100vw" 
          height="100vh" 
          onViewportChange={(newView) => setViewport({...newView, zoom: zoomLevel})}
          onZoom={value => setZoomLevel(value.viewState.zoom)}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
        >

          {!loading && <Source id="my-data" type="geojson" data={geojson1}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={20}
          >
            {selectedMapType === "cluster" &&
              [<Layer {...clusterLayer} />,
              <Layer {...clusterCountLayer} />,
              <Layer {...unclusteredPointLayer} />]}
            {selectedMapType === "circle" &&
              [<Layer {...circleLayer} />]
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
                <b style={{ fontFamily: "sans-serif" }}> {popupInfo.city} </b>
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