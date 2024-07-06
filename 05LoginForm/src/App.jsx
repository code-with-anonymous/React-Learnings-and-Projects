import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';

function App() {
  return (
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Register</Link>
    //         </li>
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/forgot-password">Forgot Password</Link>
    //         </li>
    //       </ul>
    //     </nav>
    
    <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      
    </Router>
  );
}

export default App;

