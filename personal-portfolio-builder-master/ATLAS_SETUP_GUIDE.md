# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free" and create account
3. Choose "Build a Database" → "Free" (M0 Sandbox)

## Step 2: Create Cluster
1. Choose cloud provider (AWS recommended)
2. Select region closest to you
3. Cluster Name: `Cluster0` (default)
4. Click "Create Cluster"

## Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `portfolio`
4. Password: `portfolio123` (or generate secure password)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Step 6: Update Your .env File
Replace the MONGODB_URI in your `.env` file with your connection string:
```
MONGODB_URI=mongodb+srv://portfolio:portfolio123@cluster0.xxxxx.mongodb.net/portfolio-builder?retryWrites=true&w=majority
```

## Step 7: Test Connection
```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.mongodb.net
📊 Database: portfolio-builder
```

## View Data in MongoDB Atlas
1. Go to "Database" → "Browse Collections"
2. You'll see `portfolio-builder` database
3. Collections: `users` and `portfolios`