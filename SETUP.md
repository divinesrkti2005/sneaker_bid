# 🚀 BIDbuyy Setup Guide

Complete setup instructions for the Sneaker Auction Platform.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 📋 Step-by-Step Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Set Up MongoDB

#### Option A: Local MongoDB
- Install MongoDB locally
- Start MongoDB service
- Connection string: `mongodb://localhost:27017/sneaker_bid`

#### Option B: MongoDB Atlas (Cloud)
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get your connection string
- Replace `<password>` with your database password

### 4. Configure Environment Variables

#### Backend (.env file in `server/` directory)

Create `server/.env` file with the following:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/sneaker_bid
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sneaker_bid

# JWT Secret Key (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port (optional, defaults to 5000)
PORT=5000
```

**To generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Frontend (.env file in root directory)

Create `.env` file in the root directory (optional):

```env
# Frontend API URL (defaults to http://localhost:5000/api if not set)
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
npm start
# or
npm run dev
```

The backend will run on `http://localhost:5000`

#### Terminal 2 - Frontend Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 🧪 Testing the Setup

1. Open http://localhost:5173 in your browser
2. Try registering a new user at `/signup`
3. Login at `/login`
4. Create a product at `/sell/add-product`
5. View products on the home page

## 📁 Project Structure

```
sneaker_bid/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── layouts/           # Layout components
│   ├── services/          # API services
│   └── config/            # Configuration
├── server/                # Backend Express API
│   ├── config/           # Database config
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── middleware/       # Auth middleware
├── img/                  # Product images
└── package.json          # Frontend dependencies
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings for MongoDB Atlas
- Verify credentials in connection string

### Port Already in Use
- Change `PORT` in `server/.env` to a different port
- Update `VITE_API_URL` in frontend `.env` accordingly

### CORS Errors
- Backend has CORS enabled, should work by default
- If issues persist, check `server/server.js` CORS configuration

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 🚀 Production Build

### Frontend
```bash
npm run build
```
Output will be in `dist/` directory

### Backend
```bash
cd server
npm start
```

## 📝 Next Steps

After setup, you can:
- Add real-time bidding functionality
- Implement payment integration
- Add image upload functionality
- Enhance search and filtering
- Add product detail pages

## 🆘 Need Help?

Check the main README.md for more information about the project structure and features.
