import { Link } from 'react-router-dom'

function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-primary via-primary-dark to-primary overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Bid on Premium
              <span className="block text-yellow-300">Sneakers</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-100">
              Discover exclusive sneaker auctions. Find rare kicks, place your bids,
              and win your dream pair at the best prices!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/auctions"
                className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-center"
              >
                Browse Auctions
              </Link>
              <Link
                to="/sell"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-all hover:scale-105 text-center"
              >
                Start Selling
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-200">Active Auctions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-gray-200">Happy Bidders</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2K+</div>
                <div className="text-sm text-gray-200">Verified Sellers</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block animate-slideIn">
            <div className="relative">
              <div className="absolute inset-0 bg-white opacity-20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👟</div>
                    <div className="text-primary font-bold text-xl">Premium Sneakers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
    </div>
  )
}

export default HeroBanner


