const mongoose = require("mongoose");
const User = require("../models/User.model");
const Trip = require("../models/Trip.model");
const DayActivity = require("../models/DayActivity.model");
const MONGO_URI = require("../utils/consts");

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const hawaiTrip = {
  cityName: "Madrid, test trip",
  startDate: "2022-05-16T00:00:00.000+00:00",
  endDate: "2022-05-16T00:00:00.000+00:00",
};
const dayActivitiesList = [
  {
    date: "2022-05-16T00:00:00.000+00:00",
    activities: [
      {
        name: "Museum",
        location: {
          type: "Point",
          coordinates: [40.4122618, -3.7041417],
        },
      },
      {
        name: "Retiro",
        location: {
          type: "Point",
          coordinates: [40.4113349, -3.6749081],
        },
      },
      {
        name: "Prado",
        location: {
          type: "Point",
          coordinates: [40.415609, -3.6913706],
        },
      },
    ],
  },
];

Trip.create(hawaiTrip)
  .then((createdTrip) => {
    return User.findByIdAndUpdate("62821eaebcb5ca3b9d4aef53", {
      $push: { trips: createdTrip._id },
    });
  })
  .then((result) => console.log(result))
  .catch((err) => next(err));

//DayActivity.create(dayActivitiesList).then((createdAct) => return Trip.findByIdAndUpdate((), { $push: { DayActivity: dayActivitiesList._id}})))
