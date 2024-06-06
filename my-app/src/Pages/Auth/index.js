import React from 'react';
import Header from '@Components/Header/index.js';
import Login from './Login/index.js';
import Register from './Register/index.js';
import './index.css';

const Auth = () =>{
 return (<>
    <Header />
    <div className="auth-container" >
    <div className="auth-login-container">
      <Login />
    </div>
    <div className="auth-register-container">
      <Register />    
    </div>
    </div>
 </>);
};

export default Auth;