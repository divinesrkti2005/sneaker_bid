const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sortBy } = req.query;
        
        // Build query
        let query = {};
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) {
            query.categories = { $in: [category] };
        }
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        
        // Build sort
        let sort = {};
        if (sortBy === 'price-low') {
            sort.price = 1;
        } else if (sortBy === 'price-high') {
            sort.price = -1;
        } else if (sortBy === 'newest') {
            sort.createdAt = -1;
        } else {
            sort.createdAt = -1; // Default: newest first
        }
        
        const products = await Product.find(query)
            .populate('seller', 'name email')
            .sort(sort);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'name email');
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            seller: req.user.id
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get user products
// @route   GET /api/products/user
// @access  Private
const getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id })
            .sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check if user owns the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).populate('seller', 'name email');

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check if user owns the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        await Product.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getUserProducts,
    updateProduct,
    deleteProduct
};
