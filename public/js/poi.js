/* const axios = require("axios");

function searchPlaces(req, res) {
  axios
    .get(
      `https://www.triposo.com/api/20201111/poi.json?location_id=${req.body.query}&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`
    )
    .then((response) => {
      res.json(response.data);
    });
}
//source: https://github.com/wingsforsophia/bucket-list/blob/e13bb67141bee6becae69f46b6562cae0f1f0ff0/controllers/api.js

module.exports = {
  searchPlaces,
  searchDetails,
}; */

/* poi.json?
location_id=Delft
&tag_labels=eatingout
&count=10
&fields=id,name,score,intro,tag_labels,best_for
&order_by=-score */

require("dotenv/config");

const getCityRestaurants = (cityName) => {
  console.log(cityName);
  console.log(process.env.TRIPOSO_ACCOUNT);

  axios
    .get(
      //`https://www.triposo.com/api/20201111/poi.json?location_id=${cityName}&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`

      `https://www.triposo.com/api/20201111/poi.json?location_id=${cityName}&account=${triposo_account}&token=${triposo_token}`
    )
    .then((response) => {
      console.log(response.data);
      /*    const countryDetail = response.data[0];
      document.getElementById("city-name").innerText = cityDetail.name;
      document.getElementById("city-capital").innerText = cityDetail.capital;
      document.getElementById("city-flag").setAttribute("src", cityDetail.flag); */
    })
    .catch((err) => {
      console.log(err);
      err.response.status === 404
        ? alert(`The city ${cityName} doesn't exist.`)
        : alert("Server error! Sorry.");
    });
};

document.getElementById("get-city-btn").addEventListener("click", () => {
  console.log("clicked");
  const userInput = document.getElementById("city-name-input").value;
  getCityRestaurants(userInput);
});
