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

const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
};

const updateProduct = async (id, productData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to update product');
    }
    return data;
};

const deleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': token
        }
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Failed to delete product');
    }
    return true;
};

const uploadImages = async (files) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
        formData.append('images', file);
    });

    const response = await fetch(`${API_URL}/upload/images`, {
        method: 'POST',
        headers: {
            'x-auth-token': token
        },
        body: formData
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to upload images');
    }
    return data.images;
};

const productService = {
    getAllProducts,
    createProduct,
    getUserProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadImages
};

export default productService;
