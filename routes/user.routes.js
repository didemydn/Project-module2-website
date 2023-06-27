const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();

const User = require ("../models/User.model")


/* GET connect page SIGN UP AND LOGIN*/ 

router.get("/", (req, res, next) => {
    res.render("user/connect")
});

/* POST SIGN UP*/

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
        address
    })
})
    .then(userFromDB => {
        console.log("new user is", userFromDB);
        res.redirect(`user/profile/${userFromDB.username}`)
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
        res.render('user/profile', {email})}
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



module.exports = router;