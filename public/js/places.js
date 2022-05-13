function initSearch() {
  const input = document.getElementById("pac-input");
  /*   const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  }; */
  const autocomplete = new google.maps.places.Autocomplete(input);
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    autocomplete.getPlace();
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });
}
initSearch();
