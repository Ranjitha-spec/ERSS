import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { ThemeContext } from '../App';

const Navigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/report">Report Emergency</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chat">Chat Support</Link>
        {user ? (
          <button onClick={handleLogout} className="nav-link">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </>
  );
};

export default Navigation;