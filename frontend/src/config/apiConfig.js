// API Configuration
// This file centralizes all API endpoint configurations

// Get the base URL from environment variables
// In development: http://localhost:8080
// In production: Your deployed backend URL from .env.production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/login`,
  LOGOUT: `${API_BASE_URL}/logout`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  
  // Courses/Products
  COURSES: `${API_BASE_URL}/api/courses`,
  ADMIN_COURSES: `${API_BASE_URL}/admin/courses`,
  ADMIN_COURSES_ADD: `${API_BASE_URL}/admin/courses/add`,
  ADMIN_COURSES_DELETE: (id) => `${API_BASE_URL}/admin/courses/${id}`,
  ADMIN_ENROLLED: `${API_BASE_URL}/admin/courses/enrolled`,
  
  // Registration/Enrollment
  REGISTER: `${API_BASE_URL}/api/register`,
  
  // Payment
  PAYMENT: `${API_BASE_URL}/api/payment`,
};

// Axios default configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export default API_ENDPOINTS;
