const router = require("express").Router();

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  const { user } = req.session;
  res.render("profile/main", { user });
});

module.exports = router;
