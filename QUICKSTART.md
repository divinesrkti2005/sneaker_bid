# ⚡ Quick Start Guide

Get BIDbuyy running in 5 minutes!

## Prerequisites Check

- ✅ Node.js installed? Run: `node --version` (should be v16+)
- ✅ MongoDB running? (Local or Atlas account)

## Step 1: Install Dependencies (Already Done!)

Frontend: ✅ Installed
Backend: ✅ Installed

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/sneaker_bid`

### Option B: MongoDB Atlas (Recommended for Quick Start)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

## Step 3: Create Environment File

Create `server/.env` file with this content:

```env
MONGO_URI=mongodb://localhost:27017/sneaker_bid
JWT_SECRET=change_this_to_a_random_secret_key_in_production
PORT=5000
```

**For MongoDB Atlas**, replace `MONGO_URI` with your Atlas connection string:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sneaker_bid?retryWrites=true&w=majority
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Start the Servers

### Terminal 1 - Backend
```bash
cd server
npm start
```

You should see: `Server started on port 5000` and `MongoDB Connected...`

### Terminal 2 - Frontend
```bash
npm run dev
```

You should see: `Local: http://localhost:5173`

## Step 5: Open the App

Open your browser and go to: **http://localhost:5173**

## 🎉 You're Ready!

Try these:
1. Click "Sign Up" to create an account
2. Login with your credentials
3. Go to "Sell" → "Add Product" to list a sneaker
4. View your products on the home page

## 🐛 Troubleshooting

**"MongoDB connection failed"**
- Check if MongoDB is running (local) or connection string is correct (Atlas)
- For Atlas: Make sure your IP is whitelisted in Network Access

**"Port 5000 already in use"**
- Change `PORT=5001` in `server/.env`
- Update frontend `.env` with new API URL if needed

**"Cannot find module"**
- Run `npm install` in both root and `server/` directories

## 📚 Next Steps

- Read [SETUP.md](./SETUP.md) for detailed setup
- Check [README.md](./README.md) for project overview
