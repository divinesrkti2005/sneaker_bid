import MainLayout from '../layouts/MainLayout'

function AddressInformation() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <span className="text-gray-600">Sell &gt; Account</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Address Information
          </h1>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Country*
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Pakistan</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select State*
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select State</option>
                  <option>Punjab</option>
                  <option>Sindh</option>
                  <option>KPK</option>
                  <option>Balochistan</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Area*
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select Area</option>
                  <option>Area 1</option>
                  <option>Area 2</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Complete Address*
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter complete address here"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default AddressInformation


