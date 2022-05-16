const router = require("express").Router();

///const mongoose = require("mongoose");

const moment = require("moment");

// Require the User model in order to interact with the database
//const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

const Place = require("../models/Place.model");
const Trip = require("../models/Trip.model");
const Activity = require("../models/Activity.model");

router.get("/trip-overview/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    // .populate('dayActivities')
    .then((places) => {
      res.render("trips/trip-overview", { places, user: req.session.user });
    })
    .catch((err) => next(err));
});

module.exports = router;
