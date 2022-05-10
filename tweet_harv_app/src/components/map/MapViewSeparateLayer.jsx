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
    { "city": "New York", "population": "8,175,133", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg", "state": "New York", "latitude": -37.80847985083767, "longitude": 145.02508030410158 },
    { "city": "New York", "population": "8,175,133", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg", "state": "New York", "latitude": -37.720264201404596, "longitude": 144.80640411005695 },
    { "city": "New York", "population": "8,175,133", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg", "state": "New York", "latitude": -37.80847985083767, "longitude": 145.02508030410158 },
    { "city": "Los Angeles", "population": "3,792,621", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg", "state": "California", "latitude": -36.80847985083767, "longitude": 143.02508030410158 }];

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
      <div className='radio-container'>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
          <RadioGroup row onChange={onRadioChange} value={selectedMapType}>
            <FormControlLabel value="heatmap" control={<Radio />} label="heatmap" />
            <FormControlLabel value="circle" control={<Radio />} label="circle" />
            <FormControlLabel value="cluster" control={<Radio />} label="cluster" />

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
                {popupInfo.city}, {popupInfo.state} |{' '}
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
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