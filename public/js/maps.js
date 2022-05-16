function initMap() {
  const initLat = document.getElementById("initLat").value;
  const initLng = document.getElementById("initLng").value;

  const ironhackLX = {
    lat: Number(initLat),
    lng: Number(initLng),
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ironhackLX,
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
    document.getElementById("newActlLat").innerHTML = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    document.getElementById("newActlLat").value = place.geometry.location.lat();
    document.getElementById("newActlLng").value = place.geometry.location.lng();
    document.getElementById("newActName").value = place.name;
    console.log(place);
    infowindow.open(map, marker);
  });

  /*   const myMarker = new google.maps.Marker({
    position: ironhackLX,
    map: map,
    title: "Ironhack lx",
  }); */

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

  /*   const directionService = new google.maps.DirectionsService();
  const directionDisplay = new google.maps.DirectionsRenderer(); */

  /* const directionRequest = {
      origin: ironhackLX,
      destination: 'Madrid, ES',
      travelMode: 'TRANSIT',
    };
    directionService.route(directionRequest, function (response, status) {
      if (status === 'OK') {
        directionDisplay.setDirections(response);
      } else {
        window.alert('No direction found');
      }
    });
    directionDisplay.setMap(map); */

  map.addListener("click", (mapMouseEvent) => {
    const marker = new google.maps.Marker({
      position: {
        lat: mapMouseEvent.latLng.lat(),
        lng: mapMouseEvent.latLng.lng(),
      },
      map: map,
    });

    document.getElementById("lat").value = mapMouseEvent.latLng.lat();
    document.getElementById("lng").value = mapMouseEvent.latLng.lng();
  });

  let allLat = document.getElementsByClassName("dbLat");
  let allLng = document.getElementsByClassName("dbLng");
  let allNames = document.getElementsByClassName("place-name");

  for (let i = 0; i < allLat.length; i++) {
    setTimeout(() => {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(allLat[i].value),
          lng: Number(allLng[i].value),
        },
        animation: google.maps.Animation.DROP,
        map: map,
      });

      marker.addListener("click", () => {
        const infoWindow = new google.maps.InfoWindow({
          content: allNames[i].innerHTML,
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
