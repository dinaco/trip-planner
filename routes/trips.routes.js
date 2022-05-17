const router = require("express").Router();

///const mongoose = require("mongoose");

const moment = require("moment");

// Require the User model in order to interact with the database
//const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

const Activity = require("../models/Activity.model");
const Trip = require("../models/Trip.model");
const User = require("../models/User.model");
const Day = require("../models/Day.model");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  Trip.find()
    .then((trips) => {
      res.render("trips/main", { trips, user: req.session.user });
    })
    .catch((err) => next(err));
});

router.post("/create", isLoggedIn, (req, res, next) => {
  const {
    cityName,
    cityLocationLat,
    cityLocationLng,
    startDate,
    endDate,
    accomodation,
    photoUrl,
  } = req.body;
  let dateArr = [];
  let dt = new Date(startDate);
  const lastDate = new Date(endDate);
  while (dt <= lastDate) {
    dateArr.push({
      date: new Date(dt),
      formatDate: moment(dt).format("DD/MM/YYYY"),
    });
    dt.setDate(dt.getDate() + 1);
  }

  return (
    Day.insertMany(dateArr)
      //create the trip obj
      .then((createdDays) => {
        const daysArr = createdDays.map((e) => e._id);
        return Trip.create({
          cityName,
          cityLocation: {
            type: "Point",
            coordinates: [cityLocationLat, cityLocationLng],
          },
          startDate,
          formatStartDate: moment(startDate).format("DD/MM/YYYY"),
          endDate,
          formatEndDate: moment(endDate).format("DD/MM/YYYY"),
          "accomodation.name": accomodation,
          days: daysArr,
          photoUrl,
        });
      })
      .then((createdTrip) => {
        return User.findByIdAndUpdate(req.session.user._id, {
          $push: { trips: createdTrip._id },
        });
      })
      .then(() => {
        res.redirect("/trips");
      })
      .catch((err) => next(err))
  );
});

router.get("/trip-details/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    .populate({
      path: "days",
      model: Day,
      populate: {
        path: "activities",
        model: Activity,
      },
    })
    .then((trip) => {
      res.render("trips/trip-details/main", { trip, user: req.session.user });
    })
    .catch((err) => next(err));
});

router.post("/trip-details/:id/create", isLoggedIn, (req, res, next) => {
  const { newActName, newActlLat, newActlLng, dateId } = req.body;
  const { id } = req.params;
  return Activity.create({
    name: newActName,
    location: {
      type: "Point",
      coordinates: [newActlLng, newActlLat],
    },
  })
    .then((createdActivity) => {
      return Day.findByIdAndUpdate(dateId, {
        $push: { activities: createdActivity._id },
      });
    })
    .then(() => res.redirect(`/trips/trip-details/${id}`))
    .catch((err) => next(err));
});

router.post(
  "/trip-details/:id/delete/:tripid",
  isLoggedIn,
  (req, res, next) => {
    const { id, tripid } = req.params;
    Activity.findByIdAndRemove(id)
      /*     .then((deleteActivity) => {
      return Trip.findByIdAndUpdate(id, {
        $push: { activities: createdActivity._id },
      })
    }) */
      .then(() => res.redirect(`/trips/trip-details/${tripid}`))
      .catch((err) => next(err));
  }
);

router.post("/delete/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Trip.findByIdAndRemove(id)
    .then(() => res.redirect("/trips"))
    .catch((err) => next(err));
});

module.exports = router;
