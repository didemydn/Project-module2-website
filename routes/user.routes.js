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



module.exports = router;