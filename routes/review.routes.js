const express = require('express');
const router = express.Router();

const Review = require ("../models/Review.model")
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* GET REVIEW*/

router.get("/",(req, res, next) => {
  const userLogged = req.session.currentUser ? true : false 
    res.render('review/review', { foundUser: req.session.currentUser, isLoggedIn: userLogged })
});


/* POST REVIEW*/

router.post('/', (req, res) => {
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