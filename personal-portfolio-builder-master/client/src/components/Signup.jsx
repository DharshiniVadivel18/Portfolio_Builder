import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/builder');
    } catch (error) {
      if (error.response?.data?.error?.includes('E11000') || error.response?.data?.error?.includes('duplicate key')) {
        setError('This email is already registered. Please use a different email or login.');
      } else {
        setError(error.response?.data?.error || 'Signup failed');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign Up</h2>
        
        {error && (
          <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;