const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();

const User = require ("../models/User.model")

/* GET connect page*/

router.get("/connect", (req, res, next) => {
    res.render("user/connect")
});

/* POST */

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

module.exports = router;