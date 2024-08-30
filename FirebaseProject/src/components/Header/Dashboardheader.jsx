import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Dashboardheader() {
    const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };
  return (
    <div>
       <header>
       <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
           <Link to="/todo" className="navbar-brand">
             Firebase App
           </Link>
           <button
             className="navbar-toggler"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarSupportedContent"
             aria-controls="navbarSupportedContent"
             aria-expanded="false"
             aria-label="Toggle navigation"
           >
             <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
               <li className="nav-item">
                 <Link to="/" className="nav-link active fw-bold">
                   Home
                 </Link>
               </li>

               <li className="nav-item">
                 <Link to="/dashboard" className="nav-link active fw-bold">
                   Dashboard
                 </Link>
               </li>
               <li className="nav-item">
                 <Link to="/users" className="nav-link active fw-bold">
                   Users
                 </Link>
               </li>
               <li className="nav-item dropdown ">
                 <button
                   className="nav-link active fw-bold dropdown-toggle"
                   data-bs-toggle="dropdown"
                 >
                   Auth
                 </button>
                 <ul className="dropdown-menu  ">
                   <li>
                     <Link
                       to="/auth/login"
                       className="dropdown-item fw-bold active "
                     >
                       Login
                     </Link>
                   </li>
                   <li>
                     <Link to="/auth/register" className="dropdown-item">
                       Register
                     </Link>
                   </li>
                   <li>
                     <Link to="/auth/forgot-password" className="dropdown-item">
                       Forgot Password
                     </Link>
                   </li>
                   <li>
                     <Link to="/auth/update-password" className="dropdown-item">
                       Update Password
                     </Link>
                   </li>
                 </ul>
               </li>
             </ul>
             <div className="d-flex ms-auto" role="search">
               <button
                 className="button-28 liquid btn text-white btn-warning"
                 onClick={handleLoginClick}
               >
                 login
               </button>
             </div>
           </div>
         </div>
       </nav>
     </header>
    </div>
  )
}
