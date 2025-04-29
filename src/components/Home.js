import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaHome, FaExclamationTriangle, FaPhone, FaChartBar, FaComments, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

      <section className="hero-section">
        <h2>Emergency? Dial 999 or 112</h2>
        <p>Connect with UK responders for police, fire, or medical emergencies.</p>
        <div className="hero-buttons">
          <Link to="/report">
            <button className="report-btn">Report Alert</button>
          </Link>
          <a href="tel:999">
            <button className="quick-contact-btn">Call 999 Now</button>
          </a>
        </div>
      </section>

      <div className="services-table-container">
        <table className="services-table">
          <tbody>
            <tr>
              <td>Emergency Services</td>
              <td>Police, fire, or medical emergencies</td>
              <td>999</td>
            </tr>
            <tr>
              <td>Emergency Services (EU)</td>
              <td>Alternative emergency number across the EU</td>
              <td>112</td>
            </tr>
            <tr>
              <td>Non-Emergency Police</td>
              <td>Report non-urgent incidents to the police</td>
              <td>101</td>
            </tr>
            <tr>
              <td>NHS Non-Emergency</td>
              <td>Urgent but non-life-threatening medical issues</td>
              <td>111</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="service-grid">
        <div className="service-card">
          <h3>Medical</h3>
          <p>Emergency medical services for health crises.</p>
        </div>
        <div className="service-card">
          <h3>Police</h3>
          <p>Immediate response for crime and safety issues.</p>
        </div>
        <div className="service-card">
          <h3>Ambulance</h3>
          <p>Rapid transport and care for critical conditions.</p>
        </div>
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

export default Home;