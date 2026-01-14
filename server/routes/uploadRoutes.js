const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/multer');

// @desc    Upload product images
// @route   POST /api/upload/images
// @access  Private
router.post('/images', auth, upload.array('images', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: 'No files uploaded' });
        }

        // Return file URLs
        const fileUrls = req.files.map(file => {
            return `/uploads/${file.filename}`;
        });

        res.json({
            success: true,
            images: fileUrls
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
