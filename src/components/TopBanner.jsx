import { useState } from 'react'

function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark w-full py-2 px-4 flex items-center justify-between animate-fadeIn">
      <p className="text-white text-sm">
        Sign up and get your first order.{' '}
        <a href="#" className="underline font-semibold hover:text-yellow-200 transition-colors">
          Sign Up Now
        </a>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white hover:text-gray-200 transition-colors hover:scale-110 transform"
        aria-label="Close banner"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default TopBanner

