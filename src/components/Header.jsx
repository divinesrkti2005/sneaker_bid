import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  const isAuthenticated = !!localStorage.getItem('token')

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <span className="text-2xl font-bold">
              <span className="text-primary">Sneaker</span>
              <span className="text-black">-bid</span>
            </span>
            <span className="text-xs text-gray-600 hidden sm:block">
              Premium Auctions
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full transition-colors ${isActive('/')
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:text-primary'
                }`}
            >
              Home
            </Link>
            <Link
              to="/sell"
              className={`px-4 py-2 rounded-full transition-colors ${isActive('/sell') || location.pathname.startsWith('/sell')
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:text-primary'
                }`}
            >
              Sell
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-full transition-colors ${isActive('/about')
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:text-primary'
                }`}
            >
              About us
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-700 hover:text-primary transition-colors hover:scale-110 transform">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button className="relative text-gray-700 hover:text-primary transition-colors hover:scale-110 transform">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                2
              </span>
            </button>
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="text-gray-700 hover:text-primary transition-colors hover:scale-110 transform relative group"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {/* Tooltip */}
              <span className="absolute hidden group-hover:block w-auto p-2 min-w-max left-1/2 -translate-x-1/2 top-full mt-2 text-xs font-bold text-white bg-gray-900 rounded-md shadow-lg z-50">
                {isAuthenticated ? "My Account" : "Log In"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

