import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/shared/navbar/Navbar';
import './App.css';

function App() {
  return (
    <div id="App">
      <div className="nav">
        <Navbar />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
