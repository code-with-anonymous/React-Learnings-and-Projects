import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const getInput = (id) => {
    return document.getElementById(id).value;
  };

  const validate = (event) => {
    event.preventDefault();
    console.log("hi");

    let data = JSON.parse(localStorage.getItem("user")) || [];

    let email = getInput("email");
    let password = getInput("password");

    if (!email || !password) {
      toast.error("Please fill out all given fields");
      return;
    }

    let obj = { email, password };

    let authentication = data.find(user => user.email === obj.email && obj.password === user.password);
    console.log('authentication', authentication);

    if (authentication) {
      toast.success("User is successfully logged in");
    } else {
      toast.error("Invalid information has been added");
    }
  };

  return (
    <div>
      <div className="form">
        <div className="container">
          <div className="row">
            <h2 className="text-center">Login Form</h2>
            <form>
              <div className="col my-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Enter your email' className='form-control' id='email' />
              </div>
              <div className="col py-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder='Enter your password' className='form-control' id='password' />
              </div>
              <div className="text-end mt-2">
                <Link to="/forgot-password" className='ms-1 text-black fw-bolder' style={{ textDecoration: 'none' }}>Forgot Password?</Link>
              </div>
              <div className="col text-center">
                <button className='btn btn-md w-50 mt-3 mb-1 btn-dark' onClick={validate}>Login</button>
              </div>
            </form>
            <h6 className='text-center mt-3'>Don't have an account? <Link to="/">Register</Link></h6>
          </div>
        </div>
      </div>
    </div>
  );
}

