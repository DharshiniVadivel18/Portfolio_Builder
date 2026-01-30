const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder');
    console.log('✅ Database connected successfully!');
    
    // Test basic operations
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    await TestModel.create({ test: 'connection test' });
    console.log('✅ Database write test successful!');
    
    await TestModel.deleteMany({ test: 'connection test' });
    console.log('✅ Database cleanup successful!');
    
    await mongoose.disconnect();
    console.log('✅ Database disconnected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();