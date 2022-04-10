  let apiKey = "150e7cb5a93e7be83b4a7a6e8e4516c8";
  let currentTemp;
  let celsiusTemp;
   
/*code to import current time and format it */
function formatDate(timestamp){
    let date= new Date(timestamp);
   
    let hour = date.getHours();
    
        if (hour < 10){
        hour= `0${hour}`;
        }

    let minute = date.getMinutes();

        if (minute < 10){
        minute= `0${minute}`;
        }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    
    return `${day}, ${hour}:${minute}`;
}


function getForecast (coordinates){

  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(displayForecast)

}

function displayForecast (response){
  console.log(response.data.daily)
  let forecastElement= document.querySelector("#weather-forecast");
  let forecastHTML= `<div class="row" id="forecast">`
  let days =["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function(day){
  forecastHTML = forecastHTML + `
    <div class="col-2">
      <span class="forecast-days" id="day-one">Mon</span>
      <span>
        <img src="https://ssl.gstatic.com/onebox/weather/64/rain_light.png" id="day-one-icon" alt="rainy day icon"/></span>
        <span class="forecast-max" id="forecast-max">42°</span>
        <span class="forecast-min" id="forecast-min">  38°</span>
    </div>
`;
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
    let dayTime = document.querySelector("#day-time");
    let icon = document.querySelector("#icon");
   
    h1.innerHTML= (`${currentLocation}`); 
    display.innerHTML =`${currentTemp}`;
    description.innerHTML =(`${displayCurrentWeather}`);
    currentHumidity.innerHTML = (` ${humidity}%`);
    currentWind.innerHTML = (`${wind} `);
     dayTime.innerHTML = formatDate(response.data.dt * 1000);
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

function convertToCelsius (event){
  event.preventDefault();
   if (currentTemp == null){
    alert("Please search for a city");
  }
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let displayCelsius= document.querySelector(".display-temp");
  celsiusTemp = Math.round((currentTemp - 32) * 5/9);
  displayCelsius.innerHTML= celsiusTemp;
}

function convertToFahrenheit (event) {
  event.preventDefault();
  if (currentTemp == null || celsiusTemp == null){
    searchCurrentCity();
  }
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let displayFahrenheit = document.querySelector(".display-temp");
  let fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);
  displayFahrenheit.innerHTML = fahrenheitTemp;
}
searchCurrentCity();


let form= document.querySelector("#search-form");
form.addEventListener("submit", searchNewCity)

let button2 = document.querySelector("#submit-currentCity");
button2.addEventListener("click", searchCurrentCity);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);