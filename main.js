// function showPosition(position) {
//   x.innerHTML =
//     "Latitude: " +
//     position.coords.latitude +
//     "<br>Longitude: " +
//     position.coords.longitude;
// }

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }
// }

// console.log(getLocation());
document.addEventListener("DOMContentLoaded", () => {
  let city = "";
  let latitude = "";
  let longitude = "";
  let cityDiv = document.querySelector(".city");
  let tempDiv = document.querySelector(".temperature");
  let iconDiv = document.querySelector("#icon1");
  let weather = "";

  let bg = document.querySelector(".bg");
  let pictures = [
    "images/day.jpg",
    "images/night.jpg",
    "images/cloudy.jpg",
    "images/cloudynight.jpg",
    "images/rain.jpg",
    "images/snow.jpg",
    "images/fog.jpg",
  ];

  let skycons = new Skycons({
    color: "black",
  });

  // CLEAR_DAY CLEAR_NIGHT PARTLY_CLOUDY_DAY PARTLY_CLOUDY_NIGHT CLOUDY RAIN SLEET SNOW WIND FOG

  skycons.add(document.getElementById("icon1"), Skycons.RAIN);

  // if (skycons.loadPic === 0) {
  //   bg.styles.backgroundImage = `url(${pictures[1]})`;
  // }

  if (skycons.list[0].loadPic === 0) {
    bg.src = `${pictures[0]}`;
    console.log("day");
  } else if (skycons.list[0].loadPic === 1) {
    bg.src = `${pictures[1]}`;
    skycons.color = "white";
    iconDiv.style.border = "4px solid white";
    cityDiv.style.color = "white";
    cityDiv.style.fontWeight = 100;
    bg.style.opacity = 1;
    tempDiv.style.textShadow = "0px 0px 3px black";
    tempDiv.style.color = "white";
    console.log("night");
  } else if (skycons.list[0].loadPic === 2) {
    cityDiv.style.color = "white";
    cityDiv.style.textShadow = "0px 2px 4px black";
    bg.src = `${pictures[2]}`;
    console.log("partly cloudy day");
  } else if (skycons.list[0].loadPic === 3) {
    bg.src = `${pictures[3]}`;
    skycons.color = "white";
    iconDiv.style.border = "4px solid white";
    cityDiv.style.color = "white";
    cityDiv.style.fontWeight = 100;
    bg.style.opacity = 1;
    tempDiv.style.textShadow = "0px 0px 3px black";
    tempDiv.style.color = "white";
    console.log("partly cloudy night");
  } else if (skycons.list[0].loadPic === 4) {
    bg.src = `${pictures[2]}`;
    cityDiv.style.color = "white";
    cityDiv.style.textShadow = "0px 3px 5px black";
  } else if (skycons.list[0].loadPic === 5) {
    bg.style.opacity = 1;
    skycons.color = "white";
    iconDiv.style.border = "4px solid white";
    cityDiv.style.color = "white";
    cityDiv.style.fontWeight = 100;
    tempDiv.style.textShadow = "0px 0px 3px black";
    tempDiv.style.color = "white";
    bg.src = `${pictures[4]}`;
  } else if (skycons.list[0].loadPic === 6) {
    bg.src = `${pictures[5]}`;
  } else if (skycons.list[0].loadPic === 7) {
    bg.src = `${pictures[5]}`;
  } else if (skycons.list[0].loadPic === 8) {
    bg.src = `${pictures[0]}`;
  } else if (skycons.list[0].loadPic === 9) {
    bg.src = `${pictures[6]}`;
  }
  skycons.play();

  fetch("http://www.geoplugin.net/json.gp")
    .then((data) => data.json())
    .then((data) => {
      city = data.geoplugin_city;
      latitude = data.geoplugin_latitude;
      longitude = data.geoplugin_longitude;
      cityDiv.innerText = city;
      // console.log(data);
      console.log(city, latitude, longitude);

      fetch(
        // `https://api.weather.gov/gridpoints/{office}/${latitude},${longitude}/forecast`
        `https://api.weather.gov/points/${latitude},${longitude}`
      )
        .then((data2) => data2.json())
        .then((data2) => {
          // console.log(data2);
          console.log(data2.properties.forecast);
          // fetch(`${data2.}`)
          fetch(data2.properties.forecast)
            .then((data3) => data3.json())
            .then((data3) => {
              console.log(data3);
              weather = data3.properties.periods[0].temperature;
              tempDiv.innerHTML = `${weather}&deg;<sup class="f">F</sup>`;
              console.log(weather);
            });
        });
    });
});

// https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast
