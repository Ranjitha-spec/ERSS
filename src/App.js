import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Home from './components/Home';
import ReportForm from './components/ReportForm';
import Contacts from './components/Contacts';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Particles
          id="particles-js"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50, density: { enable: true, value_area: 800 } },
              color: { value: theme === 'light' ? '#A9A9A9' : '#E0E0E0' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' },
            },
            interactivity: {
              events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
              },
            },
            retina_detect: true,
          }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;