# 🗄️ MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free & Easy) ⭐

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google, GitHub, or Email (it's free!)

### Step 2: Create a Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE (M0) Shared** cluster
3. Select a cloud provider and region (closest to you)
4. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (SAVE THESE!)
5. Set privileges to **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Whitelist Your IP
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development) or add your IP
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update .env File
1. Open `server/.env`
2. Replace the `MONGO_URI` line with your Atlas connection string
3. Replace `<username>` and `<password>` with your database user credentials
4. Add database name at the end: `...mongodb.net/sneaker_bid?retryWrites=true&w=majority`

Example:
```env
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/sneaker_bid?retryWrites=true&w=majority
```

---

## Option 2: Local MongoDB Installation

### Windows Installation
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as Windows Service (recommended)
5. Install MongoDB Compass (GUI tool - optional)

### Start MongoDB Service
- MongoDB should start automatically as a Windows service
- Or manually start: Open Services → Find "MongoDB" → Start

### Verify Installation
```bash
mongod --version
```

### Connection String
Your `.env` file already has the local connection string:
```env
MONGO_URI=mongodb://localhost:27017/sneaker_bid
```

---

## ✅ Test Connection

After setting up MongoDB (Atlas or Local), test the connection:

```bash
cd server
npm start
```

You should see:
```
MongoDB Connected...
Server started on port 5000
```

If you see an error, check:
- ✅ Connection string is correct
- ✅ Username/password are correct (for Atlas)
- ✅ IP is whitelisted (for Atlas)
- ✅ MongoDB service is running (for local)

---

## 🎯 Quick Atlas Setup (5 minutes)

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register
2. **Create free cluster** → Wait 3-5 minutes
3. **Create database user** → Save username/password
4. **Whitelist IP** → Allow from anywhere (for dev)
5. **Get connection string** → Copy from "Connect" button
6. **Update `server/.env`** → Replace MONGO_URI with your connection string

Done! 🎉
