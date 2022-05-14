import type {CircleLayer} from 'react-map-gl';

const MAX_ZOOM_LEVEL = 20;

export const circleLayer: CircleLayer = {
    'id': 'earthquakes-point',
    'type': 'circle',
    'source': 'earthquakes',
    'minzoom': 8,
    'paint': {
        // Size circle radius by earthquake magnitude and zoom level
        'circle-radius': 10,
        // 'circle-radius': [
        //     'interpolate',
        //     ['linear'],
        //     ['zoom'],
        //     7,
        //     ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
        //     16,
        //     ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
        // ],
        // Color circle by earthquake magnitude
        'circle-color': '#007cbf', 
        // 'circle-color': [
        //     'interpolate',
        //     ['linear'],
        //     ['get', 'mag'],
        //     20,
        //     'rgba(255,0,0,0)',
        //     200,
        //     'rgb(255,51,51)',
        //     300,
        //     'rgb(255,102,102)',
        //     400,
        //     'rgb(253,219,199)',
        //     500,
        //     'rgb(255,204,255)',
        //     1000, 
        //     'rgb(255,204,255)'
        // ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 0.9,
        // Transition from heatmap to circle layer by zoom level
        'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            0,
            8,
            1
        ]
    }
};