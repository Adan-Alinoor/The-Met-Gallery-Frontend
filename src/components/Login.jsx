import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://the-met-gallery-backend.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'An error occurred. Please try again.');
      } else {
        console.log('Login successful, storing data...'); // Log successful login
  
        if (data.message === "Please verify your email before logging in.") {
          setMessage(data.message);
        } else {
          const { user, access_token } = data;
  
          console.log('User Data:', user); // Log user data
          console.log('Access Token:', access_token); // Log access token
  
          // Store the user data and access token in localStorage
          localStorage.setItem('session', JSON.stringify({ user, accessToken: access_token }));
          
          setMessage('Logged in successfully');
          onLogin(); // Update login state

          // Redirect based on user role
          setTimeout(() => {
            if (user.role === 'admin') {
              navigate('/dashboard/overview');
            } else {
              navigate('/home'); // Default route for other roles
            }
          }, 1500); // Delay redirect by 1.5 seconds to show the message
        }
      }
    } catch (err) {
      console.log('Fetch Error:', err); // Log any fetch errors
      setMessage('An error occurred. Please try again.');
    }
  };
  
  

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <label className="login-label" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" style={{
          padding: 10,
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/Signup" className="login-link">Register here</Link>
      </p>
      {message && <p className={`login-message ${message === 'Logged in successfully' ? 'login-success' : 'login-error'}`}>{message}</p>}
    </div>
  );
};

export default Login;
