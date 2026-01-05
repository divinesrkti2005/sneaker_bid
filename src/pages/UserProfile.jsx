import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function UserProfile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Fetch user from local storage
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        console.log('Stored User:', storedUser); // Debugging

        if (!token || !storedUser) {
            navigate('/login')
            return
        }

        try {
            const parsedUser = JSON.parse(storedUser)

            // Validate user structure
            if (typeof parsedUser === 'object' && parsedUser !== null && parsedUser.name) {
                setUser(parsedUser)
            } else {
                console.error('Invalid user data structure:', parsedUser)
                // Don't loop, just clear and redirect
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/login')
            }
        } catch (error) {
            console.error('Error parsing user data:', error)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
        }
    }, [navigate])

    if (!user) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-secondary/50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fadeIn">
                        <div className="h-48 bg-gradient-to-r from-primary via-primary-dark to-primary"></div>
                        <div className="relative px-8 pb-8">
                            <div className="flex flex-col sm:flex-row items-end -mt-16 sm:-mt-24 mb-6 gap-6">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white bg-white p-1 shadow-lg">
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-4xl sm:text-5xl">
                                        👤
                                    </div>
                                </div>
                                <div className="flex-1 text-center sm:text-left mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                                <div className="flex gap-3 mb-4 sm:mb-0">
                                    <Link to="/profile/edit" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-all hover:scale-105 active:scale-95">
                                        Edit Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            localStorage.removeItem('user');
                                            navigate('/login');
                                        }}
                                        className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats Cards */}
                        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            {[
                                { title: 'Active Bids', value: '0', icon: '🔨', color: 'bg-blue-50 text-blue-600' },
                                { title: 'Auctions Won', value: '0', icon: '🏆', color: 'bg-yellow-50 text-yellow-600' },
                                { title: 'Total Spent', value: '$0.00', icon: '💰', color: 'bg-green-50 text-green-600' },
                            ].map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-default">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Left Column - Menu */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Menu</h3>
                                <nav className="space-y-1">
                                    {[
                                        { label: 'Dashboard', active: true, icon: '📊' },
                                        { label: 'Bidding History', active: false, icon: '🕒' },
                                        { label: 'Purchase History', active: false, icon: '🛍️' },
                                        { label: 'Start Selling', active: false, icon: '🏷️', link: '/sell' },
                                        { label: 'Settings', active: false, icon: '⚙️' },
                                    ].map((item, index) => (
                                        item.link ? (
                                            <Link
                                                key={index}
                                                to={item.link}
                                                className="w-full flex items-center px-4 py-3 text-left font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                                            >
                                                <span className="mr-3">{item.icon}</span>
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <button
                                                key={index}
                                                className={`w-full flex items-center px-4 py-3 text-left font-medium rounded-lg transition-colors ${item.active
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                                    }`}
                                            >
                                                <span className="mr-3">{item.icon}</span>
                                                {item.label}
                                            </button>
                                        )
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                                    <button className="text-sm text-primary hover:underline font-medium">View All</button>
                                </div>
                                <div className="p-8 text-center text-gray-500">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                        📭
                                    </div>
                                    <p className="text-lg font-medium text-gray-900 mb-1">No activity yet</p>
                                    <p className="text-sm">Start bidding on auctions to see your activity here.</p>
                                    <Link to="/auctions" className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                        Browse Auctions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default UserProfile
