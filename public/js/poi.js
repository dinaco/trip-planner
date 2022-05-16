const axios = require("axios");

module.exports = {
  searchPlaces,
  searchDetails,
};

function searchPlaces(req, res) {
  axios
    .get(
      `https://www.triposo.com/api/20201111/poi.json?location_id=${req.body.query}&account=${process.env.TRIPOSO_ACCOUNT_NUMBER}&token=${process.env.TRIPOSO_API_KEY}`
    )
    .then((response) => {
      res.json(response.data);
    });
}
//source: https://github.com/wingsforsophia/bucket-list/blob/e13bb67141bee6becae69f46b6562cae0f1f0ff0/controllers/api.js
