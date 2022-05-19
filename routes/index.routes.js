const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");

/* GET home page */
router.get("/", isLoggedOut, (req, res, next) => {
  const { user } = req.session;
  res.render("index", { user });
});

module.exports = router;
