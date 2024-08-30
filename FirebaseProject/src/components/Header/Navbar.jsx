import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../Scss/components.scss';

const Header = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/auth/login'); // Corrected to navigate properly
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaUtensils style={{ fontSize: '24px', color: '#f39c12', marginRight: '10px' }} />
          <span className="brand-text">Restoran</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">SERVICE</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/food-menu">MENU</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">CONTACT</Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-custom"
                onClick={navigateLogin}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
