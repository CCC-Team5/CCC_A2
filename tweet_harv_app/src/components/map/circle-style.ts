import type {CircleLayer} from 'react-map-gl';

const MAX_ZOOM_LEVEL = 20;

export const circleLayer: CircleLayer = {
    'id': 'earthquakes-point',
    'type': 'circle',
    'source': 'earthquakes',
    'minzoom': 13,
    'paint': {
        // Size circle radius by earthquake magnitude and zoom level
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
            16,
            ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
        ],
        // Color circle by earthquake magnitude
        'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'mag'],
            1,
            'rgba(255,0,0,0)',
            2,
            'rgb(255,51,51)',
            3,
            'rgb(255,102,102)',
            4,
            'rgb(253,219,199)',
            5,
            'rgb(255,204,255)',
            6,
            'rgb(255,204,255)'
        ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 0.5,
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