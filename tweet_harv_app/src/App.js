import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapView from './components/map/MapView';
import Home from './components/homepage/Home';
import Sidebar from './components/sidebar/Sidebar';
import OpporGroupingChart from './components/charts/opportunity/OpporGroupingChart';
import TopBirthCountry from './components/charts/opportunity/TopBirthCountry';
import TopNLangAtHome from './components/charts/opportunity/TopNLangAtHome';
import TopNLangChart from './components/charts/opportunity/TopNLangChart';

import TrendingWordCloud from './components/charts/TrendingWordCloud';
import HousingTrendChart from './components/charts/HousingTrendChart';
import TransportationChart from './components/charts/TransportationChart'; 
import CostLivingChart from './components/charts/CostLivingChart';
import HousingPage from './components/sectionpage/HousingPage';
import TransPage from './components/sectionpage/TransPage';
import CostLivingPage from './components/sectionpage/CostLivingPage';

function App() {
  // const axios = require("axios").default; 

  // useEffect(() => {
  //   // axios.get("http://localhost:8000/map")
  //   
  //   .then(function (response){
  //     console.log(response.data);   
  //   })
  //   .catch(function (error){
  //     console.log(error); 
  //   })
  //   .then(function(){

  //   }); 
  // }); 
  return (
    <div  className="App">
      <Router>
        <Sidebar />
        <Routes>
            <Route exact path="/" element = {<Home />} />
            <Route exact path="/popular" element = {<TrendingWordCloud />} />

            <Route exact path="/opportunity" element = {<OpporGroupingChart />} />
            <Route exact path="/opportunity-most_lang" element = {<TopNLangChart />} />
            <Route exact path="/opportunity-birth_country" element = {<TopBirthCountry />} />
            <Route exact path="/opportunity-spoken_lang" element = {<TopNLangAtHome />} />

            <Route exact path="/housing" element = {<HousingPage />} />
            <Route exact path="/housing-trend" element = {<HousingTrendChart />} />

            <Route exact path="/transport" element = {<TransPage />} />
            <Route exact path="/transport-trend" element = {<TransportationChart />} />

            <Route exact path="/cost_living" element = {<CostLivingPage />} />
            <Route exact path="/cost_living-trend" element = {<CostLivingChart />} />
            <Route exact path="/map" element = {<MapView />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
