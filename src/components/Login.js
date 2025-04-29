import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaHome, FaExclamationTriangle, FaPhone, FaChartBar, FaComments, FaSignInAlt, FaBars, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., Firebase authentication)
    navigate('/dashboard');
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

      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-toggle">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="social-login">
          <button>
            <img src="/google-icon.png" alt="Google" /> Login with Google
          </button>
          <button>
            <img src="/facebook-icon.png" alt="Facebook" /> Login with Facebook
          </button>
        </div>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
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

export default Login;