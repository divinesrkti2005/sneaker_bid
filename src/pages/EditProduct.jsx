import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import productService from '../services/productService'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    images: [],
    deliveryOptions: ['Online payment'],
    shippingTime: '',
    auctionDuration: '7',
  })

  const steps = [
    { id: 1, name: 'Description', icon: '✏️' },
    { id: 2, name: 'Categories', icon: '🏷️' },
    { id: 3, name: 'Photos', icon: '📷' },
    { id: 4, name: 'Delivery', icon: '📦' },
  ]

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const data = await productService.getProductById(id)
      setFormData({
        name: data.name || '',
        description: data.description || '',
        price: data.price || '',
        categories: data.categories || [],
        images: data.images || [],
        deliveryOptions: data.deliveryOptions || ['Online payment'],
        shippingTime: data.shippingTime ? new Date(data.shippingTime).toISOString().split('T')[0] : '',
        auctionDuration: data.endTime ? calculateDuration(data.endTime) : '7',
      })
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Failed to load product')
      navigate('/sell/dashboard')
    } finally {
      setFetching(false)
    }
  }

  const calculateDuration = (endTime) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff.toString() : '7'
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
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
      // Calculate end time based on auction duration
      const endTime = new Date()
      endTime.setDate(endTime.getDate() + parseInt(formData.auctionDuration || 7))
      
      const productData = {
        ...formData,
        endTime: endTime.toISOString(),
        price: parseFloat(formData.price)
      }
      
      await productService.updateProduct(id, productData)
      navigate('/sell/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to update product')
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading product...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <span className="text-gray-600">Sell &gt; Edit Product</span>
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
                  value={formData.categories[0] || ''}
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
                Product Photos
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Images (Max 5 images, 5MB each)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files).slice(0, 5)
                      if (files.length === 0) return
                      
                      try {
                        const uploadedUrls = await productService.uploadImages(files)
                        updateFormData('images', [...formData.images, ...uploadedUrls])
                        e.target.value = ''
                      } catch (error) {
                        alert(error.message || 'Failed to upload images')
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateFormData('images', formData.images.filter((_, i) => i !== index))
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Auction Duration (Days)
                </label>
                <select
                  name="auctionDuration"
                  value={formData.auctionDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                </select>
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
              {loading ? 'Saving...' : step === 4 ? 'Update Product' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default EditProduct
