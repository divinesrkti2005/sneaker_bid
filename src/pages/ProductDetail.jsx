import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import productService from '../services/productService'
import bidService from '../services/bidService'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [bidAmount, setBidAmount] = useState('')
  const [placingBid, setPlacingBid] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    // Get user ID from token (simplified - in production, decode JWT)
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUserId(payload.user?.id)
      } catch (e) {
        console.error('Error parsing token')
      }
    }
    fetchProduct()
    fetchBids()
  }, [id])

  const fetchProduct = async () => {
    try {
      const data = await productService.getProductById(id)
      setProduct(data)
      if (data.price) {
        setBidAmount((data.price + 100).toString())
      }
    } catch (err) {
      console.error('Error fetching product:', err)
      setError('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const fetchBids = async () => {
    try {
      const data = await bidService.getProductBids(id)
      setBids(data)
    } catch (err) {
      console.error('Error fetching bids:', err)
    }
  }

  const handlePlaceBid = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setPlacingBid(true)
    setError('')

    try {
      const amount = parseFloat(bidAmount)
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid bid amount')
        setPlacingBid(false)
        return
      }

      await bidService.placeBid(id, amount)
      setBidAmount((amount + 100).toString())
      await fetchBids()
      await fetchProduct() // Refresh product to get updated bid count
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to place bid')
    } finally {
      setPlacingBid(false)
    }
  }

  const getHighestBid = () => {
    if (bids.length === 0) return product?.price || 0
    return Math.max(...bids.map(bid => bid.amount))
  }

  const calculateTimeLeft = (endTime) => {
    if (!endTime) return 'No end time set'
    const now = new Date()
    const end = new Date(endTime)
    const diff = end - now

    if (diff <= 0) return 'Auction ended'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading product...</div>
        </div>
      </MainLayout>
    )
  }

  if (!product || error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <Link to="/" className="text-primary hover:underline">Go back to home</Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  const highestBid = getHighestBid()
  const minimumBid = highestBid + 100

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <span className="text-gray-600 mx-2">/</span>
          <Link to="/auctions" className="text-gray-600 hover:text-primary">Auctions</Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-8xl">👟</span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info & Bidding */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Bid</p>
                  <p className="text-3xl font-bold text-primary">Rs.{highestBid.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{bids.length}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Starting Price</span>
                  <span className="font-semibold">Rs.{product.price?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Minimum Bid</span>
                  <span className="font-semibold text-primary">Rs.{minimumBid.toLocaleString()}</span>
                </div>
                {product.endTime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Time Left</span>
                    <span className="font-semibold text-primary">{calculateTimeLeft(product.endTime)}</span>
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <form onSubmit={handlePlaceBid} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Bid Amount
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={minimumBid}
                      step="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={`Minimum: Rs.${minimumBid.toLocaleString()}`}
                      required
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={placingBid}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {placingBid ? 'Placing Bid...' : 'Place Bid'}
                  </button>
                </form>
              ) : (
                <Link
                  to="/login"
                  className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
                >
                  Login to Place Bid
                </Link>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {product.seller?.name || 'Seller'}
                  </p>
                  <p className="text-sm text-gray-500">{product.seller?.email}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
          
          {product.categories && product.categories.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.deliveryOptions && product.deliveryOptions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Options</h3>
              <div className="flex flex-wrap gap-2">
                {product.deliveryOptions.map((option, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bid History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bid History</h2>
          {bids.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bids yet. Be the first to bid!</p>
          ) : (
            <div className="space-y-4">
              {bids.map((bid, index) => (
                <div
                  key={bid._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      #{bids.length - index}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {bid.bidder?.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(bid.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      Rs.{bid.amount.toLocaleString()}
                    </p>
                    {index === 0 && (
                      <span className="text-xs text-green-600 font-semibold">Highest Bid</span>
                    )}
                    {index === 0 && userId && bid.bidder?._id === userId && (
                      <Link
                        to={`/checkout/${product._id}/${bid._id}`}
                        className="mt-2 block bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors text-center"
                      >
                        Proceed to Checkout →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductDetail
