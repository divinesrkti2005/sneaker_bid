const Bid = require('../models/Bid');
const Product = require('../models/Product');

// @desc    Get all bids for a product
// @route   GET /api/bids/product/:productId
// @access  Public
const getProductBids = async (req, res) => {
    try {
        const bids = await Bid.find({ product: req.params.productId })
            .populate('bidder', 'name email')
            .sort({ createdAt: -1 });
        res.json(bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Place a bid
// @route   POST /api/bids
// @access  Private
const placeBid = async (req, res) => {
    try {
        const { productId, amount } = req.body;

        // Validate input
        if (!productId || !amount) {
            return res.status(400).json({ msg: 'Please provide product ID and bid amount' });
        }

        if (amount <= 0) {
            return res.status(400).json({ msg: 'Bid amount must be greater than 0' });
        }

        // Get product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check if user is the seller
        if (product.seller.toString() === req.user.id) {
            return res.status(400).json({ msg: 'You cannot bid on your own product' });
        }

        // Get current highest bid
        const highestBid = await Bid.findOne({ product: productId })
            .sort({ amount: -1 });

        // Check if bid is higher than current highest bid or starting price
        const minimumBid = highestBid ? highestBid.amount : product.price;
        if (amount <= minimumBid) {
            return res.status(400).json({ 
                msg: `Bid must be higher than Rs.${minimumBid}` 
            });
        }

        // Create bid
        const bid = new Bid({
            product: productId,
            bidder: req.user.id,
            amount: amount
        });

        await bid.save();

        // Update product bid count
        const bidCount = await Bid.countDocuments({ product: productId });
        product.bids = bidCount;
        await product.save();

        // Populate bidder info for response
        await bid.populate('bidder', 'name email');

        res.json(bid);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get user's bids
// @route   GET /api/bids/user
// @access  Private
const getUserBids = async (req, res) => {
    try {
        const bids = await Bid.find({ bidder: req.user.id })
            .populate('product', 'name price images')
            .sort({ createdAt: -1 });
        res.json(bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getProductBids,
    placeBid,
    getUserBids
};
