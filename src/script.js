function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function forecastFormatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
  
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + 
    `<div class="col-2">
    <div class="forecast-day">${forecastFormatDate(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
    <div class="forecast-temp">
      <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span> <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div>`;
}
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML
    ;
}

function getForecast(coordinates) {
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let tempElement = document.querySelector("#temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#weather-description")
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  
  fahrenheitTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord)
}

function searchCity(city) {
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
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
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationSearch);
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
searchForm.addEventListener("submit", search,);

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", currentLocation,);

let nycButton = document.querySelector("#nyc-button");
nycButton.addEventListener("click", showNYC,);

let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", showParis);

let tokyoButton = document.querySelector("#tokyo-button");
tokyoButton.addEventListener("click", showTokyo);

let laButton = document.querySelector("#la-button");
laButton.addEventListener("click", showLosAngeles);


function changeCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let celsiusElement = (fahrenheitTemperature - 32) * 5 / 9;
  tempElement.innerHTML = Math.round(celsiusElement);

}

function changeFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);

}

let fahrenheitTemperature = null;

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", changeFahrenheit);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", changeCelsius);

searchCity("Seattle");
