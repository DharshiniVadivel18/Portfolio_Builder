const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

const router = express.Router();

// Create portfolio
router.post('/', auth, async (req, res) => {
  try {
    const portfolio = new Portfolio({ ...req.body, userId: req.userId });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get portfolio by ID
router.get('/:id', async (req, res) => {
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

// Get user's portfolios
router.get('/', auth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;