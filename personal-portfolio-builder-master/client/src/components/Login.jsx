import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/builder');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login</h2>
        
        {error && (
          <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#666' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#667eea', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;