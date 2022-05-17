const router = require("express").Router();

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  /* const { firstName, lastName, email, profileImage } = req.session.user; */

  console.log(req.session.user);
  res.render("profile/main", {
    user: req.session.user,
  });
});

router.get("/delete-profile", isLoggedIn, (req, res, next) => {
  console.log(`the below id will be deleted: --- ↓↓↓ ----`);
  console.log(req.session.user._id);

  User.findByIdAndRemove(req.session.user._id).then(() =>
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    })
  );
});

router.get("/edit-profile-picture", isLoggedIn, (req, res, next) => {
  res.render("profile/edit-profile", {
    user: req.session.user,
  });
});

router.post("/edit-profile-picture", isLoggedIn, (req, res, next) => {
  console.log(`the below id will be edited: --- ↓↓↓ ----`);
  console.log(req.session.user._id);

  if (req.file) {
    return User.findByIdAndUpdate(req.session.user._id, {
      profileImage: req.file.path,
    });
  } else {
  }

  res.redirect("/");
});

module.exports = router;
