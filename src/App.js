import React from 'react';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="left-side">
        <LeftSide />
      </div>
      <div className="right-side">
        <h2>a</h2>
      </div>
    </div>
  );
}
export default App;
