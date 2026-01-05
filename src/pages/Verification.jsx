import MainLayout from '../layouts/MainLayout'

function Verification() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <span className="text-gray-600">Sell &gt; Dashboard</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Verification</h1>
          <p className="text-gray-700 text-lg">
            Please wait for your confirmation mail.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default Verification


