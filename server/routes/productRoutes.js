const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllProducts,
    getProductById,
    createProduct,
    getUserProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);
router.get('/user', auth, getUserProducts);

module.exports = router;
