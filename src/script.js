function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes(); 
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  let dayInput = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayInput];

  let monthInput = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[monthInput];
  let currentDate = date.getDate();
  return `${day}, ${month} ${currentDate}  | ${hours}:${minutes}`;

}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  
}

function searchCity(city) {
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}


function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function locationSearch(position) {
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(showWeather);
  console.log(locationSearch);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationSearch);
}

function changeCelsius(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = 19;
}

function changeFahrenheit(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = 66;
}

function showNYC(event) {
  event.preventDefault();
  let nyc = document.querySelector("#nyc-button").value;
  searchCity("New York");
}

function showParis(event) {
  event.preventDefault();
  let paris = document.querySelector("#paris-button").value;
  searchCity("Paris");
}

function showTokyo(event) {
  event.preventDefault();
  let tokyo = document.querySelector("#tokyo-button").value;
  searchCity("Tokyo");
}

function showLosAngeles(event) {
  event.preventDefault();
  let losAngeles = document.querySelector("#la-button").value;
  searchCity("Los Angeles");
}

let fullDate = document.querySelector("#date");
let currentTime = new Date();
fullDate.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", currentLocation);

let nycButton = document.querySelector("#nyc-button");
nycButton.addEventListener("click", showNYC);

let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", showParis);

let tokyoButton = document.querySelector("#tokyo-button");
tokyoButton.addEventListener("click", showTokyo);

let laButton = document.querySelector("#la-button");
laButton.addEventListener("click", showLosAngeles);


searchCity("Seattle");


/*let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", changeFahrenheit);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", changeCelsius);*/