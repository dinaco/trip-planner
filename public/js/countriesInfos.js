const getCountryInfo = (countryName) => {
  axios
    .get(`https://restcountries.com/v2/name/${countryName}`)
    .then((response) => {
      console.log(response.data);
      const countryDetail = response.data[0];
      document.getElementById("country-name").innerText = countryDetail.name;
      document.getElementById("country-capital").innerText =
        countryDetail.capital;
      document
        .getElementById("country-flag")
        .setAttribute("src", countryDetail.flag);
    })
    .catch((err) => {
      console.log(err);
      err.response.status === 404
        ? alert(`The country ${countryName} doesn't exist.`)
        : alert("Server error! Sorry.");
    });
};

document.getElementById("get-country-btn").addEventListener("click", () => {
  console.log("clicked");
  const userInput = document.getElementById("country-name-input").value;
  getCountryInfo(userInput);
});
