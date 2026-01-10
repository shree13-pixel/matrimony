import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import './Header.css';
function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  const changeLanguage = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    console.log("Language changed to:", selectedLang);
  };
  return (
    <div className="language-switcher">
      <span className="lang-icon">🌐</span>
      <select value={lang} onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिन्दी</option>
        <option value="te">తెలుగు</option>
      </select>
    </div>
  );
}
const Header = () => {
  const user = {
    name: "Prarthana",
    avatar: "https://i.pravatar.cc/40"
  };
  
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Top Info Bar */}
      <div className="info-bar">
        <div className="info-content">
          <div className="contact-info">
            <span><i className="fas fa-phone"></i> +91 98765 43210</span>
            <span><i className="fas fa-envelope"></i> info@eshanamma matrimony.com</span>
          </div>
          <div className="social-icons">
            <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">Eshanamma Matrimony</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            {/* <Link to="/about" className="nav-link">About Us</Link>} */}
            <Link to="/membership" className="nav-link">Membership Plan</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </nav>

          {/* Action Buttons */}
          
<div className="header-actions">
  <Link to="/login" className="btn-register">Register</Link>



  <button className="btn-register">Translate <i className="fas fa-globe"></i></button> {/* உங்கள் button */}

  <div
    className="account"
    onClick={() => setIsOpen(prev => !prev)}
  >
    <img src={user.avatar} alt="profile" />
    <span>{user.name}</span>

    {isOpen && (
      <div className="account-dropdown">
        <Link to="/Dashboard">My Profile</Link>
        <Link to="/settings">Settings</Link>
        <button className="logout-btn">Logout</button>
      </div>
    )}
  </div>
</div>

        </div>
      </header>
    </>
  );
};

export default Header;