const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// File paths for data storage
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PORTFOLIOS_FILE = path.join(DATA_DIR, 'portfolios.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize files if they don't exist
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
    
    try {
      await fs.access(PORTFOLIOS_FILE);
    } catch {
      await fs.writeFile(PORTFOLIOS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error setting up data directory:', error);
  }
}

// Helper functions for file operations
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readPortfolios() {
  try {
    const data = await fs.readFile(PORTFOLIOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writePortfolios(portfolios) {
  await fs.writeFile(PORTFOLIOS_FILE, JSON.stringify(portfolios, null, 2));
}

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

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
    const users = await readUsers();
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    await writeUsers(users);
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, email, name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Portfolio Routes
app.post('/api/portfolios', auth, async (req, res) => {
  try {
    const portfolios = await readPortfolios();
    const portfolio = {
      id: Date.now().toString(),
      ...req.body,
      userId: req.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    portfolios.push(portfolio);
    await writePortfolios(portfolios);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/portfolios/:id', async (req, res) => {
  try {
    const portfolios = await readPortfolios();
    const portfolio = portfolios.find(p => p.id === req.params.id);
    
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
    const portfolios = await readPortfolios();
    const userPortfolios = portfolios
      .filter(p => p.userId === req.userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(userPortfolios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/portfolios/:id', auth, async (req, res) => {
  try {
    const portfolios = await readPortfolios();
    const index = portfolios.findIndex(p => p.id === req.params.id && p.userId === req.userId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    portfolios[index] = {
      ...portfolios[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    await writePortfolios(portfolios);
    res.json(portfolios[index]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running with file-based storage' });
});

// Initialize and start server
async function startServer() {
  await ensureDataDir();
  
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📁 Using file-based storage in: ${DATA_DIR}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch(console.error);