const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();

const User = require('../models/User.model');

/* GET Connect page */

router.get("/connect", (req, res, next) => {
    res.render('user/connect')
});

router.post("/connect", (req, res, next) => {
    console.log('req.body', req.body)
    const { username, email, password } = req.body;

    bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        username,
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect(`/`)
    })
    .catch(error => next(error));

});