const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  date: Date,
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});

module.exports = model("Activity", activitySchema);
//GeoJSON
/*  {
   type: 'Point',
   coordinates: [lng, lat]
 } */
