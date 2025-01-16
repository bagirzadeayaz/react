import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskLayout from './components/TaskLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<TaskLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
