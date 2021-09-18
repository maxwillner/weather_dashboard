var userFormEl = document.querySelector("#user-form");
var citySearchInputEl = document.querySelector("#city-search")
var searchedLocationEl = document.querySelector("#searched-location");
var locationContainerEl = document.querySelector("#location-container");

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
            console.log(response.temp);
        });

}

var displayLocation = function (location) {
    // console.log(location);

    // clear old content
    locationContainerEl.textContent = "";
    searchedLocationEl.textContent = location;

}

userFormEl.addEventListener("submit", formSubmitHandler);
