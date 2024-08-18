// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: 'user'  // Default role
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5555/login', {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
//       console.log(data);

//       if (data.error) {
//         setMessage(data.error);
//       } else {
//         const { user, access_token } = data;

//         localStorage.setItem('session', JSON.stringify({ user, accessToken: access_token }));

//         setMessage('Logged in successfully');
//         onLogin(); // Update login state
//         setTimeout(() => {
//           navigate('/home'); // Redirect to the HomePage after showing the message
//         }, 1500); // Delay redirect by 1.5 seconds to show the message
//       }
//     } catch (err) {
//       console.log(err);
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100vh',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       padding: 20,
//       border: '1px solid #ddd',
//       borderRadius: 10,
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
//     }}>
//       <h2 style={{ marginTop: 0, fontWeight: 'bold', color: 'blue' }}>Login</h2>
//       <form onSubmit={handleSubmit} style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         borderRadius: 10
//       }}>
//         <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{
//             padding: 10,
//             marginBottom: 20,
//             border: '1px solid #ccc',
//             borderRadius: 5,
//             width: '100%'
//           }}
//         />
//         <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           style={{
//             padding: 10,
//             marginBottom: 20,
//             border: '1px solid #ccc',
//             borderRadius: 5,
//             width: '100%'
//           }}
//         />
//         {/* <label style={{ marginBottom: 10, fontWeight: 'bold', color: '#666' }} htmlFor="role">Role:</label>
//         <select
//           id="role"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           style={{
//             padding: 10,
//             marginBottom: 20,
//             border: '1px solid #ccc',
//             borderRadius: 5,
//             width: '100%'
//           }}
//         >
//           <option value="user">User</option>
//           <option value="artist">Artist</option>
//         </select> */}
//         <button type="submit" style={{
//           padding: 10,
//           backgroundColor: '#4CAF50',
//           color: '#fff',
//           border: 'none',
//           borderRadius: 5,
//           cursor: 'pointer'
//         }}>Login</button>
//       </form>
//       <p style={{ marginTop: 20 }}>
//         Don't have an account? <Link to="/Signup" style={{ color: 'blue', textDecoration: 'underline' }}>Register here</Link>
//       </p>
//       {message && <p style={{ color: message === 'Logged in successfully' ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}
//     </div>
//   );
// };

// export default Login;



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
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setMessage(data.message || 'An error occurred. Please try again.');
      } else {
        if (data.message === "Please verify your email before logging in.") {
          setMessage(data.message);
        } else {
          const { user, access_token } = data;

          // Store the user data and access token in localStorage
          localStorage.setItem('session', JSON.stringify({ user, accessToken: access_token }));
          
        setMessage('Logged in successfully');
        onLogin(); // Update login state

        // Redirect based on user role
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/dashboard/overview');
          // } else if (user.role === 'artist') {
          //   navigate('/artist/home');
          } else {
            navigate('/home'); // Default route
          }
        }, 1500); // Delay redirect by 1.5 seconds to show the message

      }
    } catch (err) {
      console.log(err);
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
