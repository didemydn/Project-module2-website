const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* GET home page (for everybody)*/
router.get("/", (req, res, next) => {
  Item.find()
    .then(items => {
      res.render('index', { items });
    })
    .catch(err => {
      console.error('Error fetching items:', err);
      res.render('error'); // Render an error page if there's an error fetching items
    });
});

/* GET home page (for users)*/
router.get("/connect/home",isLoggedIn, (req, res, next) => {
  Item.find()
    .then(items => {
      res.render('index', { items, isLoggedIn: true });
    })
    .catch(err => {
      console.error('Error fetching items:', err);
      res.render('error'); // Render an error page if there's an error fetching items
    });
});

/* GET item details page*/

router.get('/details/:itemId', (req, res) => {
  const userLogged = req.session.currentUser ? true : false 
  console.log(req.session);
  const { itemId } = req.params;
  Item.findById(itemId)
    .then(foundItem => {
      console.log('foundItem', foundItem); 
      res.render('item/all-item-details', { foundItem, isLoggedIn: userLogged });
    })
    .catch(error => { next(error);});
});

module.exports = router;
