import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Builder = () => {
  const navigate = useNavigate();

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
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node', 'MongoDB', 'Express'
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
      const token = localStorage.getItem('token');
      const processedData = {
        ...formData,
        projects: formData.projects.map(project => ({
          ...project,
          languages: project.languages.split(',').map(lang => lang.trim())
        }))
      };
      
      const response = await axios.post('/api/portfolios', processedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/portfolio/${response.data._id}`);
    } catch (error) {
      console.error('Error creating portfolio:', error);
      alert('Error creating portfolio. Please try again.');
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Build Your Portfolio</h1>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Position:</label>
            <input type="text" name="position" value={formData.position} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input type="file" name="profilePicture" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setFormData(prev => ({ ...prev, profilePicture: e.target.result }));
                };
                reader.readAsDataURL(file);
              }
            }} />
          </div>
          <div className="form-group">
            <label>Resume Link:</label>
            <input type="url" name="resume" value={formData.resume} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Introduction:</label>
            <textarea name="introduction" value={formData.introduction} onChange={handleInputChange} rows="3" required />
          </div>

          <div className="form-group">
            <label>About:</label>
            <textarea name="about" value={formData.about} onChange={handleInputChange} rows="5" required />
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Programming Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languageOptions.map(lang => (
              <label key={lang} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.languages.includes(lang)}
                  onChange={() => handleLanguageToggle(lang)}
                  style={{ marginRight: '5px' }}
                />
                {lang}
              </label>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
              <div className="form-group">
                <label>Project Name:</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Languages (comma-separated):</label>
                <input
                  type="text"
                  value={project.languages}
                  onChange={(e) => handleProjectChange(index, 'languages', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Link:</label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addProject} className="btn-secondary">Add Project</button>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Experience (Optional)</h2>
          {formData.experiences.map((exp, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
              <div className="form-group">
                <label>Company:</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Years:</label>
                <input
                  type="text"
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                  placeholder="e.g., 2020-2023"
                />
              </div>
              <div className="form-group">
                <label>Company Website:</label>
                <input
                  type="url"
                  value={exp.companyWebsite}
                  onChange={(e) => handleExperienceChange(index, 'companyWebsite', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="btn-secondary">Add Experience</button>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Achievements</h2>
          {formData.achievements.map((achievement, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
              <div className="form-group">
                <label>Achievement Title:</label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={achievement.description}
                  onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="text"
                  value={achievement.date}
                  onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                  placeholder="e.g., March 2023"
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addAchievement} className="btn-secondary">Add Achievement</button>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Certifications</h2>
          {formData.certifications.map((cert, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
              <div className="form-group">
                <label>Certification Name:</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Issuer:</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                  placeholder="e.g., June 2023"
                  required
                />
              </div>
              <div className="form-group">
                <label>Certificate Link:</label>
                <input
                  type="url"
                  value={cert.link}
                  onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addCertification} className="btn-secondary">Add Certification</button>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Social Links (Optional)</h2>
          <div className="form-group">
            <label>Facebook:</label>
            <input
              type="url"
              value={formData.social.facebook}
              onChange={(e) => handleSocialChange('facebook', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Instagram:</label>
            <input
              type="url"
              value={formData.social.instagram}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>GitHub:</label>
            <input
              type="url"
              value={formData.social.github}
              onChange={(e) => handleSocialChange('github', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>LinkedIn:</label>
            <input
              type="url"
              value={formData.social.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
            />
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn-primary">Generate Portfolio</button>
        </div>
      </form>
    </div>
  );
};

export default Builder;