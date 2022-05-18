function initSearch() {
  /*   const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  }; */

  // ------------ for city ---------------//
  let cityCountry, lat, lng, defaultBounds, autocompleteAccomodation;
  const cityInput = document.getElementById("cityName");
  const cityOptions = {
    types: ["(cities)"],
  };

  const autocompleteCity = new google.maps.places.Autocomplete(
    cityInput,
    cityOptions
  );
  console.log("initSearch ongoing -------------- ");
  /*  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content"); */
  autocompleteCity.addListener("place_changed", () => {
    /*    infowindow.close(); */
    autocompleteCity.getPlace();
    const place = autocompleteCity.getPlace();
    console.log(place);
    document.getElementById("cityLocationLat").value =
      place.geometry.location.lat();
    lat = place.geometry.location.lat();
    console.log(lat, typeof lat);
    document.getElementById("cityLocationLng").value =
      place.geometry.location.lng();
    lng = place.geometry.location.lng();
    document.getElementById("photoUrl").value = place.photos[0].getUrl({
      maxWidth: 350,
      maxHeight: 350,
    });

    console.log(
      "photo link: " + place.photos[0].getUrl({ maxWidth: 350, maxHeight: 350 })
    );
    //let photo = place.photos[0].getUrl({ 'maxWidth': 35, 'maxHeight': 35 });
    /*     infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address; */
    /*     infowindow.open(map, marker); */
    let i = place.address_components.length - 1;
    cityCountry = place.address_components[i].short_name;
    cityCountry = cityCountry; //.toLowerCase();
    console.log(cityCountry + " is of type: " + typeof cityCountry);

    defaultBounds = {
      north: Number(lat + 0.2),
      south: Number(lat - 0.2),
      east: Number(lng + 0.2),
      west: Number(lng - 0.2),
    };

    const accomodationInput = document.getElementById("accomodation");
    console.log(defaultBounds);
    const accomodationOptions = {
      bounds: defaultBounds,
      componentRestrictions: { country: cityCountry },
      types: ["establishment"],
    };

    autocompleteAccomodation = new google.maps.places.Autocomplete(
      accomodationInput,
      accomodationOptions
    );
    loadAccomodationAutocomplete();
  });

  // console.log(latCity, lngCity);
  // ------------ for accomodation ---------------//
  function loadAccomodationAutocomplete() {
    autocompleteAccomodation.addListener("place_changed", () => {
      console.log(`This is printed?: ` + cityCountry, lat, lng, defaultBounds);

      autocompleteAccomodation.getPlace();
      const place = autocompleteAccomodation.getPlace();
      console.log(place);
      console.log(place.name);
      document.getElementById("accomodationLocationLat").value =
        place.geometry.location.lat();
      document.getElementById("accomodationLocationLng").value =
        place.geometry.location.lng();

      document.getElementById("accomodationName").value = place.name;
    });
  }
}
