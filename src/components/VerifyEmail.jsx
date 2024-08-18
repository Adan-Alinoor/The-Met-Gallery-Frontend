import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5555/verify/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (response.ok) {
          setMessage(data.message);
          // Automatically log the user in or redirect to login
          setTimeout(() => {
            navigate('/login'); // Redirect to login page after verification
          }, 2000); // Delay for user to read the message
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error during email verification:', error);
        setMessage('An error occurred. Please try again later.');
      });
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
