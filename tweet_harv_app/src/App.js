import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapView from './components/map/MapView';
import Home from './components/homepage/Home';
import Sidebar from './components/sidebar/Sidebar';
import TrendingWordCloud from './components/charts/TrendingWordCloud';
import TopNChart from './components/charts/TopNChart';
import HousingTrendChart from './components/charts/HousingTrendChart';
import HousingWordCloud from './components/views/HousingWordCloud';
import CostLivingWordCloud from './components/charts/CostLivingWordCloud';
import TransportationWordCloud from './components/charts/TransportationWordCloud';
import TransportationChart from './components/charts/TransportationChart'; 
import CostLivingChart from './components/charts/CostLivingChart';
import OpporGroupingChart from './components/charts/OpporGroupingChart';
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
            <Route exact path="/housing" element = {<HousingPage />} />
            <Route exact path="/housing-trend" element = {<HousingTrendChart />} />
            {/* <Route exact path="/housing/content" element = {<HousingWordCloud />} /> */}
            <Route exact path="/transport" element = {<TransPage />} />
            <Route exact path="/transport-trend" element = {<TransportationChart />} />
            {/* <Route exact path="/transport/content" element = {<TransportationWordCloud />} /> */}
            <Route exact path="/cost_living" element = {<CostLivingPage />} />
            <Route exact path="/cost_living-trend" element = {<CostLivingChart />} />
            {/* <Route exact path="/cost_living/content" element = {<CostLivingWordCloud />} /> */}
            <Route exact path="/map" element = {<MapView />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
