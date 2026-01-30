import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Builder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    profilePicture: '',
    resume: '',
    introduction: '',
    about: '',
    languages: [],
    projects: [{ name: '', description: '', languages: '', link: '' }],
    experiences: [{ company: '', role: '', years: '', companyWebsite: '' }],
    achievements: [{ title: '', description: '', date: '' }],
    certifications: [{ name: '', issuer: '', date: '', link: '' }],
    social: { facebook: '', instagram: '', github: '', linkedin: '' }
  });

  const languageOptions = [
    'HTML', 'CSS', 'JavaScript', 'C', 'C++', 'Python', 'Java', 'React', 'Node', 'MongoDB', 'Express'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (lang) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', languages: '', link: '' }]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index][field] = value;
    setFormData(prev => ({ ...prev, experiences: newExperiences }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { company: '', role: '', years: '', companyWebsite: '' }]
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index][field] = value;
    setFormData(prev => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', description: '', date: '' }]
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index][field] = value;
    setFormData(prev => ({ ...prev, certifications: newCertifications }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', date: '', link: '' }]
    }));
  };

  const handleSocialChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const processedData = {
        ...formData,
        projects: formData.projects.map(project => ({
          ...project,
          languages: project.languages.split(',').map(lang => lang.trim())
        }))
      };
      
      // Generate HTML portfolio
      const portfolioHTML = generatePortfolioHTML(processedData);
      
      // Create and download the file
      const blob = new Blob([portfolioHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${processedData.name.replace(/\s+/g, '_')}_Portfolio.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Portfolio generated and downloaded successfully!');
    } catch (error) {
      console.error('Error creating portfolio:', error);
      alert('Error creating portfolio. Please try again.');
    }
  };

  const generatePortfolioHTML = (data) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #667eea;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }
        .bubbles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        .bubble {
            position: absolute;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            animation: float 15s infinite linear;
        }
        .bubble:nth-child(1) { left: 10%; width: 80px; height: 80px; animation-delay: 0s; }
        .bubble:nth-child(2) { left: 20%; width: 20px; height: 20px; animation-delay: 2s; }
        .bubble:nth-child(3) { left: 25%; width: 10px; height: 10px; animation-delay: 4s; }
        .bubble:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; }
        .bubble:nth-child(5) { left: 70%; width: 20px; height: 20px; animation-delay: 3s; }
        .bubble:nth-child(6) { left: 80%; width: 120px; height: 120px; animation-delay: 7s; }
        .bubble:nth-child(7) { left: 32%; width: 160px; height: 160px; animation-delay: 15s; }
        .bubble:nth-child(8) { left: 55%; width: 20px; height: 20px; animation-delay: 4s; }
        .bubble:nth-child(9) { left: 25%; width: 10px; height: 10px; animation-delay: 19s; }
        .bubble:nth-child(10) { left: 90%; width: 160px; height: 160px; animation-delay: 11s; }
        @keyframes float {
            0% { opacity: 1; transform: translateY(100vh) scale(0); }
            5% { opacity: 1; transform: translateY(90vh) scale(1); }
            95% { opacity: 1; transform: translateY(-10vh) scale(1); }
            100% { opacity: 0; transform: translateY(-10vh) scale(1); }
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 60px 0;
            background: rgba(255,255,255,0.95);
            border-radius: 25px;
            margin-bottom: 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .profile-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 20px;
            object-fit: cover;
            border: 5px solid #667eea;
        }
        .name {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 10px;
        }
        .position {
            font-size: 1.3rem;
            color: #667eea;
            margin-bottom: 20px;
        }
        .section {
            background: rgba(255,255,255,0.95);
            padding: 40px;
            margin-bottom: 30px;
            border-radius: 25px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .section h2 {
            color: #667eea;
            font-size: 2rem;
            margin-bottom: 20px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
        }
        .skill {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        .project, .experience, .achievement, .certification {
            background: #f8f9fa;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 15px;
            border-left: 4px solid #667eea;
        }
        .project h3, .experience h3, .achievement h3, .certification h3 {
            color: #333;
            margin-bottom: 10px;
        }
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .social-links a {
            color: #667eea;
            text-decoration: none;
            padding: 10px 20px;
            border: 2px solid #667eea;
            border-radius: 25px;
            transition: all 0.3s;
        }
        .social-links a:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }
        .resume-btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            margin-top: 20px;
            transition: transform 0.3s;
        }
        .resume-btn:hover {
            transform: translateY(-2px);
        }
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .name { font-size: 2rem; }
            .section { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
    </div>
    <div class="container">
        <header class="header">
            ${data.profilePicture ? `<img src="${data.profilePicture}" alt="${data.name}" class="profile-img">` : ''}
            <h1 class="name">${data.name}</h1>
            <p class="position">${data.position}</p>
            <p>${data.introduction}</p>
            ${data.resume ? `<a href="${data.resume}" class="resume-btn" target="_blank">View Resume</a>` : ''}
        </header>

        <section class="section">
            <h2>About Me</h2>
            <p>${data.about}</p>
        </section>

        ${data.languages.length > 0 ? `
        <section class="section">
            <h2>Skills & Technologies</h2>
            <div class="skills">
                ${data.languages.map(lang => `<span class="skill">${lang}</span>`).join('')}
            </div>
        </section>` : ''}

        ${data.projects.length > 0 ? `
        <section class="section">
            <h2>Projects</h2>
            ${data.projects.map(project => `
                <div class="project">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <p><strong>Technologies:</strong> ${project.languages}</p>
                    ${project.link ? `<p><a href="${project.link}" target="_blank">View Project</a></p>` : ''}
                </div>
            `).join('')}
        </section>` : ''}

        ${data.experiences.some(exp => exp.company) ? `
        <section class="section">
            <h2>Experience</h2>
            ${data.experiences.filter(exp => exp.company).map(exp => `
                <div class="experience">
                    <h3>${exp.role} at ${exp.company}</h3>
                    <p><strong>Duration:</strong> ${exp.years}</p>
                    ${exp.companyWebsite ? `<p><a href="${exp.companyWebsite}" target="_blank">Company Website</a></p>` : ''}
                </div>
            `).join('')}
        </section>` : ''}

        ${data.achievements.some(ach => ach.title) ? `
        <section class="section">
            <h2>Achievements</h2>
            ${data.achievements.filter(ach => ach.title).map(ach => `
                <div class="achievement">
                    <h3>${ach.title}</h3>
                    <p>${ach.description}</p>
                    <p><strong>Date:</strong> ${ach.date}</p>
                </div>
            `).join('')}
        </section>` : ''}

        ${data.certifications.some(cert => cert.name) ? `
        <section class="section">
            <h2>Certifications</h2>
            ${data.certifications.filter(cert => cert.name).map(cert => `
                <div class="certification">
                    <h3>${cert.name}</h3>
                    <p><strong>Issuer:</strong> ${cert.issuer}</p>
                    <p><strong>Date:</strong> ${cert.date}</p>
                    ${cert.link ? `<p><a href="${cert.link}" target="_blank">View Certificate</a></p>` : ''}
                </div>
            `).join('')}
        </section>` : ''}

        ${Object.values(data.social).some(link => link) ? `
        <section class="section">
            <h2>Connect With Me</h2>
            <div class="social-links">
                ${data.social.github ? `<a href="${data.social.github}" target="_blank">GitHub</a>` : ''}
                ${data.social.linkedin ? `<a href="${data.social.linkedin}" target="_blank">LinkedIn</a>` : ''}
                ${data.social.facebook ? `<a href="${data.social.facebook}" target="_blank">Facebook</a>` : ''}
                ${data.social.instagram ? `<a href="${data.social.instagram}" target="_blank">Instagram</a>` : ''}
            </div>
        </section>` : ''}
    </div>
</body>
</html>`;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '28px', fontWeight: '700' }}>Basic Information</h2>
            <div style={{ display: 'grid', gap: '25px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  style={{ width: '100%', padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Position/Title</label>
                <input 
                  type="text" 
                  name="position" 
                  value={formData.position} 
                  onChange={handleInputChange} 
                  required 
                  style={{ width: '100%', padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                  placeholder="e.g., Full Stack Developer"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Profile Picture</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setFormData(prev => ({ ...prev, profilePicture: e.target.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                  style={{ width: '100%', padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Resume Link</label>
                <input 
                  type="url" 
                  name="resume" 
                  value={formData.resume} 
                  onChange={handleInputChange} 
                  required 
                  style={{ width: '100%', padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '28px', fontWeight: '700' }}>About Yourself</h2>
            <div style={{ display: 'grid', gap: '25px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Introduction</label>
                <textarea 
                  name="introduction" 
                  value={formData.introduction} 
                  onChange={handleInputChange} 
                  rows="3" 
                  required 
                  style={{ width: '100%', padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                  placeholder="Brief introduction about yourself..."
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>About Me</label>
                <textarea 
                  name="about" 
                  value={formData.about} 
                  onChange={handleInputChange} 
                  rows="6" 
                  required 
                  style={{ width: '100%', padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                  placeholder="Tell us more about your background, skills, and interests..."
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '28px', fontWeight: '700' }}>Skills & Languages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {languageOptions.map(lang => (
                <label key={lang} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '15px 20px',
                  border: `2px solid ${formData.languages.includes(lang) ? '#667eea' : '#e1e5e9'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: formData.languages.includes(lang) ? '#f0f4ff' : 'white'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(lang)}
                    onChange={() => handleLanguageToggle(lang)}
                    style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontWeight: '500', color: '#333' }}>{lang}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '28px', fontWeight: '700' }}>Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} style={{ border: '2px solid #e1e5e9', padding: '30px', marginBottom: '25px', borderRadius: '15px', background: '#f8f9fa' }}>
                <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Project {index + 1}</h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    placeholder="Project Name"
                    required
                    style={{ padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px' }}
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    placeholder="Project Description"
                    rows="3"
                    required
                    style={{ padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px', resize: 'vertical' }}
                  />
                  <input
                    type="text"
                    value={project.languages}
                    onChange={(e) => handleProjectChange(index, 'languages', e.target.value)}
                    placeholder="Technologies used (comma-separated)"
                    required
                    style={{ padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px' }}
                  />
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    placeholder="Project Link (GitHub, Live Demo, etc.)"
                    required
                    style={{ padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '16px' }}
                  />
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addProject} 
              style={{ 
                padding: '12px 25px', 
                background: '#667eea', 
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                fontWeight: '600',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#5a67d8'}
              onMouseLeave={(e) => e.target.style.background = '#667eea'}
            >
              + Add Another Project
            </button>
          </div>
        );
      case 5:
        return (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '28px', fontWeight: '700' }}>Experience & Achievements</h2>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Work Experience</h3>
              {formData.experiences.map((exp, index) => (
                <div key={index} style={{ border: '2px solid #e1e5e9', padding: '25px', marginBottom: '20px', borderRadius: '15px', background: '#f8f9fa' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      placeholder="Company Name"
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                      placeholder="Job Role"
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      value={exp.years}
                      onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                      placeholder="Duration (e.g., 2020-2023)"
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <input
                      type="url"
                      value={exp.companyWebsite}
                      onChange={(e) => handleExperienceChange(index, 'companyWebsite', e.target.value)}
                      placeholder="Company Website"
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addExperience} 
                style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                + Add Experience
              </button>
            </div>

            <div>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Achievements</h3>
              {formData.achievements.map((achievement, index) => (
                <div key={index} style={{ border: '2px solid #e1e5e9', padding: '25px', marginBottom: '20px', borderRadius: '15px', background: '#f8f9fa' }}>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                      placeholder="Achievement Title"
                      required
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <textarea
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                      placeholder="Achievement Description"
                      rows="2"
                      required
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px', resize: 'vertical' }}
                    />
                    <input
                      type="text"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                      placeholder="Date (e.g., March 2023)"
                      required
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addAchievement} 
                style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                + Add Achievement
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '28px', fontWeight: '700' }}>Social Links & Final Details</h2>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Certifications</h3>
              {formData.certifications.map((cert, index) => (
                <div key={index} style={{ border: '2px solid #e1e5e9', padding: '25px', marginBottom: '20px', borderRadius: '15px', background: '#f8f9fa' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                      placeholder="Certification Name"
                      required
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                      placeholder="Issuing Organization"
                      required
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                      placeholder="Date Obtained"
                      required
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                    <input
                      type="url"
                      value={cert.link}
                      onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                      placeholder="Certificate Link (optional)"
                      style={{ padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addCertification} 
                style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                + Add Certification
              </button>
            </div>

            <div>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Social Media Links</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>GitHub</label>
                  <input
                    type="url"
                    value={formData.social.github}
                    onChange={(e) => handleSocialChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                    style={{ width: '100%', padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>LinkedIn</label>
                  <input
                    type="url"
                    value={formData.social.linkedin}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    style={{ width: '100%', padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Facebook</label>
                  <input
                    type="url"
                    value={formData.social.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/username"
                    style={{ width: '100%', padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Instagram</label>
                  <input
                    type="url"
                    value={formData.social.instagram}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/username"
                    style={{ width: '100%', padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
      backgroundSize: '600% 600%',
      animation: 'gradientWave 25s ease infinite',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Advanced animated background elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
        borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
        animation: 'morphFloat 15s ease-in-out infinite',
        filter: 'blur(2px)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))',
        borderRadius: '38% 62% 63% 37% / 70% 33% 67% 30%',
        animation: 'morphFloat 18s ease-in-out infinite reverse',
        filter: 'blur(3px)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '70%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(225deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))',
        borderRadius: '49% 51% 52% 48% / 68% 34% 66% 32%',
        animation: 'morphFloat 12s ease-in-out infinite',
        filter: 'blur(1.5px)'
      }}></div>
      {/* Floating geometric shapes */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 3}px`,
          height: `${Math.random() * 8 + 3}px`,
          background: `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`,
          borderRadius: Math.random() > 0.5 ? '50%' : '20%',
          animation: `sparkle ${Math.random() * 4 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 3}s`
        }}></div>
      ))}
      
      <style>{`
        @keyframes gradientWave {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes morphFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
          }
          25% {
            transform: translateY(-30px) rotate(90deg) scale(1.1);
            border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          }
          50% {
            transform: translateY(-60px) rotate(180deg) scale(0.9);
            border-radius: 20% 80% 30% 70% / 50% 60% 40% 50%;
          }
          75% {
            transform: translateY(-30px) rotate(270deg) scale(1.05);
            border-radius: 60% 40% 80% 20% / 30% 70% 30% 70%;
          }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        padding: '20px 40px', 
        borderRadius: '15px', 
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333', fontSize: '32px', fontWeight: '700' }}>Build Your Portfolio</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '16px' }}>Step {currentStep} of {totalSteps}</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '12px 25px', 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#c82333'}
          onMouseLeave={(e) => e.target.style.background = '#dc3545'}
        >
          Logout
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ 
        background: 'white', 
        padding: '25px 40px', 
        borderRadius: '15px', 
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          {['Basic Info', 'About', 'Skills', 'Projects', 'Experience', 'Social & Final'].map((step, index) => (
            <div key={index} style={{ 
              flex: 1, 
              textAlign: 'center',
              color: currentStep > index + 1 ? '#28a745' : currentStep === index + 1 ? '#667eea' : '#999',
              fontWeight: currentStep === index + 1 ? '600' : '500',
              fontSize: '14px'
            }}>
              {step}
            </div>
          ))}
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          background: '#e1e5e9', 
          borderRadius: '4px', 
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${(currentStep / totalSteps) * 100}%`, 
            height: '100%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '40px',
          background: 'white',
          padding: '30px 40px',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
        }}>
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            style={{
              padding: '15px 30px',
              background: currentStep === 1 ? '#e1e5e9' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'background 0.3s'
            }}
          >
            ← Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              type="submit"
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.4)';
              }}
            >
              Generate Portfolio
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              Next →
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Builder;