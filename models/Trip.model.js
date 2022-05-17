const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
  {
    cityName: { type: String, required: true },
    startDate: { type: Date, required: true },
    formatStartDate: String,
    endDate: { type: Date, required: true },
    formatEndDate: String,
    accomodation: {
      name: { type: String },
      type: { type: String },
      coordinates: [Number],
    },
    cityLocation: {
      type: { type: String },
      coordinates: [Number],
    },
    days: [{ type: Schema.Types.ObjectId, ref: "Day" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Trip", tripSchema);
