import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
function Navbar({ isAuthenticated, onLogout, userRole }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ fontSize: "1.7rem", fontWeight: "bold", color: "white", textDecoration: "none", letterSpacing: "2px" }}>
          Smart Donation
        </Link>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/categories">Categories</Link>
        <Link className="navbar-link" to="/donations">Donations</Link>
        {isAuthenticated && userRole !== "admin" && <Link className="navbar-link" to="/my-donations">My Donations</Link>}
        {isAuthenticated && <Link className="navbar-link" to="/profile">Profile</Link>}
        {isAuthenticated && userRole === "admin" && (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link className="navbar-link" to="/admin/dashboard">Dashboard</Link>
            <Link className="navbar-link" to="/admin/users">Users</Link>
            <Link className="navbar-link" to="/admin/categories">Categories</Link>
            <Link className="navbar-link" to="/admin/donations">Requests</Link>
          </div>
        )}
        {isAuthenticated && userRole !== "admin" && <Link className="navbar-link" to="/donate">Donate</Link>}
        {!isAuthenticated && <Link className="navbar-link" to="/login">Login</Link>}
        {!isAuthenticated && <Link className="navbar-link" to="/signup">Signup</Link>}
        {isAuthenticated && <button className="navbar-logout" onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}
export default Navbar;
