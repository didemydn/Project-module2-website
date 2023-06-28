const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();



const User = require ("../models/User.model")
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');



/* GET */ 

router.get("/",isLoggedOut, (req, res, next) => {
    if(req.session.currentUser){
        res.render('user/connect', {loggedIn: true})
      }
      else{
        res.render('user/connect')
      }
        
    });

router.get("/home", (req, res, next) => {
    res.render("user/home")
});

router.get("/profile",isLoggedIn, (req, res, next) => { 
    
    if(req.session.currentUser){
    User.findOne({ email: req.session.currentUser.email })
     .then(foundUser => {
         console.log('foundUser', foundUser)
         foundUser.loggedIn = true; // adding a property loggedIn and setting it to true
         res.render('user/profile', {foundUser});
     })
     .catch(err => {
        console.log(err);
        res.render('user/profile')
     })
 }
 else{
   res.render('user/profile')
 }
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
        req.session.currentUser = { email: user.email };  // add property currentUser to my session
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

router.post('/logout', isLoggedIn, (req,res) =>{
    req.session.destroy(err => {
      if (err) console.log(err);
      res.redirect('/');
    });
  })
  

module.exports = router;