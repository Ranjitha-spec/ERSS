import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaHome, FaExclamationTriangle, FaPhone, FaChartBar, FaComments, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock data for reports
  const reports = [
    { id: 1, title: 'Medical Emergency', status: 'pending', description: 'Patient needs urgent care.', date: '2025-04-29' },
    { id: 2, title: 'Police Incident', status: 'resolved', description: 'Theft reported.', date: '2025-04-28' },
  ];

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

      <div className="dashboard-section">
        <h2>Dashboard</h2>
        <div className="filters">
          <select>
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
          <button>Filter</button>
        </div>
        <div className="map-container">
          <p>Map placeholder</p>
        </div>
        <div className="report-grid">
          {reports.map((report) => (
            <div key={report.id} className={`report-card status-${report.status}`}>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <p>Date: {report.date}</p>
              <p className={`status-${report.status}`}>Status: {report.status}</p>
            </div>
          ))}
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

export default Dashboard;