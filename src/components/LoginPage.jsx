// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link from react-router-dom

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Create a navigate function for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simulate API call for login
    try {
      // Replace with real API call to authenticate the user
      const response = await simulateLogin(username, email, password);
      
      if (response.success) {
        onLogin(); // Call the onLogin function passed as prop to handle post-login actions
        navigate('/home'); // Navigate to the home page after successful login
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  // Simulated login function to replace with real API call
  const simulateLogin = (username, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password' && username === 'user') {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Invalid username, email, or password' });
        }
      }, 1000);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="mt-2">
          <span>Don't have an account? </span>
          <Link to="/signup" className="btn btn-link">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

