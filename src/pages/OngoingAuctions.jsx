import MainLayout from '../layouts/MainLayout'

function OngoingAuctions() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <span className="text-gray-600">Home &gt; Ongoing Auctions</span>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Filter</h3>
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Price</h4>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rs.50000</span>
                    <span className="text-gray-600">Rs.200000</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="200000"
                    className="w-full"
                  />
                </div>
              </div>

              <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                Apply Filter
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Ongoing Auctions
              </h1>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by: Most Popular</option>
                <option>Sort by: Price Low to High</option>
                <option>Sort by: Price High to Low</option>
                <option>Sort by: Ending Soon</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group cursor-pointer animate-fadeIn"
                  style={{ animationDelay: `${item * 0.05}s` }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        HOT
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-gray-400 text-4xl">👟</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-semibold">View Details →</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      Product name
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary font-bold text-lg">
                        Rs.120
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                        3 bids
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      (Seller name) 45
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Time left 4d 20h</span>
                    </div>
                    <button className="w-full mt-3 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors hover:scale-105 transform">
                      Place Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                ← Previous
              </button>
              {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${
                    page === 1
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default OngoingAuctions

