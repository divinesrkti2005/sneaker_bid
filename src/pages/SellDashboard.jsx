import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import productService from '../services/productService'

function SellDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserProducts()
  }, [])

  const fetchUserProducts = async () => {
    setLoading(true)
    try {
      const data = await productService.getUserProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching user products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    setDeletingId(productId)
    try {
      await productService.deleteProduct(productId)
      setProducts(products.filter(p => p._id !== productId))
    } catch (error) {
      alert(error.message || 'Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (productId) => {
    navigate(`/sell/edit-product/${productId}`)
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <span className="text-gray-600">Sell &gt; Dashboard</span>
        </div>

        {/* Get Started Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-white animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Get Started
              </h1>
              <p className="text-lg text-gray-100">Add your first product to sell</p>
            </div>
            <Link
              to="/sell/add-product"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Add products →
            </Link>
          </div>
        </div>

        {/* Your Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Your Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Cards */}
            {loading ? (
              <div className="col-span-full text-center py-8">Loading...</div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group"
                >
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                        />
                      ) : (
                        <span className="text-gray-400 group-hover:scale-110 transition-transform">Product Image</span>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          {product.bids || 0} bids
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-3">
                      <span className="text-primary font-bold text-lg">Rs. {product.price?.toLocaleString()}</span>
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deletingId === product._id}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm disabled:opacity-50"
                      >
                        {deletingId === product._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                You haven't listed any items yet.
              </div>
            )}

            {/* Add Product Card */}
            <Link
              to="/sell/add-product"
              className="bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center h-64 hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 group"
            >
              <div className="text-center">
                <div className="text-5xl text-primary mb-2 group-hover:scale-110 transition-transform">+</div>
                <p className="text-gray-600 font-semibold group-hover:text-primary transition-colors">Add Product</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SellDashboard

