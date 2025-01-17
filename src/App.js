import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="left-side">
          <LeftSide />
        </div>
        <div className="right-side">
          <Routes>
            <Route path="/task/:id" element={<RightSide />} />
            <Route path="/edit/:id" element={<RightSide />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
