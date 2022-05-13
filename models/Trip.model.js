const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
  {
    cityName: { type: String, required: true },
    cityId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    accomodation: {
      name: { type: String },
      type: { type: String },
      coordinates: [Number],
      dayActivities: [{ type: Schema.Types.ObjectId, ref: "dayActivity" }],
    },
    location: {
      type: { type: String },
      coordinates: [Number],
      dayActivities: [{ type: Schema.Types.ObjectId, ref: "dayActivity" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Trip", tripSchema);
