import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FleetList from './components/FleetList';
import FleetDetail from './components/FleetDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FleetList />} />
          <Route path="/fleet/:id" element={<FleetDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
