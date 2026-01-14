# BIDbuyy - Sneaker Auction Platform

A modern web application for bidding and selling sneakers, built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Home Page** - Browse ongoing auctions
- **Login/Signup** - User authentication
- **Sell Dashboard** - Manage your products
- **Add Product Flow** - Multi-step product listing (Description, Categories, Photos, Delivery)
- **Account Management** - Account and address information forms
- **Auction Listings** - Browse and filter ongoing auctions
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Quick Start

1. **Install Frontend Dependencies:**
```bash
npm install
```

2. **Install Backend Dependencies:**
```bash
cd server
npm install
cd ..
```

3. **Set Up Environment Variables:**

Create `server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/sneaker_bid
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

For MongoDB Atlas, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sneaker_bid
```

4. **Start Backend Server** (Terminal 1):
```bash
cd server
npm start
```

5. **Start Frontend Server** (Terminal 2):
```bash
npm run dev
```

6. **Access the Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

> 📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer with links
│   ├── TopBanner.jsx   # Promotional banner
│   └── Newsletter.jsx  # Newsletter subscription
├── layouts/            # Layout components
│   └── MainLayout.jsx  # Main page layout
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SellDashboard.jsx
│   ├── AddProduct.jsx
│   ├── OngoingAuctions.jsx
│   ├── AccountInformation.jsx
│   ├── AddressInformation.jsx
│   └── Verification.jsx
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: `#8B203A` (Maroon/Burgundy)
- **Secondary**: `#F5F5F5` (Light Gray)
- **Text**: Black and various grays

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🗺️ Routes

- `/` - Home page
- `/login` - Login page
- `/sell` - Sell dashboard
- `/sell/add-product` - Add product (multi-step form)
- `/sell/account` - Account information
- `/sell/address` - Address information
- `/sell/verification` - Verification page
- `/auctions` - Ongoing auctions listing
- `/ongoing-auctions` - Ongoing auctions (alias)

## ✅ Current Features

- ✅ **Backend API** - Full REST API with Express.js
- ✅ **Authentication** - JWT-based user authentication
- ✅ **Database** - MongoDB with Mongoose ODM
- ✅ **Product Management** - Create, list, and manage products
- ✅ **User Profiles** - User registration, login, and profile management
- ✅ **Protected Routes** - Authentication middleware for secure endpoints

## 🚧 Future Enhancements

To enhance the platform, consider adding:

1. **Image Upload** - Actual image upload functionality (currently using placeholder URLs)
2. **Bidding System** - Real-time bidding functionality with WebSockets
3. **Payment Integration** - Payment gateway integration (Stripe, PayPal, etc.)
4. **Search & Filters** - Advanced search and filtering capabilities
5. **Product Details** - Individual product detail pages with bid history
6. **Email Notifications** - Email alerts for bids and auction endings
7. **Admin Dashboard** - Admin panel for managing users and products

## 📝 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Based on Figma Design

This project is built based on the BIDbuyy Figma design, implementing:
- Exact color scheme and branding
- Component structure matching the design
- All major pages and flows
- Responsive layout patterns


