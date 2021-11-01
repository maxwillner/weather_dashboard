var userFormEl = document.querySelector("#user-form");
var citySearchInputEl = document.querySelector("#city-search")
var searchedLocationEl = document.querySelector("#searched-location");
var locationContainerEl = document.querySelector("#location-container");

var locationContainerOneEl = document.querySelector("#location-container-one");
var locationContainerTwoEl = document.querySelector("#location-container-two");
var locationContainerThreeEl = document.querySelector("#location-container-three");
var locationContainerFourEl = document.querySelector("#location-container-four");
var locationContainerFiveEl = document.querySelector("#location-container-five");



var currentDate = moment().format('l');
var oneDayOut = moment().add(1, "days").format('l');
var twoDaysOut = moment().add(2, "days").format('l');
var threeDaysOut = moment().add(3, "days").format('l');
var fourDaysOut = moment().add(4, "days").format('l');
var fiveDaysOut = moment().add(5, "days").format('l');

// var savedSearches = [];

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

//     var storedSearchResults = JSON.parse(localStorage.getItem('searchedCities'));
//     if (!storedSearchResults.includes(location)) {
//         storedSearchResults.push(location);
//         localStorage.setItem('searchedCities', JSON.stringify(storedSearchResults))
//         // call function to update buttons
//     }
};

