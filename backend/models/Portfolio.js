const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  position: String,
  profilePicture: String,
  resume: String,
  introduction: String,
  about: String,
  languages: [String],
  projects: [{
    name: String,
    description: String,
    languages: [String],
    link: String
  }],
  experiences: [{
    company: String,
    role: String,
    years: String,
    companyWebsite: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String
  }],
  social: {
    facebook: String,
    instagram: String,
    github: String,
    linkedin: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);