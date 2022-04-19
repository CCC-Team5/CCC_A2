import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BarTestComp from './components/BarTestComp';

function App() {
  return (
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    <div  className="App">
      <Router>
        <div className="container">
            <Routes>
              <Route exact path="/test" element = {<BarTestComp />} />
            
            </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;
