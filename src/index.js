  let apiKey = "150e7cb5a93e7be83b4a7a6e8e4516c8";
  let currentTemp;
  
   
/*code to import current time and format it */
function formatDate(date){

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[now.getDay()];
    let hour = now.getHours();
    let minute = now.getMinutes();
    
        if (hour < 10){
        hour= `0${hour}`;
        }
        if (minute < 10){
        minute= `0${minute}`;
        }
    
    return `${day}, ${hour}:${minute}`;
}
let now = new Date();
let dayTime = document.querySelector(".day-time");
dayTime.innerHTML= formatDate(now);

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day= date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 
  return days[day];

}


function getForecast (coordinates){

  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(displayForecast)

}

function displayForecast (response){
  
  let forecast = response.data.daily;

  let forecastElement= document.querySelector("#weather-forecast");
  let forecastHTML= `<div class="row" id="forecast">`
  
  forecast.forEach(function(forecastDay, index){

    if (index <= 5){
  forecastHTML = forecastHTML + `
    <div class="col-sm-2">
      <span class="forecast-days" id="day-one">${formatDay(forecastDay.dt)}</span>
      <span>
        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
        id="forecast-icon" 
        class="img-fluid"
        alt="rainy day icon"/></span>
        <span class="forecast-max" id="forecast-max">${Math.round(forecastDay.temp.max)} </span>
        <span class="forecast-min" id="forecast-min">| ${Math.round(forecastDay.temp.min)}</span>
    </div>
`;}
  });

  forecastHTML = forecastHTML + `</div>`
  
  
  forecastElement.innerHTML= forecastHTML;
}

/*code to return the weather for the current location */

function showWeather(response){
   
    let h1 = document.querySelector("h1");
    let currentLocation = response.data.name;
    let display = document.querySelector(".display-temp");
    currentTemp = Math.round(response.data.main.temp);
    let description = document.querySelector("#current-weather");
    let displayCurrentWeather = response.data.weather[0].description;
    let currentHumidity= document.querySelector("#humidity");
    let humidity = response.data.main.humidity;
    let currentWind = document.querySelector("#wind-speed");
    let wind= Math.round(response.data.wind.speed);
    let icon = document.querySelector("#icon");
   
    h1.innerHTML= (`${currentLocation}`); 
    display.innerHTML =`${currentTemp}`;
    description.innerHTML =(`${displayCurrentWeather}`);
    currentHumidity.innerHTML = (` ${humidity}%`);
    currentWind.innerHTML = (`${wind} `);
    icon.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function searchNewCity (event){
    event.preventDefault();
    let userSearch= document.querySelector("#search-city");
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${userSearch.value}&appid=${apiKey}&units=imperial`;
    axios.get(`${apiUrl}`).then(showWeather);
}

function searchCurrentCity(event) {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position){
  let myLat = position.coords.latitude;
  let myLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  });
}

searchCurrentCity();

let form= document.querySelector("#search-form");
form.addEventListener("submit", searchNewCity)

let button2 = document.querySelector("#submit-currentCity");
button2.addEventListener("click", searchCurrentCity);

