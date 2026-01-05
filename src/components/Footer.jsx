function Footer() {
  return (
    <footer className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-bold">
                <span className="text-primary">Sneaker</span>
                <span className="text-black">-bid</span>
              </span>
              <p className="text-xs text-gray-600 mt-1">Premium Auctions</p>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Join premium sneaker auctions and find exclusive kicks to buy and sell with
              excitement!
            </p>
            <div className="flex space-x-3">
              {['Twitter', 'Facebook', 'Instagram', 'GitHub'].map(
                (social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                    aria-label={social}
                  >
                    <span className="text-xs font-bold">
                      {social === 'GitHub' ? 'GH' : social[0]}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {['About', 'Features', 'Works', 'Career'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">HELP</h3>
            <ul className="space-y-2">
              {[
                'Customer Support',
                'Delivery Details',
                'Terms & Conditions',
                'Privacy Policy',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">FAQ</h3>
            <ul className="space-y-2">
              {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              {[
                'Free eBooks',
                'Development Tutorial',
                'How to - Blog',
                'Youtube Playlist',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <p className="text-gray-600 text-sm text-center">
            Sneaker-bid © 2024, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

