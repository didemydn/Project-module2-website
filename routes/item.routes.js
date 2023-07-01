const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Item = require('../models/Item.model');
const { isLoggedIn } = require('../middleware/route-guard');

router.get("/donate", isLoggedIn,(req, res, next) => {
    res.render("item/donate", {isLoggedIn: true})
});

// Handle the POST request to submit the "donate" form
router.post('/donate', [
    body('title').notEmpty().withMessage('Title is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('size').notEmpty().withMessage('Size is required'),
    body('condition').notEmpty().withMessage('Condition is required'),
    body('location').notEmpty().withMessage('Location is required'),
    // Email OR phone verification:
    body('email')
        .notEmpty().withMessage('Email is required')
        .if(body('phone').not().notEmpty())
        .withMessage('Either email or phone is required'),
    body('phone')
        .notEmpty().withMessage('Phone is required')
        .if(body('email').not().notEmpty())
        .withMessage('Either email or phone is required'),
    body('picture').notEmpty().withMessage('Picture is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('donate', { errors: errors.array() });
    }

    // Creating a new item in the database
    const { title, category, type, size, condition, location, email, phone, picture } = req.body;
    const newItem = new Item({
        title,
        category,
        type,
        size,
        condition,
        location,
        email,
        phone,
        picture
    });

    // Save the item to the database
    newItem.save((err) => {
        if (err) {
        return res.status(500).json({ error: 'Failed to save the item' });
        }

        return res.redirect('/success'); // Redirect to a success page or desired route
    });
});

module.exports = router;