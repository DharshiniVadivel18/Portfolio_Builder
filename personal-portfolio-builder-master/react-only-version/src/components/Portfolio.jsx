import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const savedPortfolio = localStorage.getItem('portfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  if (!portfolio) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>No portfolio found. Please create one first.</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, background: '#f5f6fa' }}>
      <header style={{ background: 'linear-gradient(135deg, #2c3e50, #34495e)', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <nav>
          <a href="#about" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>About</a>
          <a href="#languages" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Languages</a>
          <a href="#projects" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Projects</a>
          <a href="#achievements" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Achievements</a>
          <a href="#experience" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Experience</a>
          <a href="#contact" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Contact</a>
        </nav>
      </header>

      <section style={{ textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(135deg, #ffffff, #f5f6fa)' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px', color: '#2c3e50' }}>{portfolio.name}</h1>
        <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>{portfolio.position}</p>
        <a href={portfolio.resume} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '15px 30px', background: 'linear-gradient(135deg, #3498db, #5dade2)', color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: 'bold' }}>
          View Resume
        </a>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px' }}>
        <section id="about" style={{ background: 'white', padding: '40px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>About Me</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#2c3e50', padding: '20px', borderLeft: '4px solid #3498db', background: 'rgba(52, 152, 219, 0.05)' }}>
            {portfolio.about}
          </p>
        </section>

        <section id="languages" style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Programming Languages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {portfolio.languages.map((lang, index) => (
              <div key={index} style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2c3e50' }}>{lang}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>My Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {portfolio.projects.map((project, index) => (
              <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>{project.name}</h3>
                <p style={{ marginBottom: '15px', color: '#666', lineHeight: '1.6' }}>{project.description}</p>
                <div style={{ marginBottom: '15px' }}>
                  {project.languages.map((lang, langIndex) => (
                    <span key={langIndex} style={{ background: '#e3f2fd', borderRadius: '12px', padding: '5px 10px', margin: '2px', display: 'inline-block', fontSize: '0.9em', color: '#3498db' }}>
                      {lang}
                    </span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#3498db', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                  View Project
                </a>
              </div>
            ))}
          </div>
        </section>

        {portfolio.experiences.some(exp => exp.company || exp.role || exp.years || exp.companyWebsite) && (
          <section id="experience" style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '30px', color: '#2c3e50' }}>Work Experience</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {portfolio.experiences.filter(exp => exp.company || exp.role || exp.years || exp.companyWebsite).map((exp, index) => (
                <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'left' }}>
                  <h3 style={{ marginBottom: '10px', color: '#2c3e50' }}>{exp.company}</h3>
                  <p style={{ marginBottom: '10px', color: '#666' }}><strong>Position:</strong> {exp.role}</p>
                  <p style={{ marginBottom: '10px', color: '#666' }}><strong>Years:</strong> {exp.years}</p>
                  <p><strong>Website:</strong> <a href={exp.companyWebsite} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none' }}>{exp.companyWebsite}</a></p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="achievements" style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'left', marginBottom: '30px', color: '#2c3e50' }}>Achievements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {portfolio.achievements.map((achievement, index) => (
              <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>{achievement.title}</h3>
                <p style={{ marginBottom: '15px', color: '#666', lineHeight: '1.6' }}>{achievement.description}</p>
                <p style={{ color: '#3498db', fontWeight: 'bold' }}>{achievement.year}</p>
              </div>
            ))}
          </div>
        </section>

        {(portfolio.social.facebook || portfolio.social.instagram || portfolio.social.github || portfolio.social.linkedin) && (
          <section id="contact" style={{ textAlign: 'left', marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '30px', color: '#2c3e50' }}>Connect With Me</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
              {portfolio.social.facebook && (
                <a href={portfolio.social.facebook} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#3b5998', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                  Facebook
                </a>
              )}
              {portfolio.social.instagram && (
                <a href={portfolio.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#e4405f', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                  Instagram
                </a>
              )}
              {portfolio.social.github && (
                <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#333', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                  GitHub
                </a>
              )}
              {portfolio.social.linkedin && (
                <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#0077b5', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                  LinkedIn
                </a>
              )}
            </div>
          </section>
        )}
      </div>

      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '20px 0' }}>
        <p>&copy; {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;