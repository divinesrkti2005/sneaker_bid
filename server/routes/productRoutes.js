const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllProducts,
    createProduct,
    getUserProducts
} = require('../controllers/productController');

// Public routes
router.get('/', getAllProducts);

// Protected routes
router.post('/', auth, createProduct);
router.get('/user', auth, getUserProducts);

module.exports = router;
