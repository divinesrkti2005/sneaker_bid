const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Bid = require('../models/Bid');

// @desc    Create payment
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
    try {
        const { productId, bidId, paymentMethod, shippingAddress } = req.body;

        // Get the bid
        const bid = await Bid.findById(bidId).populate('product');
        if (!bid) {
            return res.status(404).json({ msg: 'Bid not found' });
        }

        // Verify bid belongs to user
        if (bid.bidder.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        // Check if product matches
        if (bid.product._id.toString() !== productId) {
            return res.status(400).json({ msg: 'Bid does not match product' });
        }

        // Create order
        const order = new Order({
            user: req.user.id,
            product: productId,
            bid: bidId,
            amount: bid.amount,
            shippingAddress: shippingAddress || {}
        });

        await order.save();

        // Create payment
        const payment = new Payment({
            order: order._id,
            user: req.user.id,
            product: productId,
            amount: bid.amount,
            paymentMethod: paymentMethod,
            status: paymentMethod === 'COD' ? 'pending' : 'processing'
        });

        await payment.save();

        // Process payment based on method
        let paymentResult = { success: false, message: '' };

        switch (paymentMethod) {
            case 'COD':
                paymentResult = {
                    success: true,
                    message: 'Order placed. Payment on delivery.',
                    paymentId: payment._id
                };
                payment.status = 'pending';
                order.status = 'pending';
                break;

            case 'eSewa':
                // Generate eSewa payment URL (mock for now)
                paymentResult = {
                    success: true,
                    message: 'Redirect to eSewa payment',
                    paymentUrl: `https://esewa.com/payment?amount=${bid.amount}&orderId=${order._id}`,
                    paymentId: payment._id
                };
                break;

            case 'Visa':
            case 'Mastercard':
                // Mock card payment processing
                paymentResult = {
                    success: true,
                    message: 'Card payment processed',
                    transactionId: 'TXN-' + Date.now(),
                    paymentId: payment._id
                };
                payment.status = 'completed';
                payment.paidAt = new Date();
                order.status = 'paid';
                break;

            case 'Khalti':
                // Generate Khalti payment URL (mock)
                paymentResult = {
                    success: true,
                    message: 'Redirect to Khalti payment',
                    paymentUrl: `https://khalti.com/payment?amount=${bid.amount}&orderId=${order._id}`,
                    paymentId: payment._id
                };
                break;

            default:
                return res.status(400).json({ msg: 'Invalid payment method' });
        }

        await payment.save();
        await order.save();

        res.json({
            ...paymentResult,
            order: order,
            payment: payment
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Verify payment (for eSewa, Khalti callbacks)
// @route   POST /api/payments/verify
// @access  Public
const verifyPayment = async (req, res) => {
    try {
        const { paymentId, transactionId, status } = req.body;

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        if (status === 'success') {
            payment.status = 'completed';
            payment.transactionId = transactionId;
            payment.paidAt = new Date();

            const order = await Order.findById(payment.order);
            if (order) {
                order.status = 'paid';
                await order.save();
            }
        } else {
            payment.status = 'failed';
        }

        await payment.save();
        res.json({ success: true, payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get user payments
// @route   GET /api/payments/user
// @access  Private
const getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id })
            .populate('product', 'name images price')
            .populate('order')
            .sort({ createdAt: -1 });
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('product', 'name images price')
            .populate('order')
            .populate('user', 'name email');

        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        // Check if user owns this payment
        if (payment.user._id.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createPayment,
    verifyPayment,
    getUserPayments,
    getPaymentById
};
