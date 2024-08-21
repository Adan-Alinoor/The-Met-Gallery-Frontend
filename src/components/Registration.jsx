import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; // Import the CSS file

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // Default role
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('https://the-met-gallery-backend.onrender.com:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Registration successful! Please check your email to verify your account.`);
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'user',
        });

        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error during registration. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {loading && (
        <div className="register-message">
          <span>Loading...</span>
        </div>
      )}
      {message && (
        <p className={`register-message ${message.startsWith('Registration successful') ? 'register-success' : 'register-error'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-label" htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="register-input"
        />
        <label className="register-label" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <label className="register-label" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="register-input"
        />
        <label className="register-label" htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="register-select"
        >
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
