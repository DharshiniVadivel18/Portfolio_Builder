import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px 0', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Portfolio Builder</h1>
            <div>
              <a href="#about" style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: '500', transition: 'opacity 0.3s' }}>About</a>
              <a href="#features" style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: '500', transition: 'opacity 0.3s' }}>Features</a>
              {isLoggedIn ? (
                <>
                  <Link to="/builder" style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: '500' }}>Builder</Link>
                  <button 
                    onClick={handleLogout} 
                    style={{ 
                      color: 'white', 
                      margin: '0 20px', 
                      background: 'rgba(255,255,255,0.2)', 
                      border: '1px solid rgba(255,255,255,0.3)', 
                      padding: '8px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ 
                    color: 'white', 
                    margin: '0 10px', 
                    textDecoration: 'none', 
                    fontWeight: '500',
                    padding: '8px 16px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '20px',
                    transition: 'all 0.3s'
                  }}>Login</Link>
                  <Link to="/signup" style={{ 
                    color: '#667eea', 
                    margin: '0 10px', 
                    textDecoration: 'none', 
                    fontWeight: '600',
                    background: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    transition: 'all 0.3s'
                  }}>Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <section style={{
        background: 'linear-gradient(-45deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating particles */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '4px',
          height: '4px',
          background: 'rgba(255,255,255,0.6)',
          borderRadius: '50%',
          animation: 'particle 8s linear infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '6px',
          height: '6px',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '50%',
          animation: 'particle 10s linear infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '5px',
          height: '5px',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '50%',
          animation: 'particle 12s linear infinite'
        }}></div>
        
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes particle {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
          }
        `}</style>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
            Build Your Dream Portfolio
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '40px', opacity: '0.9' }}>
            Create a stunning portfolio effortlessly with our modern MERN stack builder.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/builder" 
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: 'white',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '18px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              Start Building →
            </Link>
            <a 
              href="#features" 
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '18px',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
        <section id="about" style={{ 
          background: 'white', 
          padding: '60px', 
          borderRadius: '20px', 
          marginBottom: '60px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem', color: '#333' }}>About the Project</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            Portfolio Builder is a modern MERN stack web application designed to help users create and customize their personal portfolios. 
            Built with MongoDB, Express.js, React, and Node.js for a scalable, professional solution.
          </p>
        </section>

        <section id="features" style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem', color: '#333' }}>Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Responsive Design', desc: 'Your portfolio will look great on any device', icon: '📱' },
              { title: 'Database Storage', desc: 'Portfolios are saved securely for persistence', icon: '💾' },
              { title: 'Modern Interface', desc: 'Clean, interactive user interface built with React', icon: '⚛️' },
              { title: 'RESTful API', desc: 'Clean backend architecture with Express.js', icon: '🔧' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '40px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{feature.icon}</div>
                <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.3rem' }}>{feature.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer style={{ 
        background: 'linear-gradient(135deg, #2c3e50, #34495e)', 
        color: 'white', 
        textAlign: 'center', 
        padding: '40px 20px'
      }}>
        <p style={{ fontSize: '16px', opacity: '0.9' }}>&copy; 2024 Portfolio Builder MERN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;