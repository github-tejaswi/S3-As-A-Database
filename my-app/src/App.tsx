import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Auth from './Pages/Auth/index.js';
import Dashboard from './Pages/Dashboard/index.js';
import './App.css';

const App = () => {
  // Mock function to check authentication status
  const isAuthenticated = () => {
    const userDetails = sessionStorage.getItem('USER_DETAILS');
    console.log("userDetails", userDetails);
    return userDetails ? true : false;
  };

  return (<>
  <BrowserRouter basename="/">
      {isAuthenticated()?(
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      ):(<Routes>
         <Route path="/*" element={<Auth />} />
        </Routes>)}
  </BrowserRouter>
    
  </>);
};

export default App;
