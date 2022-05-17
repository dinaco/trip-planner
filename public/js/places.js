function initSearch() {
  const cityInput = document.getElementById("cityName");
  /*   const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  }; */
  const cityOptions = {
    types: ["(cities)"],
  };
  const autocomplete = new google.maps.places.Autocomplete(
    cityInput,
    cityOptions
  );
  console.log("initSearch ongoing -------------- ");
  /*  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content"); */
  autocomplete.addListener("place_changed", () => {
    /*    infowindow.close(); */
    autocomplete.getPlace();
    const place = autocomplete.getPlace();
    console.log(place);
    document.getElementById("cityLocationLat").value =
      place.geometry.location.lat();
    document.getElementById("cityLocationLng").value =
      place.geometry.location.lng();
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
  });
}
