const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const upload = require('../config/cloudinary.config');

// Route for the donate item form
router.get('/donate', (req, res) => {
  res.render('item/donate'); // Render the donate item form (donate-item.hbs)
});

// Route for handling the form submission
router.post('/donate', upload.single('picture'), async (req, res) => {
  try {
    const { title, category, type, size, condition, location, email, phone } = req.body;
    const picture = req.file.path;

    // Create a new item
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
    await newItem.save();

    res.redirect('connect/home'); // Redirect to the donate item form
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;