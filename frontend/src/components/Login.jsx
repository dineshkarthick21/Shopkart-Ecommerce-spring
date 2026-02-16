import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create form data for Spring Security login
      const loginFormData = new URLSearchParams();
      loginFormData.append('username', formData.username);
      loginFormData.append('password', formData.password);

      const response = await axios.post(
        'http://localhost:8080/login',
        loginFormData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          maxRedirects: 0,
          validateStatus: function (status) {
            return status >= 200 && status < 400;
          }
        }
      );

      // Store user info
      const userInfo = {
        username: formData.username,
        isAuthenticated: true
      };
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      if (onLogin) {
        onLogin(userInfo);
      }

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Panel - Branding */}
        <div className="login-left">
          <h1>ShopKart</h1>
          <p className="tagline">Your one-stop shopping destination</p>
          <div className="benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <p>Wide Range of Products</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">⚡</span>
              <p>Fast & Secure Checkout</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎁</span>
              <p>Exclusive Deals & Offers</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                autoComplete="current-password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Login'}
            </button>
          </form>

          <div className="signup-section">
            <Link to="/signup" className="signup-link">
              New to ShopKart? Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
