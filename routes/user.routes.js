const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();



const User = require ("../models/User.model")
const Review = require ("../models/Review.model")
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');



/* GET */ 

router.get("/", (req, res, next) => {
        res.render('user/connect')
    });

// router.get("/home", isLoggedIn,(req, res, next) => {
//     res.render("index", {isLoggedIn: true})
// });

router.get("/profile", isLoggedIn, (req, res, next) => {
  if (req.session.currentUser) {
    const userId = req.session.currentUser._id;

    Review.find({ UserId: userId })
      .then((reviews) => {
        const foundUser = req.session.currentUser;
        console.log('foundUser', foundUser);
        res.render('user/profile', { foundUser, reviews, isLoggedIn: true });
      })
      .catch((error) => {
        console.log(error);
        res.render('user/profile', { isLoggedIn: false });
      });
  } else {
    res.render('user/profile', { isLoggedIn: false });
  }
});

router.get('/profile/edit', isLoggedIn, (req, res) => {
    // Render the edit profile form
    res.render('user/edit-profile', { foundUser: req.session.currentUser });
  });

 

  
/* POST SIGN UP and LOG IN*/

router.post("/", (req,res,next) =>{
    console.log("req.body", req.body)
    const {firstname, lastname, gender, dateOfBirth, username, email, password, country, city, address} =req.body;
    const action = req.body.action;
    if (action === "signup") {bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
    return User.create({
        firstname,
        lastname, 
        gender,
        dateOfBirth,
        username,
        email,
        passwordHash: hashedPassword,
        country,
        city,
        address,
    })
})
    .then(userFromDB => {
        const {email} = userFromDB;
      
        req.session.currentUser = { email }; 
        console.log("new user is", userFromDB);
        res.redirect(`/connect/home`)
    })
    .catch(error => next(error));

} else if (action === "login"){
    if(!email || !password){
        res.render('user/connect', {
            errorMessage: 'Please enter both, email and password to login'
        })
        return;
    }

    User.findOne({email})
    .then(user => {
        console.log('user', user)
        if (!user) {
            res.render('user/connect', {
                errorMessage: 'Email is not registered. Please sign up'
            })
            return;
        }
        else if (bcrypt.compareSync(password, user.passwordHash)){
        const { email } = user;
        req.session.currentUser = user;  // add property currentUser to my session
        user.loggedIn = true;
        res.redirect('/connect/home')}
        else { 
            res.render('user/connect', { errorMessage: 'Incorrect password.' });
        } 
    })
    .catch(error => next(error));
}
    else {
        res.render('user/connect', {
            errorMessage: "invalid action"
        })
    }
})

/* POST editting user profile*/

router.post('/profile/edit', isLoggedIn, (req, res) => {
    const { email, username } = req.body; // Update the user's profile details in the database
    User.findOneAndUpdate(
      { _id: req.session.currentUser._id },
      { email, username },
      { new: true }
    )
      .then(updatedUser => {
        req.session.currentUser = updatedUser; // Update the session with the new user details
        res.redirect('/connect/profile');
      })
      .catch(err => {
        console.log(err);
        res.render('user/edit-profile', {
          errorMessage: 'Failed to update profile. Please try again.',
          foundUser: req.session.currentUser
        });
      });
  });

/* POST DELETE*/

  router.post('/profile/delete', isLoggedIn, (req, res) => {
    // Delete the user's profile from the database
    User.findOneAndDelete({ _id: req.session.currentUser._id })
      .then(() => {
        // Destroy the session and redirect to the homepage
        req.session.destroy(err => {
          if (err) {
            console.log(err);
          }
          res.redirect('/');
        });
      })
      .catch(err => {
        console.log(err);
        res.render('user/profile', {
          errorMessage: 'Failed to delete profile. Please try again.',
          foundUser: req.session.currentUser
        });
      });
  });




  /* POST LOGOUT*/

router.post('/logout', isLoggedIn, (req,res) =>{
  req.session.currentUser = null;
    req.session.destroy(err => {
      if (err) console.log(err);
      res.redirect('/');
    });
  })
  

module.exports = router;