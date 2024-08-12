import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import backgroundImage from './healthyfood.jpeg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
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
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.error) {
        setMessage(data.error);
      } else {
        const { user, access_token } = data;

        localStorage.setItem('session', JSON.stringify({ user, accessToken: access_token }));

        setMessage('Logged in successfully');
        navigate('/home'); // Redirect to the HomePage
      }
    } catch (err) {
      console.log(err);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      // backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 20,
      border: '1px solid #ddd',
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginTop: 0, fontWeight: 'bold', color: 'blue' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10
      }}>
        <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            padding: 10,
            marginBottom: 20,
            border: '1px solid #ccc',
            borderRadius: 5,
            width: '100%'
          }}
        />
        <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: 10,
            marginBottom: 20,
            border: '1px solid #ccc',
            borderRadius: 5,
            width: '100%'
          }}
        />
        <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: 10,
            marginBottom: 20,
            border: '1px solid #ccc',
            borderRadius: 5,
            width: '100%'
          }}
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
      {message && <p style={{ marginTop: 20, fontSize: 14, color: '#666' }}>{message}</p>}
      <p style={{ marginTop: 20, fontSize: 14, color: '#666' }}>
        Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', color: '#337ab7' }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
