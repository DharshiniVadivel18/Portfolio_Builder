const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.name);
    await mongoose.connection.close();
    console.log('Connection test completed.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure MongoDB is running locally');
    console.log('2. Check your MONGODB_URI in .env file');
    console.log('3. For MongoDB Atlas, ensure your IP is whitelisted');
  }
}

testConnection();