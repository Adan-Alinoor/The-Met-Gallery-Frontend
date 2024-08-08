import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Only one import needed

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
