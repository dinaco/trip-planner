const router = require("express").Router();

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

const Place = require("../models/Place.model");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("trips/main");
});

router.get("/trip-details", isLoggedIn, (req, res, next) => {
  Place.find()
    .then((places) => res.render("trips/trip-details/main", { places }))
    .catch((err) => next(err));
});

router.post("/trip-details/create", isLoggedIn, (req, res, next) => {
  const { name, description, latitude, longitude } = req.body;

  Place.create({
    name,
    description,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  })
    .then(() => res.redirect("/trips/trip-details"))
    .catch((err) => next(err));
});

module.exports = router;
