/*
 * react-map-gl
 * Version: 7.0
 * 
 * Copyright 2022 react-map-gl Contributors
 * https://github.com/visgl/react-map-gl/tree/7.0-release
*/
import type {CircleLayer} from 'react-map-gl';

const MAX_ZOOM_LEVEL = 20;

export const circleLayer: CircleLayer = {
    'id': 'earthquakes-point',
    'type': 'circle',
    'source': 'earthquakes',
    'minzoom': 8,
    'paint': {
        // Size circle radius 
        'circle-radius': 5,
        
        // Color circle 
        'circle-color': '#f0a500', 
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