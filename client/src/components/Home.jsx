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
    <div>
      <header style={{ background: 'linear-gradient(135deg, #2c3e50, #34495e)', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <nav>
          <a href="#about" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>About</a>
          <a href="#features" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Features</a>
          {isLoggedIn ? (
            <>
              <Link to="/builder" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Builder</Link>
              <button 
                onClick={handleLogout} 
                style={{ color: 'white', margin: '0 15px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Login</Link>
              <Link to="/signup" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <section className="hero-section">
        <h1>Build Your Dream Portfolio</h1>
        <p>Create a stunning portfolio effortlessly with our MERN stack builder.</p>
        <a href="#features" className="cta-button">Explore Features</a>
        <Link to="/builder" className="cta-button">Build my Portfolio →</Link>
      </section>

      <div className="container">
        <section id="about" style={{ background: 'white', padding: '40px', borderRadius: '8px', marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>About the Project</h2>
          <p>Portfolio Builder is a MERN stack web application designed to help users create and customize their personal portfolios. Built with MongoDB, Express.js, React, and Node.js for a modern, scalable solution.</p>
        </section>

        <section id="features" style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Features</h2>
          <ul style={{ maxWidth: '600px', margin: '0 auto' }}>
            <li style={{ marginBottom: '10px' }}><b>Responsive Design</b>: Your portfolio will look great on any device.</li>
            <li style={{ marginBottom: '10px' }}><b>Database Storage</b>: Portfolios are saved in MongoDB for persistence.</li>
            <li style={{ marginBottom: '10px' }}><b>React Frontend</b>: Modern, interactive user interface.</li>
            <li style={{ marginBottom: '10px' }}><b>RESTful API</b>: Clean backend architecture with Express.js.</li>
          </ul>
        </section>
      </div>

      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: '40px' }}>
        <p>&copy; 2023 Portfolio Builder MERN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;