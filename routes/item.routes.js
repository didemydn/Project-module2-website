const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const upload = require('../config/cloudinary.config');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

// GET Routes

router.get('/donate', (req, res) => {
  res.render('item/donate'); 
});

router.get('/connect/mydonations', (req, res) => {
    Item.find()
    .then((itemsFromDB) => res.render("item/donations", { item: itemsFromDB }))
    .catch((err) => console.log(`Error while getting items from the DB: ${err}`));
});
  

router.get('/connect/favorite', (req, res) => {
    res.render('item/favorite-items'); 
  });

router.get('/donate/edit', (req, res) => {
    res.render('item/edit-item'); 
  });
 


// POST donate form
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

// EDIT item

router.post('/donate/edit', isLoggedIn, (req, res) => {
    const { title, category, type, size, condition, location, email, phone } = req.body; // Update the user's profile details in the database
    Item.findOneAndUpdate(
      { _id: req.session.currentUser._id },
      { title, category, type, size, condition, location, email, phone },
      { new: true }
    )
      .then(updatedItem => {
        req.session.currentUser = updatedItem; // Update the session with the new user details
        res.redirect('/connect/profile');
      })
      .catch(err => {
        console.log(err);
        res.render('item/edit-item', {
          errorMessage: 'Failed to update the item. Please try again.',
          
        });
      });
  });

// DELETE item 

module.exports = router;