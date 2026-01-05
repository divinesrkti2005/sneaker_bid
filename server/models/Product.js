const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a starting price']
    },
    categories: {
        type: [String],
        default: []
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    },
    deliveryOptions: {
        type: [String],
        default: []
    },
    shippingTime: {
        type: Date
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bids: {
        type: Number,
        default: 0
    },
    endTime: {
        type: Date,
        required: false // Optional for now, or calculate based on duration
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
