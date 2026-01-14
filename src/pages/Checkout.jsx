import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import productService from '../services/productService'
import bidService from '../services/bidService'
import paymentService from '../services/paymentService'

function Checkout() {
  const { productId, bidId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [bid, setBid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })

  useEffect(() => {
    fetchData()
  }, [productId, bidId])

  const fetchData = async () => {
    try {
      const [productData, bidData] = await Promise.all([
        productService.getProductById(productId),
        bidService.getProductBids(productId).then(bids => 
          bids.find(b => b._id === bidId)
        )
      ])
      setProduct(productData)
      setBid(bidData)
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to load checkout data')
      navigate('/auctions')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    if (paymentMethod !== 'COD' && (!shippingAddress.name || !shippingAddress.address)) {
      alert('Please fill in shipping address')
      return
    }

    setProcessing(true)
    try {
      const result = await paymentService.createPayment({
        productId,
        bidId,
        paymentMethod,
        shippingAddress: paymentMethod === 'COD' ? shippingAddress : {}
      })

      if (result.paymentUrl) {
        // Redirect to payment gateway
        if (paymentMethod === 'eSewa') {
          // In production, redirect to actual eSewa payment page
          alert('Redirecting to eSewa... (Mock payment)')
          // window.location.href = result.paymentUrl
        } else if (paymentMethod === 'Khalti') {
          alert('Redirecting to Khalti... (Mock payment)')
          // window.location.href = result.paymentUrl
        }
      }

      // For COD or card payments
      if (result.success) {
        alert('Order placed successfully!')
        navigate('/profile')
      }
    } catch (error) {
      alert(error.message || 'Payment failed')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    )
  }

  if (!product || !bid) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Invalid checkout data</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-900">Checkout</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6">
                {product.images?.[0] && (
                  <img
                    src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">Your winning bid</p>
                  <p className="text-2xl font-bold text-primary mt-2">Rs.{bid.amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rs.{bid.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Rs.500</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary">Rs.{(bid.amount + 500).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {paymentMethod !== 'COD' && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold">Cash on Delivery</span>
                      <p className="text-xs text-gray-500">Pay when you receive</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="eSewa"
                      checked={paymentMethod === 'eSewa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold">eSewa</span>
                      <p className="text-xs text-gray-500">Digital wallet</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Visa"
                      checked={paymentMethod === 'Visa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold">Visa / Mastercard</span>
                      <p className="text-xs text-gray-500">Credit/Debit card</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Khalti"
                      checked={paymentMethod === 'Khalti'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold">Khalti</span>
                      <p className="text-xs text-gray-500">Digital wallet</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={processing || !paymentMethod}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : 'Complete Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Checkout
