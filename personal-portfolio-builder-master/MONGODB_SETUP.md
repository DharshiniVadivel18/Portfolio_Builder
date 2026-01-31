# MongoDB Setup Guide

## Option 1: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB following the installer
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```
4. Verify MongoDB is running:
   ```cmd
   mongo --version
   ```

### Alternative - Using MongoDB Compass:
1. Download MongoDB Compass (GUI): https://www.mongodb.com/products/compass
2. Install and connect to `mongodb://localhost:27017`

## Option 2: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string
7. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio-builder?retryWrites=true&w=majority
   ```

## Testing Connection

Run the test script:
```bash
node test-connection.js
```

## Starting the Application

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

The server will show connection status and helpful error messages if MongoDB is not accessible.