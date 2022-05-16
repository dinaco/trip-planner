const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
  {
    cityName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    accomodation: {
      name: { type: String },
      type: { type: String },
      coordinates: [Number],
    },
    cityLocation: {
      type: { type: String },
      coordinates: [Number],
    },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Trip", tripSchema);
