// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "trip-planner";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;
app.locals.mapsKey = process.env.MAPS_KEY;
app.locals.triposo_account = process.env.TRIPOSO_ACCOUNT;
app.locals.triposo_token = process.env.TRIPOSO_TOKEN;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const tripsRoutes = require("./routes/trips.routes");
app.use("/trips", tripsRoutes);
const tripOverview = require("./routes/tripOverview.routes");
app.use("/trips", tripOverview);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
