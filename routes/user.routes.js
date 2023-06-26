const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();

const User = require ("../models/User.model")


/* GET connect page SIGN UP AND LOGIN*/ 

router.get("/connect", (req, res, next) => {
    res.render("user/connect")
});

/* POST SIGN UP*/

router.post("/connect", (req,res,next) =>{
    console.log("req.body", req.body)
    const {firstname, lastname, gender, dateOfBirth, username, email, password, country, city, address} =req.body;
    bcrypt
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
        address
    })
})
    .then(userFromDB => {
        console.log("new user is", userFromDB);
        res.redirect(`/user/profile/${userFromDB.username}`)
    })
    .catch(error => next(error));

});

/* POST LOG IN*/

router.post('/connect', (req, res) => {
    console.log('req.body', req.body)
    const {email, password} = req.body;
    if(!username || !password){
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
        res.render('user/connect', user)}
        else { 
            res.render('user/connect', { errorMessage: 'Incorrect password.' });
          } 
    })
    .catch(error => next(error));
})



module.exports = router;