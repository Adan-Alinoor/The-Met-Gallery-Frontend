



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('http://localhost:5555/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        setSuccessMessage(`Registration successful! Please check your email to confirm your account.`);
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'user'
        });
        // Optionally, you can redirect to a different page here, like a message page or home page
      } else {
        console.error('Registration failed:', data);
        setErrorMessage(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error during registration. Please try again later.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      margin: 0
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, fontWeight: 'bold', color: '#333' }}>Register</h2>
        {successMessage && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
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
          <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              padding: 10,
              marginBottom: 20,
              border: '1px solid #ccc',
              borderRadius: 5,
              width: '100%'
            }}
          >
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>
          <button type="submit" style={{
            padding: 10,
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
