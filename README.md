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

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

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

## 🚧 Next Steps

To enhance the platform, consider adding:

1. **Backend Integration** - Connect to an API for data persistence
2. **Authentication** - Implement real user authentication
3. **Image Upload** - Add actual image upload functionality
4. **Bidding System** - Real-time bidding functionality
5. **Payment Integration** - Payment gateway integration
6. **Search & Filters** - Advanced search and filtering
7. **User Profiles** - User profile pages
8. **Product Details** - Individual product detail pages

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


