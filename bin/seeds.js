const mongoose = require("mongoose");
const User = require("../models/User.model");
const Trip = require("../models/Trip.model");
const DayActivity = require("../models/DayActivity.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/library-project";

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

const dayActivitiesList = [
  {
    date: "2022-05-16T00:00:00.000+00:00",
    activities: [
      {
        name: "Museum",
        location: {
          type: { type: String },
          coordinates: [Number],
        },
      },
      {
        name: "Surf",
        location: {
          type: { type: String },
          coordinates: [Number],
        },
      },
      {
        name: "Shop",
        location: {
          type: { type: String },
          coordinates: [Number],
        },
      },
    ],
  },
];

DayActivity.create(dayActivitiesList)
  .then((list) => {
    console.log(`Created ${list.length} in the DB`);
    mongoose.disconnect(() => console.log("Disconnected from the db"));
  })
  .catch((err) => console.log(err));
