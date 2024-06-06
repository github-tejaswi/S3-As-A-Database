import React, { useState } from 'react';
import CryptoJS from "crypto-js";
import axios from "axios";
import './index.css';

const Register = () =>{
 const initialMessage = { status:'', message:'' };
 const [alertMessage, setAlertMessage] = useState(initialMessage);
 const initialValues = {
  name: '',
  city: '', 
  country: '',
  email: '',
  pwd: '', 
  confirmPwd: ''
 };
 const [authData, setAuthData] = useState(initialValues);
 const handleAuthData = (name, value) =>{
   setAuthData({...authData,[name]: value });
 };
 const registerUser = () =>{
  if(authData?.pwd === authData?.confirmPwd){
    let registerData = { ...authData };
    delete registerData.confirmPwd;
    registerData.pwd = CryptoJS.MD5(authData?.pwd).toString();
    console.log("registerData", registerData);
    // Make the POST request using Axios
    axios.post(process.env.REACT_APP_USER_REGISTER, registerData).then(function (response) {
      console.log(response.data);
      setAuthData(initialValues);
      setAlertMessage({
        status: 'success',
        message: 'Your Account Registered Successfully. Please login into Account'
      });
    }).catch(function (error) {
      setAlertMessage({
        status: 'danger',
        message: error?.message
      });
      console.error(error);
    });
  } else {
     setAlertMessage({
      status: 'danger',
      message: 'Password and Confirm Password doesn\'t match'
     });
  }
 };
 return (<>
    <div className="register-title">
        <b>Register</b>
    </div>
    <form>
      <div className="register-form">
    <div className="container-fluid register-container">
        <div className="row">
          {alertMessage?.message?.length>0 && (<div className="col-12 mt-3">
            <div className={"alert alert-"+alertMessage?.status+" alert-dismissible"}>
              <button type="button" class="btn-close" data-bs-dismiss="alert"  onClick={()=>setAlertMessage( initialMessage )}></button>
              {alertMessage?.message}
            </div>
          </div>)}
          <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>Name</b></label>
            <input type="text" className="form-control" placeholder="Enter your Name" value={authData?.name}
                autoComplete="name"
                onChange={(event)=>handleAuthData('name',event.target.value)} />
          </div>
        </div>
        <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>City</b></label>
            <input type="text" className="form-control" placeholder="Enter your City"  value={authData?.city}
                autoComplete="city"
                onChange={(event)=>handleAuthData('city',event.target.value)} />
        </div>
        <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>Country</b></label>
            <select className="form-control" placeholder="Enter your Country" value={authData?.country}
                autoComplete="country"
                onChange={(event)=>handleAuthData('country',event.target.value)}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
        </div>
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>Email Address</b></label>
            <input type="email" className="form-control" placeholder="Enter your Email Address" 
                value={authData?.email} autoComplete="email"
                onChange={(event)=>handleAuthData('email',event.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>Password</b></label>
            <input type="password" className="form-control" placeholder="Enter your Password"
                value={authData?.pwd} autoComplete="new-password"
                onChange={(event)=>handleAuthData('pwd',event.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <label className="form-label"><b>Confirm Password</b></label>
            <input type="password" className="form-control" placeholder="Enter your Password" 
                 value={authData?.confirmPwd} autoComplete="confirm-password"
                onChange={(event)=>handleAuthData('confirmPwd',event.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3 mb-3 d-flex justify-content-end">
            <button type="button" className="btn btn-primary" onClick={()=>registerUser()}>Register your Account</button>
          </div>
        </div>
    </div>
    </div>
    </form>
 </>);
};

export default Register;