import API_URL from '../config/api';

const getProductBids = async (productId) => {
    const response = await fetch(`${API_URL}/bids/product/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch bids');
    }
    return response.json();
};

const placeBid = async (productId, amount) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify({ productId, amount })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to place bid');
    }
    return data;
};

const getUserBids = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/bids/user`, {
        headers: {
            'x-auth-token': token
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user bids');
    }
    return response.json();
};

const bidService = {
    getProductBids,
    placeBid,
    getUserBids
};

export default bidService;
