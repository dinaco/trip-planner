const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    lastName: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email: { type: String, unique: true },

    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dinaco/image/upload/v1652452983/trip-planner-project/no-pic_d1kqun.jpg",
    },
    passwordHash: { type: String },

    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
