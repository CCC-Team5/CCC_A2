import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PublishedWithChangesTwoToneIcon from '@mui/icons-material/PublishedWithChangesTwoTone';
import AbcIcon from '@mui/icons-material/Abc';
import CakeIcon from '@mui/icons-material/Cake';
import ChatIcon from '@mui/icons-material/Chat';
import HouseIcon from '@mui/icons-material/House';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link:"/"
    },
    {
        title: "Now Trending",
        icon: <WhatshotIcon />,
        link:"/popular",
    },
    {
        title: "Opportunity",
        icon: <PublishedWithChangesTwoToneIcon />,
        link:"/opportunity",
        iconRight: <ArrowRightTwoToneIcon />,
        iconDown: <ArrowDropDownTwoToneIcon />,
        subNav:[
            {
                title: "Tweet languages",
                icon: <AbcIcon />,
                link:"/opportunity/most_lang"
            },
            {
                title: "Most language",
                icon: <CakeIcon />,
                link:"/opportunity/birth_country"
            },
            {
                title: "Spoken languages",
                icon: <ChatIcon />,
                link:"/opportunity/spoken_lang"
            },
        ]
    },
    {
        title: "Housing",
        icon: <HouseIcon />,
        link:"/housing",
        iconRight: <ArrowRightTwoToneIcon />,
        iconDown: <ArrowDropDownTwoToneIcon />,
        subNav:[
            {
                title: "Trend & Sentiment",
                icon: <ShowChartIcon />,
                link:"/housing/trend"
            },
            {
                title: "Content",
                icon: <AbcIcon />,
                link:"/housing/content"
            },
        ]
    },
    {
        title: "Cost of Living",
        icon: <MonetizationOnIcon />,
        link:"/cost_living",
        iconRight: <ArrowRightTwoToneIcon />,
        iconDown: <ArrowDropDownTwoToneIcon />,
        subNav:[
            {
                title: "Trend & Sentiment",
                icon: <ShowChartIcon />,
                link:"/cost_living/trend"
            },
            {
                title: "Content",
                icon: <AbcIcon />,
                link:"/cost_living/content"
            },
        ]
    },
    {
        title: "Map",
        icon: <MapIcon />,
        link:"/map"
    }
]