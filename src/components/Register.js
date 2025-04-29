import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navigation from './Navigation';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registered successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Registered with Google!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error with Google register:', error);
      toast.error('Failed to register with Google.');
    }
  };

  return (
    <div className="app">
      <div id="particles-js"></div>
      <header className="header">
        <img src="/logo.png" alt="ERSS Logo" className="logo" />
        <div className="header-title-container">
          <h1 className="header-title">ERSS - Emergency Response Service System</h1>
        </div>
        <Navigation />
      </header>
      <div className="container">
        <div className="form-container">
          <h2>Register</h2>
          <div>
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
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button onClick={handleRegister}>Register</button>
            <div className="social-login">
              <button onClick={handleGoogleRegister}>
                <img src="https://www.google.com/favicon.ico" alt="Google" />
                Register with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;