const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');

/* GET home page */
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

module.exports = router;
