const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const upload = require('../config/cloudinary.config');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

// GET Routes

// Donate
router.get('/donate', (req, res) => {
  res.render('item/donate'); 
});

// My donations

router.get('/connect/mydonations', (req, res) => {
    Item.find()
    .then((itemsFromDB) => res.render("item/donations", { item: itemsFromDB }))
    .catch((err) => console.log(`Error while getting items from the DB: ${err}`));
});
  
// My favorite items

router.get('/connect/favorite', (req, res) => {
    res.render('item/favorite-items'); 
  });

 // Item details
 
  router.get('/connect/mydonations/:itemId', (req, res, next) => {
    const { itemId } = req.params;
    Item.findById(itemId)
      .then(foundItem => {
        console.log('foundItem', foundItem); 
        res.render('item/item-details', { foundItem });
      })
      .catch(error => { next(error);});
  }); 

  //Edit Item details

router.get('/connect/mydonations/:itemId/edit', (req, res, next) => {
  const { itemId } = req.params;
  Item.findById(itemId)        
  .then(itemToEdit  => {
    console.log('itemToEdit', itemToEdit);
   res.render('item/edit-item', { item: itemToEdit });
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

router.post('/connect/mydonations/:itemId/edit', isLoggedIn, (req, res) => {
    const { itemId } = req.params;
    const { title, category, type, size, condition, location, email, phone, picture } = req.body; 
  
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