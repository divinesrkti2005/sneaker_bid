function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark w-full py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase text-center lg:text-left animate-fadeIn">
            STAY UPTO DATE ABOUT OUR LATEST AUCTIONS
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="block w-full pl-10 pr-3 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg"
              />
            </div>
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg whitespace-nowrap">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

