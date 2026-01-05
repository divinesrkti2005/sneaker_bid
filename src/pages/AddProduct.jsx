import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import productService from '../services/productService'

function AddProduct() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&h=400'], // Default image for now
    deliveryOptions: ['Online payment'],
    shippingTime: '',
  })

  const steps = [
    { id: 1, name: 'Description', icon: '✏️' },
    { id: 2, name: 'Categories', icon: '🏷️' },
    { id: 3, name: 'Photos', icon: '📷' },
    { id: 4, name: 'Delivery', icon: '📦' },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      // Handle array updates for checkboxes if needed, or simple boolean
      // For delivery options:
      if (name === 'deliveryOptions') {
        const updatedOptions = checked
          ? [...formData.deliveryOptions, value]
          : formData.deliveryOptions.filter(opt => opt !== value)
        setFormData({ ...formData, deliveryOptions: updatedOptions })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // Custom handler for simple non-event updates
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      await productService.createProduct(formData)
      navigate('/sell/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to create product')
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <span className="text-gray-600">Sell &gt; Add Product</span>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= s.id
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                      }`}
                  >
                    {step > s.id ? '✓' : s.icon}
                  </div>
                  <span
                    className={`mt-2 text-sm ${step >= s.id ? 'text-primary font-semibold' : 'text-gray-400'
                      }`}
                  >
                    {s.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${step > s.id ? 'bg-primary' : 'bg-gray-300 border-dashed border-t-2'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Product Description
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description*
                  </label>
                  <textarea
                    rows={6}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product description"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Starting Price*
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter starting price"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Select category
              </h2>
              <div className="mb-6">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                  onChange={(e) => updateFormData('categories', [e.target.value])}
                >
                  <option value="">Select Category</option>
                  <option value="Sneakers">Sneakers</option>
                  <option value="Running">Running</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>

                <div className="flex flex-wrap gap-2">
                  {formData.categories.map(cat => (
                    <span key={cat} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add product photos
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                <p className="text-center text-gray-500 mb-4">Image upload not yet implemented. Using default placeholders.</p>
                <div className="flex items-center justify-center">
                  <div className="text-4xl">📷</div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select delivery options
              </h2>
              <div className="space-y-4 mb-6">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary">
                  <input
                    type="checkbox"
                    name="deliveryOptions"
                    value="Self pickup"
                    checked={formData.deliveryOptions.includes('Self pickup')}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span>Self pickup</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary">
                  <input
                    type="checkbox"
                    name="deliveryOptions"
                    value="Online payment"
                    checked={formData.deliveryOptions.includes('Online payment')}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span>Online payment</span>
                </label>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Shipping time
                </label>
                <input
                  type="date"
                  name="shippingTime"
                  value={formData.shippingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : step === 4 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AddProduct


