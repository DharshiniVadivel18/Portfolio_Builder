import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Builder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    resume: '',
    about: '',
    languages: [],
    projects: [{ name: '', description: '', languages: '', link: '' }],
    experiences: [{ company: '', role: '', years: '', companyWebsite: '' }],
    achievements: [{ title: '', description: '', year: '' }],
    social: { facebook: '', instagram: '', github: '', linkedin: '' },

  });

  const languageOptions = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node', 'MongoDB'];

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
      achievements: [...prev.achievements, { title: '', description: '', year: '' }]
    }));
  };

  const handleSocialChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      projects: formData.projects.map(project => ({
        ...project,
        languages: project.languages.split(',').map(lang => lang.trim())
      }))
    };
    
    localStorage.setItem('portfolio', JSON.stringify(processedData));
    navigate('/portfolio');
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Build Your Portfolio</h1>
      
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
            <label>Resume Link:</label>
            <input type="url" name="resume" value={formData.resume} onChange={handleInputChange} required />
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
          <button type="button" onClick={addProject} style={{ background: '#34495e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Add Project
          </button>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Experience</h2>
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
          <button type="button" onClick={addExperience} style={{ background: '#34495e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Add Experience
          </button>
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
                <label>Year:</label>
                <input
                  type="text"
                  value={achievement.year}
                  onChange={(e) => handleAchievementChange(index, 'year', e.target.value)}
                  placeholder="e.g., 2023"
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addAchievement} style={{ background: '#34495e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Add Achievement
          </button>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Social Links</h2>
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