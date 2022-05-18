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

  const initLat = document.getElementById("initLat").value;
  const initLng = document.getElementById("initLng").value;
  let markers = [];
  const cityView = {
    lat: Number(initLat),
    lng: Number(initLng),
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
  const autocomplete = new google.maps.places.Autocomplete(searchActivities);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
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
    document.getElementById("new-place-name").innerHTML = place.name;
    document.getElementById("new-place-address").innerHTML =
      place.formatted_address;
    document.getElementById("newActlLat").value = place.geometry.location.lat();
    document.getElementById("newActlLng").value = place.geometry.location.lng();
    document.getElementById("newActName").value = place.name;
    document.getElementById(
      "submitBtn"
    ).innerHTML = `<button type="submit">Submit</button>`;
    infowindow.open(map, marker);
  });

  //navigator // geolocation
  /*   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(center);
    })
  } */

  /* const directionRequest = {
      origin: ironhackLX,
      destination: 'Madrid, ES',
      travelMode: 'TRANSIT',
    };
    directionService.route(directionRequest, function (response, status) {
      if (status === 'OK') {
        directionDisplay.setDirections(response);
      } else {
        window.alert('No direction foundd');
      }
    });
    directionDisplay.setMap(map); */

  /*   map.addListener("click", (mapMouseEvent) => {
    infowindow.close();
    const marker = new google.maps.Marker({
      position: {
        lat: mapMouseEvent.latLng.lat(),
        lng: mapMouseEvent.latLng.lng(),
      },
      map: map,
    });
    document.getElementById("newActlLat").value = marker.position.lat;
    document.getElementById("newActlLng").value = marker.position.lng;

    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  }); */
  let wayPoints = [];
  function dropMarkers() {
    wayPoints = [];
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
      wayPoints.push({
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
          label: `${i + 1}`,
          animation: google.maps.Animation.DROP,
          map: map,
        });
        markers.push(marker);
        marker.addListener("click", () => {
          const contentString = `<div id="content">
          <h3>${allNames[i].innerHTML}</h3>
          <form action="/trips/trip-details/${
            document.getElementById("dateId").value
          }/delete/${document.getElementsByClassName("activity-id")[i].value}/${
            document.getElementById("trip-id").value
          }" method="post">
          <button type="submit">Delete</button>
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
    // console.log(document.querySelector('input[name="genderS"]:checked').value)
    const directionRequest = {
      origin: accomodationCoord,
      destination: accomodationCoord,
      waypoints: wayPoints,
      travelMode: "WALKING",
    };
    if (wayPoints.length > 0) {
      directionService.route(directionRequest, function (response, status) {
        if (status === "OK") {
          directionDisplay.setDirections(response);
        } else {
          window.alert("No direction found for this travel mode");
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
        ).innerHTML = `<p>Total Kms: ${distance}</p><p>Total time: ${
          (time / 60 / 60).toString().split(".")[0]
        }h ${Math.round(
          60 / (100 / Number((time / 60 / 60).toFixed(2).split(".")[1]))
        )}min</p>`;
      });
      directionDisplay.setMap(map);
    }
  }

  const dateCards = document.querySelectorAll(".card");
  for (let i = 0; i < dateCards.length; i++) {
    if (dateCards[i].id == document.getElementById("dateId").value) {
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
      document.getElementById("dateId").value = event.currentTarget.id;
      document
        .getElementById(event.currentTarget.id)
        .classList.toggle("selected");
      dropMarkers();
      getDirections();
    });
  }
}
