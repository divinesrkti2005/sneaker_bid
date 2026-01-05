import API_URL from '../config/api';

const getAllProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

const createProduct = async (productData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to create product');
    }
    return data;
};

const getUserProducts = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products/user`, {
        headers: {
            'x-auth-token': token
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user products');
    }
    return response.json();
};

const productService = {
    getAllProducts,
    createProduct,
    getUserProducts
};

export default productService;
