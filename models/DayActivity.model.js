const { Schema, model } = require("mongoose");

const dayActivitySchema = new Schema({
  date: Date,
  activities: [
    {
      name: String,
      location: {
        type: { type: String },
        coordinates: [Number],
      },
    },
  ],
});

module.exports = model("DayActivity", dayActivitySchema);
//GeoJSON
/*  {
   type: 'Point',
   coordinates: [lng, lat]
 } */
