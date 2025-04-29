import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ThemeContext } from '../App';
import { FaHome, FaExclamationTriangle, FaPhone, FaChartBar, FaComments, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import { auth } from '../firebase';

const ReportForm = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState({ lat: 51.5074, lng: -0.1278 });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        toast.error('Failed to get location. Using default.', {
          className: 'toast-error',
        });
      }
    );
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post('https://europe-west2-erss-cb363.cloudfunctions.net/submitReport', {
        title,
        description,
        location,
        reporterId: auth.currentUser.uid,
      });
      toast.success('Emergency reported successfully!', {
        className: 'toast-success',
      });
    } catch (error) {
      toast.error('Failed to submit report.', {
        className: 'toast-error',
      });
    }
  };

  return (
    <div className="app">
      <div id="particles-js"></div>
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

        <div className="form-container">
          <h2>Report Emergency</h2>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%', borderRadius: '8px' }}
              center={location}
              zoom={12}
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Incident Title"
            aria-label="Incident Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            aria-label="Description"
          />
          <button onClick={handleSubmit}>Submit Report</button>
        </div>

        <footer className="footer">
          <p>© 2025 ERSS. All rights reserved.</p>
        </footer>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
};

export default ReportForm;