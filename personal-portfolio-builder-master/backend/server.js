const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder';
    const isProduction = process.env.NODE_ENV === 'production';
    
    console.log(`🔗 Connecting to MongoDB...`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: isProduction ? 30000 : 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      maxPoolSize: isProduction ? 10 : 5,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    if (isProduction) {
      // Test the connection in production
      await mongoose.connection.db.admin().ping();
      console.log('✅ MongoDB ping successful');
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (process.env.NODE_ENV === 'production') {
      // Retry connection in production
      console.log('🔄 Retrying MongoDB connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      // For local development
      console.log('💡 Make sure MongoDB is running locally or use MongoDB Compass');
      console.log('💡 Start MongoDB: net start MongoDB (as Administrator)');
      process.exit(1);
    }
  }
};

// Connect to database
connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true });

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected');
});

const User = mongoose.model('User', userSchema);

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  position: String,
  profilePicture: String,
  resume: String,
  introduction: String,
  description: String,
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

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user._id, email, name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Builder API is running!', 
    status: 'OK',
    database: 'MongoDB Connected',
    endpoints: {
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login',
      portfolios: 'GET/POST /api/portfolios'
    }
  });
});

// Portfolio Routes
app.post('/api/portfolios', auth, async (req, res) => {
  try {
    const portfolio = new Portfolio({ ...req.body, userId: req.userId });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/portfolios/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/portfolios', auth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});