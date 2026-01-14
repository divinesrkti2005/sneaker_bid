const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getProductBids,
    placeBid,
    getUserBids
} = require('../controllers/bidController');

// Public routes
router.get('/product/:productId', getProductBids);

// Protected routes
router.post('/', auth, placeBid);
router.get('/user', auth, getUserBids);

module.exports = router;
