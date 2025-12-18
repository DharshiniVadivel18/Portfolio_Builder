const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment process...\n');

try {
  // Check if client directory exists
  if (!fs.existsSync('./client')) {
    throw new Error('Client directory not found');
  }

  console.log('📦 Installing server dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('📦 Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  console.log('🏗️  Building React app...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  console.log('✅ Deployment preparation complete!');
  console.log('\nTo start the production server:');
  console.log('NODE_ENV=production npm start');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}