const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});