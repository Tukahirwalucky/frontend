import React from "react";
import { NavLink } from "react-router-dom";
//import companyLogo from './src/components/images/company-logo.png'; // Adjust path and filename

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <img src={companyLogo} alt="Company Logo" className="navbar-logo-image" /> */}
        <div className="navbar-logo-text">KNET PHONE WORLD</div>
      </div>
      <ul className="navbar-menu">
        <li>
          <NavLink to="/" exact className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" className={({ isActive }) => (isActive ? 'active' : '')}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
        </li>
        {/* New Dashboard Link */}
        <li>
          <NavLink to="/adminDashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            AdminDashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
