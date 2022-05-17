const { Schema, model } = require("mongoose");

const daySchema = new Schema(
  {
    date: { type: Date, required: true },
    formatDate: String,
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Day", daySchema);
