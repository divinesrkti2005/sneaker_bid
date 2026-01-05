import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SellDashboard from './pages/SellDashboard'
import AddProduct from './pages/AddProduct'
import OngoingAuctions from './pages/OngoingAuctions'
import AccountInformation from './pages/AccountInformation'
import AddressInformation from './pages/AddressInformation'
import Verification from './pages/Verification'
import UserProfile from './pages/UserProfile'
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/sell" element={<SellDashboard />} />
      <Route path="/sell/dashboard" element={<SellDashboard />} />
      <Route path="/sell/add-product" element={<AddProduct />} />
      <Route path="/sell/account" element={<AccountInformation />} />
      <Route path="/sell/address" element={<AddressInformation />} />
      <Route path="/sell/verification" element={<Verification />} />
      <Route path="/auctions" element={<OngoingAuctions />} />
      <Route path="/ongoing-auctions" element={<OngoingAuctions />} />
    </Routes>
  )
}

export default App

