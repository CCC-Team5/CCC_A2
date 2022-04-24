import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapView from './components/map/MapView';
import Home from './components/homepage/Home';
import Sidebar from './components/sidebar/Sidebar';
import Chart from './components/charts/Chart';

function App() {
  return (
    <div  className="App">
      <Router>
        <Sidebar />
        <Routes>
            <Route exact path="/" element = {<Home />} />
            <Route exact path="/popular" element = {<Chart />} />
            <Route exact path="/opportunity/most_lang" element = {<Chart />} />
            <Route exact path="/opportunity/most_lang" element = {<Chart />} />
            <Route exact path="/map" element = {<MapView />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
