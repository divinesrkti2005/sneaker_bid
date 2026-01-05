import MainLayout from '../layouts/MainLayout'

function AccountInformation() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <span className="text-gray-600">Sell &gt; Account</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Account Information
          </h1>

          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name*
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                IBAN*
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter IBAN"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bank*
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select Bank</option>
                <option>Bank A</option>
                <option>Bank B</option>
                <option>Bank C</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Account Number*
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter account number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Branch code*
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter branch code"
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
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

export default AccountInformation


