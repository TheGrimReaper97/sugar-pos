import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import './Login.css';
import logo from '../assets/logo.png'; // Asegúrate de que el path sea correcto

const WORDPRESS_API_URL = 'https://sugarglamourstore.com/wp-json/jwt-auth/v1/token';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState(''); // Nuevo campo para el PIN
  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const response = await axios.post(
        WORDPRESS_API_URL,
        new URLSearchParams({
          username,
          password,
          recaptchaToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess(response.data);
        window.location.href = '/dashboard';
      } else {
        setError('Unexpected response from server. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Network error or server is not responding. Please try again later.');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-container" onSubmit={handleLogin}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey="6Le3SHgqAAAAAPdoT0lyBq2THpnmCoJDfPMn-egI"
          onChange={(token) => setRecaptchaToken(token)}
        />
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Login</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
