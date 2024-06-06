import React, { useState, useEffect } from 'react';
import Header from '@Components/Header/index.js';
import './index.css';

const Dashboard = () =>{
  const [userDetails, setUserDetails] = useState();
  useEffect(()=>{
    let details = sessionStorage.getItem('USER_DETAILS');
    if(details?.length>0){
      details = JSON.parse(details);
      setUserDetails(details);
    }
  },[]);
  const handleLogout = () =>{
    sessionStorage.removeItem('USER_DETAILS');
    window.location.href='/';
  };
 return (<>
  <Header />
  <div className="dashboard-container">
    <div className="dashboard-title">
        <div className="padTop5p"><b>MY DASHBOARD</b></div>
    </div>
    <div className="d-flex justify-content-end dashboard-title">
        <button type="button" className="btn btn-success" onClick={()=>handleLogout()}>Logout</button>
    </div>
  </div>
  <div className="dashboard-table">
  <table className="table">
     <tbody>
        <tr><td>Name</td><td>{userDetails?.name}</td></tr>
        <tr><td>Email</td><td>{userDetails?.email}</td></tr>
        <tr><td>City</td><td>{userDetails?.city}</td></tr>
        <tr><td>Country</td><td>{userDetails?.country}</td></tr>
     </tbody>
    </table>
    </div>
 </>);
};

export default Dashboard;