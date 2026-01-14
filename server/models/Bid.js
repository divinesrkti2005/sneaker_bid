const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add a bid amount']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
bidSchema.index({ product: 1, createdAt: -1 });
bidSchema.index({ bidder: 1 });

module.exports = mongoose.model('Bid', bidSchema);
