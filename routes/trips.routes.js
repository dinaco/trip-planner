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
      trips.forEach((e) => {
        e.formatStartDate = moment(e.startDate).format("DD/MM/YYYY");
        e.formatEndDate = moment(e.endDate).format("DD/MM/YYYY");
      });
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
  } = req.body;
  let insertedTrip = "";
  //create the trip obj
  Trip.create({
    cityName,
    cityLocation: {
      type: "Point",
      coordinates: [cityLocationLat, cityLocationLng],
    },
    startDate,
    endDate,
    "accomodation.name": accomodation,
  })
    .then((createdTrip) => {
      // trip is created, we need to create the day "objects":
      insertedTrip = createdTrip;
      let dateArr = [];
      let dt = new Date(createdTrip.startDate);
      const endDate = new Date(createdTrip.endDate);
      while (dt <= endDate) {
        dateArr.push({ date: new Date(dt) });
        dt.setDate(dt.getDate() + 1);
      }
      // console.log(dateArr);

      return Day.insertMany(dateArr);

      /* return User.findByIdAndUpdate(req.session.user._id, {
        $push: { trips: createdTrip._id },
      }) */
    })
    .then((createdDays) => {
      console.log(`the trip id is: ${insertedTrip._id}`);
      let daysArr = createdDays.map((e) => e._id);
      console.log("daysArr is: " + daysArr);
      console.log(daysArr[0]);
      /*       for (let i = 0; i < createdDays.length; i++) {
        Trip.findByIdAndUpdate(insertedTrip._id, {
          $push: { days: createdDays[i]._id },
        });
        console.log("inserted: " + createdDays[i]._id);
        console.log("overview: " + insertedTrip.days);
      } */
      //console.log("created days is: " + createdDays);
      Trip.findByIdAndUpdate(insertedTrip._id, { $push: { days: daysArr[0] } });
    })
    .then(() => res.redirect("/trips"))
    .catch((err) => next(err));
});

router.get("/trip-details/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    .populate("activities")
    .then((trip) => {
      trip.formatStartDate = moment(trip.startDate).format("DD/MM/YYYY");
      trip.formatEndDate = moment(trip.endDate).format("DD/MM/YYYY");
      trip.dateArr = [];
      let dt = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      while (dt <= endDate) {
        trip.dateArr.push(moment(dt).format("DD/MM/YYYY"));
        dt.setDate(dt.getDate() + 1);
      }
      console.log(trip);
      res.render("trips/trip-details/main", { trip, user: req.session.user });
    })
    .catch((err) => next(err));
});

router.post("/trip-details/:id/create", isLoggedIn, (req, res, next) => {
  const { newActName, newActlLat, newActlLng } = req.body;
  const { id } = req.params;
  Activity.create({
    name: newActName,
    location: {
      type: "Point",
      coordinates: [newActlLng, newActlLat],
    },
  })
    .then((createdActivity) => {
      return Trip.findByIdAndUpdate(id, {
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
