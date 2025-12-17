import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Portfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`/api/portfolios/${id}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (!portfolio) return <div style={{ textAlign: 'center', padding: '50px' }}>Portfolio not found</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, background: '#f5f6fa' }}>
      <style>
        {`
          @media print {
            header { position: relative !important; }
            body { background: white !important; }
            * { background: white !important; color: black !important; }
            .no-print { display: none !important; }
          }
        `}
      </style>
      <header style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', color: '#6c757d', padding: '20px 0', textAlign: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 1000, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <nav>
          <a href="#about" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>About</a>
          <a href="#languages" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>Languages</a>
          <a href="#projects" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>Projects</a>
          <a href="#experience" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>Experience</a>
          <a href="#achievements" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>Achievements</a>
          <a href="#certifications" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>Certifications</a>
          <a href="#contact" style={{ color: '#6c757d', margin: '0 15px', textDecoration: 'none' }}>Contact</a>
        </nav>
      </header>

      <div style={{ paddingTop: '80px' }}>
        <section style={{ textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(135deg, #f8f9fa, #ffffff)' }}>
          {portfolio.profilePicture && (
            <img 
              src={portfolio.profilePicture} 
              alt={portfolio.name}
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', border: '4px solid #a8b5c8' }}
            />
          )}
          <h1 style={{ fontSize: '3em', marginBottom: '20px', color: '#495057' }}>{portfolio.name}</h1>
          <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '20px' }}>{portfolio.position}</p>
          <p style={{ fontSize: '1.1em', color: '#666', marginBottom: '30px' }}>{portfolio.introduction}</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={portfolio.resume} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '15px 30px', background: 'linear-gradient(135deg, #a8b5c8, #c8d3e0)', color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: 'bold' }}>
              View Resume
            </a>
            <button onClick={() => window.print()} style={{ padding: '15px 30px', background: 'linear-gradient(135deg, #8e9aaf, #a8b5c8)', color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>
              Download Portfolio
            </button>
          </div>
        </section>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px' }}>
          <section id="about" style={{ background: 'white', padding: '40px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#495057' }}>About Me</h2>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#495057', padding: '20px', borderLeft: '4px solid #a8b5c8', background: 'rgba(168, 181, 200, 0.1)' }}>
              {portfolio.about}
            </p>
          </section>

          <section id="languages" style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#495057' }}>Programming Languages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {portfolio.languages.map((lang, index) => (
                <div key={index} style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}>
                  <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#495057' }}>{lang}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#495057' }}>My Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {portfolio.projects.map((project, index) => (
                <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}>
                  <h3 style={{ marginBottom: '15px', color: '#495057' }}>{project.name}</h3>
                  <p style={{ marginBottom: '15px', color: '#666', lineHeight: '1.6' }}>{project.description}</p>
                  <div style={{ marginBottom: '15px' }}>
                    {project.languages.map((lang, langIndex) => (
                      <span key={langIndex} style={{ background: '#f1f3f4', borderRadius: '12px', padding: '5px 10px', margin: '2px', display: 'inline-block', fontSize: '0.9em', color: '#6c757d' }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#a8b5c8', color: 'white', borderRadius: '5px', textDecoration: 'none', transition: 'background 0.3s' }}>
                    View Project
                  </a>
                </div>
              ))}
            </div>
          </section>

          {portfolio.experiences && portfolio.experiences.some(exp => exp.company || exp.role) && (
            <section id="experience" style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#495057' }}>Work Experience</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {portfolio.experiences.filter(exp => exp.company || exp.role).map((exp, index) => (
                  <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    {exp.company && <h3 style={{ marginBottom: '10px', color: '#495057' }}>{exp.company}</h3>}
                    {exp.role && <p style={{ marginBottom: '10px', color: '#666' }}><strong>Position:</strong> {exp.role}</p>}
                    {exp.years && <p style={{ marginBottom: '10px', color: '#666' }}><strong>Years:</strong> {exp.years}</p>}
                    {exp.companyWebsite && <p><strong>Website:</strong> <a href={exp.companyWebsite} target="_blank" rel="noopener noreferrer" style={{ color: '#6c757d', textDecoration: 'none' }}>{exp.companyWebsite}</a></p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.achievements && portfolio.achievements.length > 0 && portfolio.achievements.some(achievement => achievement.title) && (
            <section id="achievements" style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#495057' }}>Achievements</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {portfolio.achievements.filter(achievement => achievement.title).map((achievement, index) => (
                  <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '15px', color: '#495057' }}>{achievement.title}</h3>
                    <p style={{ marginBottom: '15px', color: '#666', lineHeight: '1.6' }}>{achievement.description}</p>
                    <p style={{ color: '#6c757d', fontWeight: 'bold' }}>{achievement.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.certifications && portfolio.certifications.length > 0 && portfolio.certifications.some(cert => cert.name) && (
            <section id="certifications" style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#495057' }}>Certifications</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {portfolio.certifications.filter(cert => cert.name).map((cert, index) => (
                  <div key={index} style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '10px', color: '#495057' }}>{cert.name}</h3>
                    <p style={{ marginBottom: '10px', color: '#666' }}><strong>Issuer:</strong> {cert.issuer}</p>
                    <p style={{ marginBottom: '15px', color: '#666' }}><strong>Date:</strong> {cert.date}</p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#a8b5c8', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(portfolio.social.facebook || portfolio.social.instagram || portfolio.social.github || portfolio.social.linkedin) && (
            <section id="contact" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '30px', color: '#495057' }}>Connect With Me</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {portfolio.social.facebook && (
                  <a href={portfolio.social.facebook} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px', background: '#8e9aaf', color: 'white', borderRadius: '50%', textDecoration: 'none' }}>
                    Facebook
                  </a>
                )}
                {portfolio.social.instagram && (
                  <a href={portfolio.social.instagram} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px', background: '#c8a2c8', color: 'white', borderRadius: '50%', textDecoration: 'none' }}>
                    Instagram
                  </a>
                )}
                {portfolio.social.github && (
                  <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px', background: '#6c757d', color: 'white', borderRadius: '50%', textDecoration: 'none' }}>
                    GitHub
                  </a>
                )}
                {portfolio.social.linkedin && (
                  <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px', background: '#a8b5c8', color: 'white', borderRadius: '50%', textDecoration: 'none' }}>
                    LinkedIn
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer style={{ background: '#f8f9fa', color: '#6c757d', textAlign: 'center', padding: '20px 0' }}>
        <p>&copy; {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;