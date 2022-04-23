import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapView from './components/map/MapView';
import Home from './components/homepage/Home';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div  className="App">
      <Router>
        <Sidebar />
        <Routes>
            <Route exact path="/" element = {<Home />} />
            <Route exact path="/statistics" element = {<Dashboard />} />
            <Route exact path="/map" element = {<MapView />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
