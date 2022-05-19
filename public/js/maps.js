function initMap() {
  const accomodationCoord = {
    location: {
      lat: Number(
        document.getElementById("accomodation-coordinates").value.split(",")[0]
      ),
      lng: Number(
        document.getElementById("accomodation-coordinates").value.split(",")[1]
      ),
    },
  };

  const initLat = document.getElementById("initLatLoad").value;
  const initLng = document.getElementById("initLngLoad").value;
  let markers = [];
  let travelMode = "WALKING";
  const cityView = {
    lat: Number(initLat),
    lng: Number(initLng),
  };
  const defaultBounds = {
    north: cityView.lat + 0.1,
    south: cityView.lat - 0.1,
    east: cityView.lng + 0.1,
    west: cityView.lng - 0.1,
  };
  const options = {
    bounds: defaultBounds,
    /*     componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"], */
  };
  const directionService = new google.maps.DirectionsService();
  const directionDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: cityView,
  });

  const searchActivities = document.getElementById("searchActivities");
  const autocomplete = new google.maps.places.Autocomplete(
    searchActivities,
    options
  );

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    //  infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      //  map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    const contentString = `<div id="infowindow-content">
    <form action="/trips/trip-details/${
      document.getElementById("trip-id").value
    }/create" method="post">
          <h5><a href='${
            place.website ? place.website : "/"
          }' target='_blank'>${place.name}</a></h5>
      <p id="new-place-address" class="py-3">${place.adr_address}</p>
      <p class="d-flex align-items-center"><span id="new-phone">Tel: ${
        place.formatted_phone_number ? place.formatted_phone_number : "-----"
      }</span><span id="rating" class="ms-auto"><span class="btn ${
      place.rating > 3 ? "btn-success" : "btn-danger"
    }"><i class="fa fa-star-o" aria-hidden="true"></i> ${
      place.rating ? place.rating : "-"
    } </span></span></p>
      <input type="hidden" name="newActName" id="newActName" value="${
        place.name
      }" />
      <input type="hidden" name="newActlLat" id="newActlLat" value="${place.geometry.location.lat()}" />
      <input type="hidden" name="newActlLng" id="newActlLng" value="${place.geometry.location.lng()}"  />
      <input
        type="hidden"
        name="dateId"
        id="dateId"
        value="${document.getElementById("dateIdLoad").value}"
      />
      <button class="btn btn-primary w-100" type="submit"><i class="fa fa-plus" aria-hidden="true"></i> Add</button>
          </form>
          </div>`;

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    infowindow.open(map, marker);
  });
  let waypoints = [];
  function dropMarkers() {
    waypoints = [];
    directionDisplay.set("directions", null);
    const allMarkersLat = document.querySelectorAll(".markers-lat");
    allMarkersLat.forEach((e) => e.classList.remove("dbLat"));
    const allMarkersLng = document.querySelectorAll(".markers-lng");
    allMarkersLng.forEach((e) => e.classList.remove("dbLng"));
    const initMarkersLat = document
      .querySelector(".selected")
      .querySelectorAll(".markers-lat");
    const initMarkersLng = document
      .querySelector(".selected")
      .querySelectorAll(".markers-lng");
    initMarkersLat.forEach((e) => {
      e.classList.toggle("dbLat");
    });
    initMarkersLng.forEach((e) => {
      e.classList.toggle("dbLng");
    });
    let allLat = document.getElementsByClassName("dbLat");
    let allLng = document.getElementsByClassName("dbLng");
    let allNames = document
      .querySelector(".selected")
      .getElementsByClassName("place-name");
    for (let i = 0; i < allLat.length; i++) {
      waypoints.push({
        location: {
          lat: Number(allLat[i].value),
          lng: Number(allLng[i].value),
        },
      });
      setTimeout(() => {
        const marker = new google.maps.Marker({
          position: {
            lat: Number(allLat[i].value),
            lng: Number(allLng[i].value),
          },
          label: {
            text: `${i + 1}`,
            color: "white",
            fontWeight: "bold",
            fontSize: "1.7em",
          },
          animation: google.maps.Animation.DROP,
          map: map,
        });
        markers.push(marker);
        marker.addListener("click", () => {
          const contentString = `<div id="content">
          <h5 class="mb-3">${allNames[i].innerHTML}</h5>
          <form action="/trips/trip-details/${
            document.getElementById("dateIdLoad").value
          }/delete/${
            document
              .querySelector(".selected")
              .getElementsByClassName("activity-id")[i].value
          }/${document.getElementById("trip-id").value}" method="post">
          <button class="btn btn-danger w-100" type="submit"><i class="fa fa-times" aria-hidden="true"></i> Delete</button>
          </form>
          </div>`;

          const infoWindow = new google.maps.InfoWindow({
            content: contentString,
          });
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
      }, 500 * i);
    }
    /*     let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      console.log(markers[i]);
      bounds.extend(markers[i]);
    }

    map.fitBounds(bounds); */
  }
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function getDirections() {
    const marker = new google.maps.Marker({
      position: {
        lat: Number(
          document
            .getElementById("accomodation-coordinates")
            .value.split(",")[0]
        ),
        lng: Number(
          document
            .getElementById("accomodation-coordinates")
            .value.split(",")[1]
        ),
      },
      icon: "https://res.cloudinary.com/dinaco/image/upload/v1652873427/trip-planner-project/1652873333-trimmy-accomodation-marker-removebg-preview_eo1izf.png",
      animation: google.maps.Animation.DROP,
      map: map,
    });
    markers.push(marker);
    const directionRequest = {
      origin: accomodationCoord,
      destination: accomodationCoord,
      waypoints,
      travelMode,
    };
    if (waypoints.length > 0) {
      directionService.route(directionRequest, function (response, status) {
        if (status === "OK") {
          directionDisplay.setDirections(response);
        } else {
          document.querySelector(
            ".modal-body"
          ).innerHTML = `No direction found for travel mode "${travelMode}"`;
          document.getElementById("exampleModal").modal("show");
          // window.alert(`No direction found for travel mode "${travelMode}"`);
        }
        let km = 0;
        let time = 0;
        response.routes[0].legs.map((e) => {
          km += Number(e.distance.value);
          time += Number(e.duration.value);
        });
        let distance = Math.round(km / 1000);
        document.querySelector(
          ".distance"
        ).innerHTML = `<span> ${distance} km | Travel Time: ${Number(
          (time / 60 / 60).toString().split(".")[0]
        )}h ${Math.round(
          60 / (100 / Number((time / 60 / 60).toFixed(2).split(".")[1]))
        )}min | Total Time: ${
          Number((time / 60 / 60).toString().split(".")[0]) + waypoints.length
        }h ${Math.round(
          60 / (100 / Number((time / 60 / 60).toFixed(2).split(".")[1]))
        )}min</span>`;

        if (
          Number((time / 60 / 60).toString().split(".")[0]) +
            waypoints.length >=
          8
        ) {
          document.querySelector(".distance").classList.add("alert-warning");
          document.querySelector(".distance").classList.remove("alert-info");
        } else {
          document.querySelector(".distance").classList.add("alert-info");
          document.querySelector(".distance").classList.remove("alert-warning");
        }
      });
      directionDisplay.setMap(map);
    } else {
      document.querySelector(".distance").innerHTML =
        "Add activities to show distance info";
    }
  }
  const dateCards = document.querySelectorAll(".card");
  for (let i = 0; i < dateCards.length; i++) {
    if (dateCards[i].id == document.getElementById("dateIdLoad").value) {
      dateCards[i].classList.toggle("selected");
      dropMarkers();
      getDirections();
    }
    dateCards[i].addEventListener("click", (event) => {
      setMapOnAll(null);
      markers = [];
      dateCards.forEach((e) => {
        e.classList.remove("selected");
      });
      console.log(event.currentTarget.id);
      document.getElementById("dateIdLoad").value = event.currentTarget.id;
      document
        .getElementById(event.currentTarget.id)
        .classList.toggle("selected");
      dropMarkers();
      getDirections();
    });
  }
  document
    .querySelectorAll('input[name="travelmode-radio"]')
    .forEach((elem) => {
      elem.addEventListener("change", function (event) {
        travelMode = event.currentTarget.value;
        getDirections();
      });
    });
}
