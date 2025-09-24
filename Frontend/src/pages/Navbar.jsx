import React from "react";
import { Link } from "react-router-dom";
function Navbar({ onLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/donations">Donations</Link>
      <Link to="/my-donations">My Donations</Link>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}
export default Navbar;
