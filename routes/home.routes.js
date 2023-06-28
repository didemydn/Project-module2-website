const express = require('express');
const router = express.Router();

const User = require ("../models/User.model")

router.get("/home", (req, res, next) => {
    res.render("user/home")
});

module.exports = router;