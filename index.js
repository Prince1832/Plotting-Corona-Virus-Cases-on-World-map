function updateMap() {
  console.log("Updatin Map with realtime data");
  fetch("/data.json")
    .then((response) => response.json())
    .then((resp) => {
      // console.log(resp.data);
      resp.data.forEach((element) => {
        latitude = element.latitude;
        longitude = element.longitude;

        const sick = element.sick;
        const infected = element.infected;
        const dead = element.dead;
        const recovered = element.recovered;
        const name = element.name;
        const country = element.country;

        let color;
        let popupContent;

        if (sick > 500) {
          color = "rgb(255, 0, 0)";
        } else {
          color = `rgb(${sick}, 0, 0)`;
        }

        if (infected > 0) {
          popupContent = `<p>Infected: ${infected} <br> City name: ${name}, Country: ${country}</p>`;
        }

        if (dead > 0) {
          popupContent += `<p>Deaths: ${dead}</p>`;
        }

        if (recovered > 0) {
          popupContent += `<p>Recovered: ${recovered}</p>`;
        }

        // Create a marker and add it to the map
        new mapboxgl.Marker({
          draggable: false,
          color: color,
        })
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            }).setHTML(popupContent)
          )
          .addTo(map);
      });
    });
}

updateMap();

// let interval = 1000;
// setInterval(updateMap, interval);
