const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const User = require ("../models/User.model")
const Review = require ("../models/Review.model")
const upload = require('../config/cloudinary.config');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');
const { ObjectId } = require('mongodb');

// GET Routes

// Donate
router.get('/donate', (req, res) => {
  const userLogged = req.session.currentUser ? true : false 
  res.render('item/donate', {isLoggedIn: userLogged}); 
});

// My donations

router.get('/connect/mydonations', (req, res) => {
  const userLogged = req.session.currentUser ? true : false 
  const UserId = req.session.currentUser._id;
  console.log("UserID: ", UserId)
    Item.find({UserId: new ObjectId(UserId)})
    .then((itemsFromDB) => res.render("item/donations", { item: itemsFromDB, isLoggedIn: userLogged }))
    .catch((err) => console.log(`Error while getting items from the DB: ${err}`));
});

// My favorite items

router.get('/connect/favorite', (req, res) => {
  const userLogged = req.session.currentUser ? true : false;
    res.render('item/favorite-items', {isLoggedIn: userLogged}); 
  });

 // my Item details

 
router.get('/connect/mydonations/:itemId',isLoggedIn, (req, res, next) => {
const userLogged = req.session.currentUser ? true : false;
const { itemId } = req.params;
Item.findById(itemId)
.then(foundItem => {
 console.log('foundItem', foundItem); 
 res.render('item/item-details', { foundItem, isLoggedIn: userLogged  });
 })
  .catch(error => { next(error);});
}); 

  //Edit Item details

  router.get('/connect/mydonations/:itemId/edit', isLoggedIn, (req, res, next) => {
    const userLogged = req.session.currentUser ? true : false;
    const { itemId } = req.params;
    Item.findById(itemId)        
    .then(itemToEdit  => {
      console.log('itemToEdit', itemToEdit);
     res.render('item/edit-item', { item: itemToEdit, isLoggedIn: userLogged });
    })
   .catch(error => {
    next(error);
    });
  });

// POST donate form
router.post('/donate', upload.single('picture'), async (req, res) => {
    try {
        const { title, category, type, size, condition, location, email, phone } = req.body;
        const picture = req.file.path;
        const UserId = req.session.currentUser._id;

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
        picture,
        UserId
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

router.post('/connect/mydonations/:itemId/edit', upload.single('picture'), (req, res) => {
  
    const { itemId } = req.params;
    const { title, category, type, size, condition, location, email, phone } = req.body; 
    const picture = req.file.path;
      
  Item.findByIdAndUpdate(itemId, { title, category, type, size, condition, location, email, phone, picture }, { new: true })
    .then(updatedItem => res.redirect(`/connect/mydonations/${updatedItem._id}`)) // go to the details page to see the updates
    .catch(error => next(error));
});

// DELETE item 

router.post('/connect/mydonations/:itemId/delete', (req, res, next) => {
    const { itemId } = req.params;
    Item.findOneAndDelete({ _id: itemId })
        .then(deletedItem => {
            console.log('Deleted item:', deletedItem);
            res.redirect('/connect/mydonations');
    })
        .catch(error => {next(error); });
});

module.exports = router;