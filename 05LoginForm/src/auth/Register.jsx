import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Register() {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  let data = JSON.parse(localStorage.getItem("user")) || [];
  console.log('data', data)

  const getInput = (id) => {
    return document.getElementById(id).value;
  };

  const signUp = (event) => {
    event.preventDefault();
    let email = getInput("email");
    console.log('email', email)

    let password = getInput("password");
    console.log('password', password)
    let fullName = getInput("fullName");
    console.log('fullName', fullName)
    // Validation checks
    if (!email) {
      toast.error("Invalid email!");
      return;
    }
    if (fullName.length < 3 || !fullName) {
      toast.error("Full Name should be at least 3 characters long.");
      return;
    }
    if (password.length < 5) {
      toast.error("Password should be at least 5 characters long.");
      return;
    }

    let obj = { email, password, fullName };
    let userFound = data.some(user => user.email === obj.email);
    console.log('userfound:', userFound)

    if (!userFound) {
      data.push(obj);
      data=localStorage.setItem("user", JSON.stringify(data));
      console.log('data', data)
      setIsRegistered(true);
      toast.success("User is registered");
      navigate('/login');
    } else {
      toast.error("User already exists");
    }
  };

  return (
    <div className="form">
      <div className="container">
        <div className="row">
          <h2 className="text-center">Registration Form</h2>
          <form>
            <div className="col my-2">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" placeholder='Enter your Full Name' className='abc form-contro mt-1' id='fullName' />
            </div>
            <div className="col my-2">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder='Enter your email' className='abc form-control mt-1' id='email' />
            </div>
            <div className="col py-2">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder='Enter your password' className='abc form-control mt-1' id='password' />
            </div>
            <div className="col-12 text-center">
              <button className='btn btn-md w-50 mt-3 btn-dark' onClick={signUp}>Sign Up</button>
            </div>
          </form>
          <h6 className='text-center mt-3'>
            Already have an account?
            <Link to="/login" className='ms-1'>Login here</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