var getLocationWeather = function(location) {
    // format the OpenWeather Geocoding API URL 
    var geocodingApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=5&appid=0899cac729532b722cf5a83da4e0e7f9"
    
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
            // stuck - issue here around UV color-coding
            // if (todayUVIndex >= 2) {
            //     todayUVIndex.classList = "low";
            // } else if (todayUVIndex = 3 - 4.9) {
            //     todayUVIndex.classList = "moderate";
            // } else {
            //     (todayUVIndex <= 5) 
            //     todayUVIndex.classList= "high";
            // } 
            todayUVIndex.textContent = "UV Index: " + response.daily[0].uvi;
            locationContainerEl.appendChild(todayUVIndex); // error is - script.js:86 Uncaught (in promise) TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.


            // 5 day forecast

            // one day forward
            var oneDayForwardDate = document.createElement("h6");
            oneDayForwardDate.textContent = "Date: " + oneDayOut;
            locationContainerOneEl.appendChild(oneDayForwardDate);

            var oneDayForwardCondition = document.createElement("h6");
            oneDayForwardCondition.textContent = "Condition: " + response.daily[1].weather[0].description
            locationContainerOneEl.appendChild(oneDayForwardCondition);

            var oneDayForwardTemp = document.createElement("h6"); 
            oneDayForwardTemp.textContent = "Temperature: " + response.daily[1].temp.day
            locationContainerOneEl.appendChild(oneDayForwardTemp);

            var oneDayForwardWind = document.createElement("h6");
            oneDayForwardWind.textContent = "Wind: " + response.daily[1].wind_speed + " MPH";
            locationContainerOneEl.appendChild(oneDayForwardWind);

            var oneDayForwardHumidity = document.createElement("h6");
            oneDayForwardHumidity.textContent = "Humidity: " + response.daily[1].humidity + "%";
            locationContainerOneEl.appendChild(oneDayForwardHumidity);

            // two days forward
            var twoDaysForwardDate = document.createElement("h6");
            twoDaysForwardDate.textContent = "Date: " + twoDaysOut;
            locationContainerTwoEl.appendChild(twoDaysForwardDate);

            var twoDaysForwardCondition = document.createElement("h6");
            twoDaysForwardCondition.textContent = "Condition: " + response.daily[2].weather[0].description
            locationContainerTwoEl.appendChild(twoDaysForwardCondition);

            var twoDaysForwardTemp = document.createElement("h6"); 
            twoDaysForwardTemp.textContent = "Temperature: " + response.daily[2].temp.day
            locationContainerTwoEl.appendChild(twoDaysForwardTemp);

            var twoDaysForwardWind = document.createElement("h6");
            twoDaysForwardWind.textContent = "Wind: " + response.daily[2].wind_speed + " MPH";
            locationContainerTwoEl.appendChild(twoDaysForwardWind);

            var twoDaysForwardHumidity = document.createElement("h6");
            twoDaysForwardHumidity.textContent = "Humidity: " + response.daily[2].humidity + "%";
            locationContainerTwoEl.appendChild(twoDaysForwardHumidity);

            // three days forward
            var threeDaysForwardDate = document.createElement("h6");
            threeDaysForwardDate.textContent = "Date: " + threeDaysOut;
            locationContainerThreeEl.appendChild(threeDaysForwardDate);

            var threeDaysForwardCondition = document.createElement("h6");
            threeDaysForwardCondition.textContent = "Condition: " + response.daily[3].weather[0].description
            locationContainerThreeEl.appendChild(threeDaysForwardCondition);

            var threeDaysForwardTemp = document.createElement("h6"); 
            threeDaysForwardTemp.textContent = "Temperature: " + response.daily[3].temp.day
            locationContainerThreeEl.appendChild(threeDaysForwardTemp);

            var threeDaysForwardWind = document.createElement("h6");
            threeDaysForwardWind.textContent = "Wind: " + response.daily[3].wind_speed + " MPH";
            locationContainerThreeEl.appendChild(threeDaysForwardWind);

            var threeDaysForwardHumidity = document.createElement("h6");
            threeDaysForwardHumidity.textContent = "Humidity: " + response.daily[3].humidity + "%";
            locationContainerThreeEl.appendChild(threeDaysForwardHumidity);

            // four days forward
            var fourDaysForwardDate = document.createElement("h6");
            fourDaysForwardDate.textContent = "Date: " + fourDaysOut;
            locationContainerFourEl.appendChild(fourDaysForwardDate);

            var fourDaysForwardCondition = document.createElement("h6");
            fourDaysForwardCondition.textContent = "Condition: " + response.daily[4].weather[0].description
            locationContainerFourEl.appendChild(fourDaysForwardCondition);

            var fourDaysForwardTemp = document.createElement("h6"); 
            fourDaysForwardTemp.textContent = "Temperature: " + response.daily[4].temp.day
            locationContainerFourEl.appendChild(fourDaysForwardTemp);

            var fourDaysForwardWind = document.createElement("h6");
            fourDaysForwardWind.textContent = "Wind: " + response.daily[4].wind_speed + " MPH";
            locationContainerFourEl.appendChild(fourDaysForwardWind);

            var fourDaysForwardHumidity = document.createElement("h6");
            fourDaysForwardHumidity.textContent = "Humidity: " + response.daily[4].humidity + "%";
            locationContainerFourEl.appendChild(fourDaysForwardHumidity);

            // five days forward
            var fiveDaysForwardDate = document.createElement("h6");
            fiveDaysForwardDate.textContent = "Date: " + fiveDaysOut;
            locationContainerFiveEl.appendChild(fiveDaysForwardDate);

            var fiveDaysForwardCondition = document.createElement("h6");
            fiveDaysForwardCondition.textContent = "Condition: " + response.daily[5].weather[0].description
            locationContainerFiveEl.appendChild(fiveDaysForwardCondition);

            var fiveDaysForwardTemp = document.createElement("h6"); 
            fiveDaysForwardTemp.textContent = "Temperature: " + response.daily[5].temp.day
            locationContainerFiveEl.appendChild(fiveDaysForwardTemp);

            var fiveDaysForwardWind = document.createElement("h6");
            fiveDaysForwardWind.textContent = "Wind: " + response.daily[5].wind_speed + " MPH";
            locationContainerFiveEl.appendChild(fiveDaysForwardWind);

            var fiveDaysForwardHumidity = document.createElement("h6");
            fiveDaysForwardHumidity.textContent = "Humidity: " + response.daily[5].humidity + "%";
            locationContainerFiveEl.appendChild(fiveDaysForwardHumidity);
        });
}

var displayLocation = function (location) {
    // console.log(location);

    // clear old content
    locationContainerEl.textContent = "";
    searchedLocationEl.textContent = location;

}

// var saveLocation = function() {
    
// }

userFormEl.addEventListener("submit", formSubmitHandler);
