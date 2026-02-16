import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  
  // Check if user has admin role (you can enhance this with proper auth context)
  const isAdmin = true; // This should come from your authentication context

  return (
    <div className="home-container">
      <Header />
      
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to ShopKart</h1>
          <p className="hero-subtitle">Your One-Stop Online Shopping Destination</p>
        </div>

        <div className="categories-section">
          <h2 className="section-title">Shop by Categories</h2>
          <div className="button-grid">
            <div className="nav-card" onClick={() => navigate('/available-courses')}>
              <div className="card-icon">🛋️</div>
              <h3>All Products</h3>
              <p>Browse our entire collection</p>
            </div>
            
            <div className="nav-card" onClick={() => navigate('/cart')}>
              <div className="card-icon">🛒</div>
              <h3>Shopping Cart</h3>
              <p>View your selected items</p>
            </div>
            
            {isAdmin && (
              <div className="nav-card admin-card" onClick={() => navigate('/admin-courses')}>
                <div className="card-icon">⚙️</div>
                <h3>Manage Products</h3>
                <p>Add, edit or remove products (Admin Only)</p>
              </div>
            )}
          </div>
        </div>

        <div className="features-section">
          <h2 className="section-title">Why Shop with Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Payment</h3>
              <p>100% safe and secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👍</div>
              <h3>Quality Products</h3>
              <p>Authentic products from trusted sellers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Customer support always ready to help</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
