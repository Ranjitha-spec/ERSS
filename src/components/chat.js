import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaHome, FaExclamationTriangle, FaPhone, FaChartBar, FaComments, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const Chat = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, timestamp: new Date().toLocaleTimeString() }]);
      setMessage('');
    }
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

      <div className="chat-section">
        <h2>Chat Support</h2>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <p>{msg.text}</p>
              <span className="chat-timestamp">{msg.timestamp}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
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

export default Chat;