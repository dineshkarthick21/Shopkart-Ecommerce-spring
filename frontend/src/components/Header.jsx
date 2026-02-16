import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title" onClick={() => navigate('/')}>ShopKart</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search for products, brands and more" />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        <div className="header-right">
          {user && user.username === 'admin' && (
            <button onClick={() => navigate('/admin/courses')} className="admin-btn">
              Admin Dashboard
            </button>
          )}
          {user && <span className="user-name">👤 {user.username}</span>}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
