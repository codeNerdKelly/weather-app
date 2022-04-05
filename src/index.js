  let apiKey = "150e7cb5a93e7be83b4a7a6e8e4516c8";
   
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

/*code to return the weather for the current location */

function showWeather(response){

    let display = document.querySelector(".far-temp");
    let currentTemp = Math.round(response.data.main.temp);
    display.innerHTML =`${currentTemp}`
    let h1 = document.querySelector("h1");
    let currentLocation = response.data.name;
    h1.innerHTML= (`${currentLocation}`); 
}

function searchNewCity (event){
    event.preventDefault();
    let userSearch= document.querySelector("#search-city");
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${userSearch.value}&appid=${apiKey}&units=imperial`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let form= document.querySelector("#search-form");
form.addEventListener("submit", searchNewCity)



function searchCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position){
  let myLat = position.coords.latitude;
  let myLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  });
}

let button2 = document.querySelector("#submit-currentCity");
button2.addEventListener("click", searchCurrentCity);