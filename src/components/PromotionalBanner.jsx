function PromotionalBanner() {
  return (
    <div className="bg-gradient-to-r from-primary via-primary-dark to-primary py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="text-4xl animate-pulse-slow">🔥</div>
            <div>
              <h3 className="text-xl font-bold">Flash Sale Ending Soon!</h3>
              <p className="text-sm text-gray-200">Limited time offers on premium sneakers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold text-yellow-300">24</div>
              <div className="text-xs text-gray-200">Hours</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold text-yellow-300">45</div>
              <div className="text-xs text-gray-200">Minutes</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold text-yellow-300">12</div>
              <div className="text-xs text-gray-200">Seconds</div>
            </div>
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromotionalBanner


