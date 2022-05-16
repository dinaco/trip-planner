function initMap() {
  const initLat = document.getElementById("initLat").value;
  const initLng = document.getElementById("initLng").value;

  console.log(initLat, initLng);
  const ironhackLX = {
    lat: Number(initLat),
    lng: Number(initLng),
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ironhackLX,
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
    });
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
