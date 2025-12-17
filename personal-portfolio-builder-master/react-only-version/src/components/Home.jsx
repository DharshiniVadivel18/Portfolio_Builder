import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header style={{ background: 'linear-gradient(135deg, #2c3e50, #34495e)', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <nav>
          <Link to="/login" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Login</Link>
          <Link to="/signup" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Sign Up</Link>
        </nav>
      </header>

      <section className="hero-section">
        <h1>Build Your Dream Portfolio</h1>
        <p>Create a stunning portfolio with React.js</p>
        <Link to="/builder" className="cta-button">Build my Portfolio →</Link>
      </section>

      <div className="container">
        <section style={{ background: 'white', padding: '40px', borderRadius: '8px', marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>About the Project</h2>
          <p>Portfolio Builder built with React.js for creating personal portfolios with local storage.</p>
        </section>
      </div>

      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '20px 0' }}>
        <p>&copy; 2023 Portfolio Builder React. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;