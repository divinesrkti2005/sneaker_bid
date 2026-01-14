const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createPayment,
    verifyPayment,
    getUserPayments,
    getPaymentById
} = require('../controllers/paymentController');

// Protected routes
router.post('/', auth, createPayment);
router.post('/verify', verifyPayment); // Public for payment gateway callbacks
router.get('/user', auth, getUserPayments);
router.get('/:id', auth, getPaymentById);

module.exports = router;
