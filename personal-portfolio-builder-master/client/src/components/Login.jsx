import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({ 
        id: 'demo-user', 
        email: formData.email, 
        name: 'Demo User' 
      }));
      navigate('/builder');
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)',
      backgroundSize: '600% 600%',
      animation: 'gradientWave 20s ease infinite',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated geometric shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        animation: 'morphFloat 8s ease-in-out infinite',
        filter: 'blur(1px)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        animation: 'morphFloat 12s ease-in-out infinite reverse',
        filter: 'blur(2px)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '20%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(225deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))',
        borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
        animation: 'morphFloat 10s ease-in-out infinite',
        filter: 'blur(1.5px)'
      }}></div>
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          background: 'rgba(255,255,255,0.6)',
          borderRadius: '50%',
          animation: `sparkle ${Math.random() * 3 + 2}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}></div>
      ))}
      <div style={{ 
        background: 'rgba(255,255,255,0.95)', 
        padding: '50px', 
        borderRadius: '25px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3)', 
        width: '100%', 
        maxWidth: '450px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Card glow effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'cardGlow 4s linear infinite',
          pointerEvents: 'none'
        }}></div>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#333', fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>Welcome Back</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>Sign in to continue building your portfolio</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333', 
              fontWeight: '600',
              fontSize: '14px'
            }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '15px 20px', 
                border: '2px solid #e1e5e9', 
                borderRadius: '12px', 
                fontSize: '16px', 
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333', 
              fontWeight: '600',
              fontSize: '14px'
            }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '15px 20px', 
                border: '2px solid #e1e5e9', 
                borderRadius: '12px', 
                fontSize: '16px', 
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '15px', 
              background: isLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '16px', 
              fontWeight: '600', 
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              marginBottom: '25px',
              transition: 'all 0.3s ease',
              transform: isLoading ? 'none' : 'translateY(0)',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid #ffffff', 
                  borderTop: '2px solid transparent', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite',
                  marginRight: '10px'
                }}></div>
                Signing in...
              </div>
            ) : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none', 
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#764ba2'}
              onMouseLeave={(e) => e.target.style.color = '#667eea'}
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradientWave {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes morphFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
          }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes cardGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;