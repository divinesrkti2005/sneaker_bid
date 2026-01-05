import { Link } from 'react-router-dom'

function ProductCard({ product, index }) {
  return (
    <Link
      to={`/product/${product.id || index}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
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
          {product.name || 'Product name'}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary font-bold text-xl">
            Rs.{product.price || '120'}
          </span>
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
            {product.bids || '3'} bids
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">({product.seller || 'Seller name'})</p>
          <div className="flex items-center gap-1 text-primary">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium">
              {product.timeLeft || '4d 20h'}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors hover:scale-105 transform">
            Place Bid
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard


