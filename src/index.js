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
  let displayCelsius= document.querySelector(".display-temp");
  celsiusTemp = Math.round((currentTemp - 32) * 5/9);
  displayCelsius.innerHTML= celsiusTemp;
}

function convertToFahrenheit (event) {
  event.preventDefault();
  if (currentTemp == null || celsiusTemp == null){
    searchCurrentCity();
  }
  let displayFahrenheit = document.querySelector(".display-temp");
  let fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);
  displayFahrenheit.innerHTML = fahrenheitTemp;
}



let form= document.querySelector("#search-form");
form.addEventListener("submit", searchNewCity)

let button2 = document.querySelector("#submit-currentCity");
button2.addEventListener("click", searchCurrentCity);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);