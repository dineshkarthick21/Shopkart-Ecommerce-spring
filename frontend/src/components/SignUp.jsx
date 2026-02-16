import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const signupData = {
        username: formData.username,
        password: formData.password,
        role: formData.role
      };

      const response = await axios.post(
        'http://localhost:8080/api/signup',
        signupData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response?.status === 409) {
        setError('Username already exists. Please choose another one.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Left Panel - Branding */}
        <div className="signup-left">
          <h1>ShopKart</h1>
          <p className="tagline">Start your shopping journey today</p>
          <div className="benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🛍️</span>
              <p>Access to Thousands of Products</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💳</span>
              <p>Secure Payment Options</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚚</span>
              <p>Fast & Free Delivery</p>
            </div>
          </div>
        </div>

        {/* Right Panel - SignUp Form */}
        <div className="signup-right">
          <form onSubmit={handleSubmit} className="signup-form">
            <h2 className="form-title">Create Account</h2>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
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
                placeholder="Enter Password (min 6 characters)"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="USER">Student Account</option>
                <option value="ADMIN">Administrator Account</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="signup-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="login-section">
            <Link to="/login" className="login-link">
              Existing User? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
