const router = require("express").Router();

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

const Place = require("../models/Place.model");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  //  const { user } = req.session;
  Place.find()
    .then((places) => res.render("profile/main", { places }))
    .catch((err) => next(err));
  //  res.render("profile/main", { user });
});

router.post("/places/create", (req, res, next) => {
  const { name, description, latitude, longitude } = req.body;

  Place.create({
    name,
    description,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  })
    .then(() => res.redirect("/profile"))
    .catch((err) => next(err));
});

module.exports = router;
