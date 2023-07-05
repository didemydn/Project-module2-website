const express = require('express');
const router = express.Router();

const Review = require ("../models/Review.model")
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* GET REVIEW*/

router.get("/",  isLoggedIn,(req, res, next) => {
    res.render('review/review', { foundUser: req.session.currentUser })
});


/* POST REVIEW*/

router.post('/', isLoggedIn, (req, res) => {
    console.log("comment", req.body);
    const { comment } = req.body;
    const userId = req.session.currentUser._id;
  
    Review.create({ comment, UserId: userId })
      .then(() => {
        res.redirect('/connect/home');
      })
      .catch((error) => {
        console.log(error);
        res.redirect('/connect/home');
      });
  });


module.exports = router;