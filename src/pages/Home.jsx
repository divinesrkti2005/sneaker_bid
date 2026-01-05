import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import productService from '../services/productService'
import MainLayout from '../layouts/MainLayout'
import HeroBanner from '../components/HeroBanner'
import PromotionalBanner from '../components/PromotionalBanner'
import ProductCard from '../components/ProductCard'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts()
        setFeaturedProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [
    { name: 'Running', icon: '🏃', count: 120 },
    { name: 'Basketball', icon: '🏀', count: 85 },
    { name: 'Lifestyle', icon: '👟', count: 200 },
    { name: 'Limited Edition', icon: '⭐', count: 45 },
  ]

  return (
    <MainLayout>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Promotional Banner */}
      <PromotionalBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        <section className="mb-16 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/categories" className="text-primary font-semibold hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="bg-white rounded-xl shadow-md p-6 text-center hover-lift cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
                <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Auctions */}
        <section className="mb-16 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Auctions
              </h2>
              <p className="text-gray-600">Discover premium sneakers up for bid</p>
            </div>
            <Link
              to="/auctions"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-12">Loading products...</div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">No products found. Be the first to add one!</div>
            )}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 mb-16 text-white animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Active Auctions</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-gray-200">Total Bids</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2K+</div>
              <div className="text-gray-200">Verified Sellers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-gray-200">Satisfaction Rate</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Browse Auctions', desc: 'Explore our collection of premium sneakers', icon: '🔍' },
              { step: '2', title: 'Place Your Bid', desc: 'Bid on your favorite pair at the best price', icon: '💰' },
              { step: '3', title: 'Win & Enjoy', desc: 'Get your sneakers delivered to your door', icon: '🎉' },
            ].map((item, index) => (
              <div
                key={item.step}
                className="bg-white rounded-xl shadow-md p-6 text-center hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {item.icon}
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default Home

