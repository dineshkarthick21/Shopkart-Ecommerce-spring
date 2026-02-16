import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import '../styles/PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('lastOrder') || 'null');
    if (order) {
      setOrderDetails(order);
    }
  }, []);

  const generatePDF = () => {
    if (!orderDetails) return;

    // Create a new window for printing
    const printWindow = window.open('', '', 'height=800,width=800');
    
    const orderDate = new Date(orderDetails.date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const orderId = 'ORD' + Date.now().toString().slice(-8);

    let itemsHTML = '';
    orderDetails.items.forEach((item, index) => {
      const itemTotal = (item.price * item.quantity).toFixed(2);
      itemsHTML += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${index + 1}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
            <strong>${item.courseName}</strong><br/>
            <small style="color: #666;">${item.trainer || 'N/A'}</small>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">₹${item.price.toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;"><strong>₹${itemTotal}</strong></td>
        </tr>
      `;
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Invoice - ${orderId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #2874f0;
            padding-bottom: 20px;
          }
          .company-name {
            font-size: 32px;
            color: #2874f0;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .invoice-title {
            font-size: 24px;
            color: #333;
            margin-top: 20px;
          }
          .order-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
          }
          .info-section {
            flex: 1;
          }
          .info-label {
            font-weight: bold;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 16px;
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          th {
            background: #2874f0;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
          }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .total-section {
            margin-top: 20px;
            text-align: right;
          }
          .total-row {
            padding: 10px 0;
            font-size: 16px;
          }
          .grand-total {
            font-size: 24px;
            color: #2874f0;
            font-weight: bold;
            padding: 15px 0;
            border-top: 2px solid #333;
            margin-top: 10px;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
          }
          .success-badge {
            background: #28a745;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 10px;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">🛒 ShopKart</div>
          <div class="success-badge">✓ PAYMENT SUCCESSFUL</div>
          <div class="invoice-title">Order Invoice</div>
        </div>

        <div class="order-info">
          <div class="info-section">
            <div class="info-label">Order ID</div>
            <div class="info-value">${orderId}</div>
          </div>
          <div class="info-section">
            <div class="info-label">Order Date</div>
            <div class="info-value">${orderDate}</div>
          </div>
          <div class="info-section">
            <div class="info-label">Customer</div>
            <div class="info-value">${user?.username || 'Guest'}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>Product Description</th>
              <th class="text-center" style="width: 100px;">Quantity</th>
              <th class="text-right" style="width: 120px;">Unit Price</th>
              <th class="text-right" style="width: 120px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-row">
            <span style="margin-right: 20px;">Subtotal:</span>
            <span>₹${orderDetails.total.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span style="margin-right: 20px;">Tax (0%):</span>
            <span>₹0.00</span>
          </div>
          <div class="grand-total">
            <span style="margin-right: 20px;">Total Paid:</span>
            <span>₹${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <p><strong>Thank you for shopping with ShopKart!</strong></p>
          <p>For any queries, please contact us at support@shopkart.com</p>
          <p style="margin-top: 20px; font-size: 12px;">
            This is a computer-generated invoice and does not require a signature.
          </p>
        </div>

        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="
            background: #2874f0;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
          ">🖨️ Print Invoice</button>
          <button onclick="window.close()" style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          ">Close</button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="payment-success-container">
      <Header />
      
      <div className="success-content">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p className="success-message">
            Thank you for shopping with us! Your order has been confirmed.
          </p>

          {orderDetails && (
            <div className="order-details">
              <h2>Order Summary</h2>
              <div className="order-info">
                <div className="info-row">
                  <span>Order Date:</span>
                  <span>{new Date(orderDetails.date).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span>Total Items:</span>
                  <span>{orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="info-row total">
                  <span>Total Paid:</span>
                  <span>₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="purchased-courses">
                <h3>Purchased Products:</h3>
               
{orderDetails.items.map((item, index) => (
                  <div key={index} className="course-item">
                    <img src={item.photoUrl || 'https://via.placeholder.com/80'} alt={item.courseName} />
                    <div className="course-info">
                      <h4>{item.courseName}</h4>
                      <p>Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <div className="course-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="download-pdf-btn" onClick={generatePDF}>
              📄 Download Invoice PDF
            </button>
            <button className="home-btn" onClick={() => navigate('/')}>
              🏠 Go to Home
            </button>
            <button className="courses-btn" onClick={() => navigate('/available-courses')}>
              🛍️ Browse More Products
            </button>
          </div>

          <div className="email-notification">
            📧 A confirmation email has been sent to your registered email address.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
