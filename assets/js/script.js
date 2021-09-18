var userFormEl = document.querySelector("#user-form");
var citySearchInputEl = document.querySelector("#city-search")
var searchedLocationEl = document.querySelector("#searched-location");
var locationContainerEl = document.querySelector("#location-container");

var currentDate = moment().format('l')

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var location = citySearchInputEl.value.trim();

    if (location) {
        getLocationWeather(location);
        citySearchInputEl = "";
    } else {
        alert("Please enter a location");
    }
    // console.log(event);
};

var getLocationWeather = function(location) {
    // format the OpenWeather Geocoding API URL 
    var geocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=5&appid=0899cac729532b722cf5a83da4e0e7f9"
    
    // make a request to the OpenWeather Geocoding API URL
    fetch(geocodingApiUrl)
        .then(function(response) {
        return response.json();
        })   
        .then(function(response) {
            displayLocation(location)

            // get lat + lon values for location
            var lat = response[0].lat
            var lon = response[0].lon
    
            // console.log(lat);
            // console.log(lon);       
            
            // make the request to the OpenWeather OneCall API URL inputting lat + long values
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alert&appid=0899cac729532b722cf5a83da4e0e7f9");

        })
        .then(function(response) {
            return response.json();
    })
        .then(function(response) {
            // pass response into dom function

            // current day weather
            var todayDate = document.createElement("h4");
            todayDate.textContent = "Date: " + currentDate;
            locationContainerEl.appendChild(todayDate);

            var todayCondition = document.createElement("h4");
            todayCondition.textContent = "Condition: " + response.daily[0].weather[0].description
            locationContainerEl.appendChild(todayCondition);

            var todayTemp = document.createElement("h4"); 
            todayTemp.textContent = "Temperature: " + response.daily[0].temp.day
            locationContainerEl.appendChild(todayTemp);

            var todayWind = document.createElement("h4");
            todayWind.textContent = "Wind: " + response.daily[0].wind_speed + " MPH";
            locationContainerEl.appendChild(todayWind);

            var todayHumidity = document.createElement("h4");
            todayHumidity.textContent = "Humidity: " + response.daily[0].humidity + "%";
            locationContainerEl.appendChild(todayHumidity);

            var todayUVIndex = document.createElement("h4");
            todayUVIndex.textContent = "UV Index: " + response.daily[0].uvi;
            locationContainerEl.appendChild(todayUVIndex);

            // 5 day forecast

        });
}

var displayLocation = function (location) {
    // console.log(location);

    // clear old content
    locationContainerEl.textContent = "";
    searchedLocationEl.textContent = location;

}

userFormEl.addEventListener("submit", formSubmitHandler);
