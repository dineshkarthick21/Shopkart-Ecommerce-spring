import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateQuantity = (courseId, change) => {
    const newCart = cart.map(item => {
      if (item.courseId === courseId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (courseId) => {
    const newCart = cart.filter(item => item.courseId !== courseId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Store order details
    localStorage.setItem('lastOrder', JSON.stringify({
      items: cart,
      total: getTotal(),
      date: new Date().toISOString()
    }));
    // Clear cart
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    // Navigate to payment success
    navigate('/payment-success');
  };

  return (
    <div className="cart-container">
      <Header />
      
      <div className="cart-content">
        <button className="back-btn" onClick={() => navigate('/available-courses')}>
          ← Continue Shopping
        </button>

        <h1 className="cart-title">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button className="shop-btn" onClick={() => navigate('/available-courses')}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.courseId} className="cart-item">
                  <img src={item.photoUrl || 'https://via.placeholder.com/150'} alt={item.courseName} />
                  
                  <div className="item-details">
                    <h3>{item.courseName}</h3>
                    <p className="trainer">🏷️ {item.trainer}</p>
                    <p className="duration">⭐ Premium Quality</p>
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.courseId, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.courseId, 1)}>+</button>
                  </div>

                  <div className="item-price">
                    <p className="price">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="unit-price">₹{item.price} each</p>
                  </div>

                  <button className="remove-btn" onClick={() => removeFromCart(item.courseId)}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Discount</span>
                <span className="discount">-₹0.00</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>

              <button className="payment-btn" onClick={handlePayment}>
                💳 Proceed to Payment
              </button>

              <div className="savings">
                🎉 You will save ₹0 on this order
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
