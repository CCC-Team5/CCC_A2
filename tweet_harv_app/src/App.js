import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapView from './components/map/MapView';
import Home from './components/homepage/Home';
import Sidebar from './components/sidebar/Sidebar';
import TrendingWordCloud from './components/charts/TrendingWordCloud';
import TopNLangChart from './components/charts/TopNLangChart';
import TopNBirthChart from './components/charts/TopNBirthChart';
import TopNLangAtHome from './components/charts/TopNLangAtHome';
import HousingTrendChart from './components/charts/HousingTrendChart';
import HousingContent from './components/charts/HousingContent';


function App() {
  // const axios = require("axios").default; 

  // useEffect(() => {
  //   // axios.get("http://localhost:8000/map")
  //   axios.get("http://grp5admin:password@172.26.134.124:5984/raw_tweets/_design/geo/_view/coordinates-count-1")
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
            <Route exact path="/opportunity/most_lang" element = {<TopNLangChart />} />
            <Route exact path="/opportunity/birth_country" element = {<TopNBirthChart />} />
            <Route exact path="/opportunity/spoken_lang" element = {<TopNLangAtHome />} />
            <Route exact path="/housing/trend" element = {<HousingTrendChart />} />
            <Route exact path="/housing/content" element = {<HousingContent />} />
            <Route exact path="/map" element = {<MapView />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
