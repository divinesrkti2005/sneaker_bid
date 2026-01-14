import API_URL from '../config/api';

const createPayment = async (paymentData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify(paymentData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to create payment');
    }
    return data;
};

const verifyPayment = async (paymentId, transactionId, status) => {
    const response = await fetch(`${API_URL}/payments/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentId, transactionId, status })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to verify payment');
    }
    return data;
};

const getUserPayments = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/payments/user`, {
        headers: {
            'x-auth-token': token
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch payments');
    }
    return response.json();
};

const getPaymentById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/payments/${id}`, {
        headers: {
            'x-auth-token': token
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch payment');
    }
    return response.json();
};

const paymentService = {
    createPayment,
    verifyPayment,
    getUserPayments,
    getPaymentById
};

export default paymentService;
