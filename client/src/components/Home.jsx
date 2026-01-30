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
        background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
        backgroundSize: '600% 600%',
        animation: 'gradientWave 20s ease infinite',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Advanced floating elements */}
        {[...Array(25)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            background: `rgba(255,255,255,${Math.random() * 0.8 + 0.2})`,
            borderRadius: Math.random() > 0.7 ? '50%' : `${Math.random() * 50}%`,
            animation: `particle ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
        
        {/* Large morphing shapes */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          animation: 'heroMorph 20s ease-in-out infinite',
          filter: 'blur(2px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'heroMorph 25s ease-in-out infinite reverse',
          filter: 'blur(3px)'
        }}></div>
        
        <style>{`
          @keyframes gradientWave {
            0% { background-position: 0% 50%; }
            25% { background-position: 100% 50%; }
            50% { background-position: 100% 100%; }
            75% { background-position: 0% 100%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes particle {
            0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-120vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg); opacity: 0; }
          }
          @keyframes heroMorph {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1);
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            25% {
              transform: translateY(-20px) rotate(90deg) scale(1.2);
              border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            }
            50% {
              transform: translateY(-40px) rotate(180deg) scale(0.8);
              border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            }
            75% {
              transform: translateY(-20px) rotate(270deg) scale(1.1);
              border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            }
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