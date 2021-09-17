var userFormEl = document.querySelector("#user-form");
var citySearchInputEl = document.querySelector("#city-search")
var searchedLocationEl = document.querySelector("#searched-location");
var locationContainerEl = document.querySelector("#location-container");

var coordinates = []

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var location = citySearchInputEl.value.trim();

    if (location) {
        getLocation(location);
        citySearchInputEl = "";
    } else {
        alert("Please enter a location");
    }
    // console.log(event);
};


var getLocation = function(location) {
    // format the OpenWeather Geocoding API URL 
    var openWeatherApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=5&appid=0899cac729532b722cf5a83da4e0e7f9"
    
    // make a request to the url
    fetch(openWeatherApiUrl).then(function(response) {
        response.json().then(function(data) {
            displayLocation(location)

            var lat = data[0].lat
            var lon = data[0].lon
    
            console.log(lat);
            console.log(lon);         
        });
    });
};

// NEXT STEPS --> take the lat/long from above and feed it into the weather API -- this will give weather in searched location

var displayLocation = function (location) {
    // console.log(location);

    // clear old content
    locationContainerEl.textContent = "";
    searchedLocationEl.textContent = location;

}

userFormEl.addEventListener("submit", formSubmitHandler);
