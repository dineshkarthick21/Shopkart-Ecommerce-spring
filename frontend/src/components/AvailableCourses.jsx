import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../config/apiConfig';
import Header from './Header';
import '../styles/AvailableCourses.css';

const AvailableCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.COURSES, {
        withCredentials: true
      });
      setCourses(response.data);
    } catch (error) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (course) => {
    const existingItem = cart.find(item => item.courseId === course.courseId);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.courseId === course.courseId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...course, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Added to cart!');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="courses-container">
      <Header />
      
      <div className="courses-content">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          
          <button className="cart-btn" onClick={goToCart}>
            🛒 Cart ({totalItems})
          </button>
        </div>

        <h2 className="page-title">🛍️ All Products</h2>
        <p className="page-subtitle">Discover our amazing collection of products</p>

        {loading && <div className="loading">Loading products...</div>}
        
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && (
          <div className="courses-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.courseId} className="course-card">
                  <div className="course-image">
                    <img 
                      src={course.photoUrl || 'https://via.placeholder.com/300x200?text=Product'} 
                      alt={course.courseName}
                    />
                  </div>
                  
                  <div className="course-details">
                    <h3 className="course-title">{course.courseName}</h3>
                    <p className="course-trainer">🏷️ {course.trainer}</p>
                    <p className="course-description">
                      {course.description || 'High quality product with great features.'}
                    </p>
                    
                    <div className="course-info">
                      <span className="duration">⭐ {course.durationInWeeks || 4.5}/5 Rating</span>
                    </div>
                    
                    <div className="course-footer">
                      <div className="price-section">
                        <span className="price">₹{course.price || '2999'}</span>
                      </div>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(course)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-courses">
                <p>No products available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCourses;
