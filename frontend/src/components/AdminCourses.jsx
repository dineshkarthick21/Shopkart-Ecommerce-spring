import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import BulkProductImport from './BulkProductImport';
import '../styles/AdminCourses.css';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseName: '',
    trainer: '',
    durationInWeeks: '',
    photoUrl: '',
    description: '',
    price: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrl = formData.photoUrl;
      
      // If a file is uploaded, convert to base64 and use as photoUrl
      if (photoFile) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(photoFile);
        });
      }

      await axios.post('http://localhost:8080/admin/courses/add', {
        ...formData,
        photoUrl: imageUrl,
        durationInWeeks: parseInt(formData.durationInWeeks),
        price: parseFloat(formData.price)
      });

      setMessage({ type: 'success', text: 'Course added successfully!' });
      setFormData({
        courseName: '',
        trainer: '',
        durationInWeeks: '',
        photoUrl: '',
        description: '',
        price: ''
      });
      setPhotoFile(null);
      setPhotoPreview('');
      fetchCourses();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add course' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:8080/admin/courses/${courseId}`);
        setMessage({ type: 'success', text: 'Course deleted successfully!' });
        fetchCourses();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete course' });
      }
    }
  };

  return (
    <div className="admin-courses-container">
      <Header />
      <div className="admin-content">
        <h1>📦 Manage Products</h1>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <BulkProductImport onComplete={fetchCourses} />

        <div className="add-course-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Brand/Seller *</label>
                <input
                  type="text"
                  name="trainer"
                  value={formData.trainer}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Rating (1-5) *</label>
                <input
                  type="number"
                  name="durationInWeeks"
                  value={formData.durationInWeeks}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Product Photo *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {photoPreview && (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <button type="submit" className="add-btn" disabled={loading}>
              {loading ? 'Adding...' : '➕ Add Product'}
            </button>
          </form>
        </div>

        <div className="courses-list">
          <h2>Existing Products ({courses.length})</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.courseId} className="course-card">
                <img src={course.photoUrl} alt={course.courseName} />
                <div className="course-info">
                  <h3>{course.courseName}</h3>
                  <p className="trainer">🏷️ {course.trainer}</p>
                  <p className="description">{course.description}</p>
                  <div className="course-meta">
                    <span className="duration">⭐ {course.durationInWeeks}/5</span>
                    <span className="price">₹{course.price}</span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(course.courseId)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
