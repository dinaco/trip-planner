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
  /*  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content"); */
  autocomplete.addListener("place_changed", () => {
    /*    infowindow.close(); */
    autocomplete.getPlace();
    const place = autocomplete.getPlace();
    document.getElementById("cityLocationLat").value =
      place.geometry.location.lat();
    document.getElementById("cityLocationLng").value =
      place.geometry.location.lng();
    console.log(place.geometry.location.lat(), place.geometry.location.lng());
    /*     infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address; */
    /*     infowindow.open(map, marker); */
  });
}
