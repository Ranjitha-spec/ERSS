import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaHome, FaExclamationTriangle, FaPhone, FaChartBar, FaComments, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const Contacts = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Updated contacts data with 999, 112, 100, 101
  const contacts = [
    { name: 'Emergency Services', description: 'Police, fire, or medical emergencies', number: '999' },
    { name: 'Emergency Services (EU)', description: 'Alternative emergency number across the EU', number: '112' },
    { name: 'Police (International)', description: 'Emergency police services (non-UK standard)', number: '100' },
    { name: 'Non-Emergency Police', description: 'Report non-urgent incidents to the police', number: '101' },
  ];

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo-container">
          <img src="/logo.png" alt="ERSS Logo" className="logo" />
          <div className="header-title-container">
            <h1 className="header-title">ERSS</h1>
            <p className="header-subtitle">Emergency Response Service System</p>
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/">
            <FaHome className="nav-icon" /> Home
          </Link>
          <Link to="/report">
            <FaExclamationTriangle className="nav-icon" /> Report Emergency
          </Link>
          <Link to="/contacts">
            <FaPhone className="nav-icon" /> Contacts
          </Link>
          <Link to="/dashboard">
            <FaChartBar className="nav-icon" /> Dashboard
          </Link>
          <Link to="/chat">
            <FaComments className="nav-icon" /> Chat Support
          </Link>
          <Link to="/login">
            <FaSignInAlt className="nav-icon" /> Login
          </Link>
        </nav>
      </header>

      <div className="contact-section">
        <h2>Emergency Contacts</h2>
        <ul className="contact-list">
          {contacts.map((contact, index) => (
            <li key={index} className="contact-item">
              <p>{contact.name}</p>
              <p>{contact.description}</p>
              <p>{contact.number}</p>
              <a href={`tel:${contact.number}`}>
                <button>Call Now</button>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        <p>© 2025 ERSS. All rights reserved.</p>
      </footer>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default Contacts;