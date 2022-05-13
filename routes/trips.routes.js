const router = require("express").Router();

const mongoose = require("mongoose");

const moment = require("moment");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

const Place = require("../models/Place.model");
const Trip = require("../models/Trip.model");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  Trip.find()
    .then((trips) => {
      trips.forEach((e) => {
        e.formatStartDate = moment(e.startDate).format("DD/MM/YYYY");
        e.formatEndDate = moment(e.endDate).format("DD/MM/YYYY");
      });
      res.render("trips/main", { trips });
    })
    .catch((err) => next(err));
});

router.post("/create", isLoggedIn, (req, res, next) => {
  const { cityName, startDate, endDate, accomodation } = req.body;
  Trip.create({
    cityName,
    cityId: 1,
    startDate,
    endDate,
    "accomodation.name": accomodation,
    location: {
      type: "Point",
      coordinates: [1, 1],
    },
  })
    .then(() => res.redirect("/trips"))
    .catch((err) => next(err));
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

router.post("/delete/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Trip.findByIdAndRemove(id)
    .then(() => res.redirect("/trips"))
    .catch((err) => next(err));
});

module.exports = router;
