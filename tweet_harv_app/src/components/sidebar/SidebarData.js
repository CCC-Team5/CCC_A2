import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link:"/"
    },
    {
        title: "Statistics",
        icon: <AssessmentIcon />,
        link:"/statistics"
    },
    {
        title: "Map",
        icon: <MapIcon />,
        link:"/map"
    }
]