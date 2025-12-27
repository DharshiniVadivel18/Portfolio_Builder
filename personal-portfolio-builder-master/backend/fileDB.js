const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], portfolios: [] }, null, 2));
}

const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (error) {
    return { users: [], portfolios: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB };