import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to="/">Smart Donation</Link></div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/categories">Categories</Link>
        <Link className="navbar-link" to="/donations">Donations</Link>
        {isAuthenticated && <Link className="navbar-link" to="/my-donations">My Donations</Link>}
        {isAuthenticated && <Link className="navbar-link" to="/profile">Profile</Link>}
        {!isAuthenticated && <Link className="navbar-link" to="/login">Login</Link>}
        {!isAuthenticated && <Link className="navbar-link" to="/signup">Signup</Link>}
        {isAuthenticated && <button className="navbar-logout" onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}
export default Navbar;
