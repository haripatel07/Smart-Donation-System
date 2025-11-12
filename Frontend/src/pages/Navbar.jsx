import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import "../styles/Navbar.css";

function Navbar({ isAuthenticated, onLogout, userRole }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="navbar-logo-text">Smart Donation</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
        </button>

        {/* Desktop navigation */}
        <div className="navbar-menu">
          <div className="navbar-links">
            <Link
              className={`navbar-link ${isActive('/categories') ? 'active' : ''}`}
              to="/categories"
            >
              Categories
            </Link>
            <Link
              className={`navbar-link ${isActive('/donations') ? 'active' : ''}`}
              to="/donations"
            >
              Donations
            </Link>
            {isAuthenticated && userRole !== "admin" && (
              <Link
                className={`navbar-link ${isActive('/my-donations') ? 'active' : ''}`}
                to="/my-donations"
              >
                My Donations
              </Link>
            )}
            {isAuthenticated && (
              <Link
                className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
                to="/profile"
              >
                Profile
              </Link>
            )}
            {isAuthenticated && userRole === "admin" && (
              <div className="navbar-dropdown">
                <button className="navbar-dropdown-toggle">
                  Admin Panel
                  <svg className="navbar-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="navbar-dropdown-menu">
                  <Link
                    className={`navbar-dropdown-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
                    to="/admin/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className={`navbar-dropdown-item ${isActive('/admin/users') ? 'active' : ''}`}
                    to="/admin/users"
                  >
                    Users
                  </Link>
                  <Link
                    className={`navbar-dropdown-item ${isActive('/admin/categories') ? 'active' : ''}`}
                    to="/admin/categories"
                  >
                    Categories
                  </Link>
                  <Link
                    className={`navbar-dropdown-item ${isActive('/admin/donations') ? 'active' : ''}`}
                    to="/admin/donations"
                  >
                    Requests
                  </Link>
                </div>
              </div>
            )}
            {isAuthenticated && userRole !== "admin" && (
              <Link
                className={`navbar-link navbar-link-primary ${isActive('/donate') ? 'active' : ''}`}
                to="/donate"
              >
                Donate
              </Link>
            )}
          </div>

          <div className="navbar-actions">
            {!isAuthenticated && (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={`navbar-mobile ${isMenuOpen ? 'open' : ''}`}>
          <div className="navbar-mobile-links">
            <Link
              className={`navbar-mobile-link ${isActive('/categories') ? 'active' : ''}`}
              to="/categories"
              onClick={closeMenu}
            >
              Categories
            </Link>
            <Link
              className={`navbar-mobile-link ${isActive('/donations') ? 'active' : ''}`}
              to="/donations"
              onClick={closeMenu}
            >
              Donations
            </Link>
            {isAuthenticated && userRole !== "admin" && (
              <Link
                className={`navbar-mobile-link ${isActive('/my-donations') ? 'active' : ''}`}
                to="/my-donations"
                onClick={closeMenu}
              >
                My Donations
              </Link>
            )}
            {isAuthenticated && (
              <Link
                className={`navbar-mobile-link ${isActive('/profile') ? 'active' : ''}`}
                to="/profile"
                onClick={closeMenu}
              >
                Profile
              </Link>
            )}
            {isAuthenticated && userRole === "admin" && (
              <>
                <Link
                  className={`navbar-mobile-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                  to="/admin/dashboard"
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </Link>
                <Link
                  className={`navbar-mobile-link ${isActive('/admin/users') ? 'active' : ''}`}
                  to="/admin/users"
                  onClick={closeMenu}
                >
                  Users
                </Link>
                <Link
                  className={`navbar-mobile-link ${isActive('/admin/categories') ? 'active' : ''}`}
                  to="/admin/categories"
                  onClick={closeMenu}
                >
                  Categories
                </Link>
                <Link
                  className={`navbar-mobile-link ${isActive('/admin/donations') ? 'active' : ''}`}
                  to="/admin/donations"
                  onClick={closeMenu}
                >
                  Requests
                </Link>
              </>
            )}
            {isAuthenticated && userRole !== "admin" && (
              <Link
                className={`navbar-mobile-link navbar-mobile-link-primary ${isActive('/donate') ? 'active' : ''}`}
                to="/donate"
                onClick={closeMenu}
              >
                Donate
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  className="navbar-mobile-link"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  className="navbar-mobile-link"
                  to="/signup"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button
                className="navbar-mobile-link navbar-mobile-logout"
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
