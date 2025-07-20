import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../cascading/Navbar.css'; // Import external CSS

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div onClick={() => navigate("/navbar")} className="navbar-logo">BankInfoSys</div>

      <div className="navbar-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/dashboard" className="nav-link">Dashboard</a>
        <a href="/add-account" className="nav-link">Add Account</a>
        <a href="/profile" className="nav-link">Profile</a>
        <a href="/login" className="nav-button">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
