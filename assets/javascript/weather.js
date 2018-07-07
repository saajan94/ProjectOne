var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Miami&units=imperial&appid=affb056dca8cc1de18ebc74aba4e1b42";

 // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({        
        url: queryURL,
        method: "GET"
})

// We store all of the retrieved data inside of an object called "response"
.then(function(response) {

    // Transfer content to HTML
    var image = response.weather[0].icon;

    $(".city").html("<h2>" + response.name + " Weather Details</h2>");
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".temp").text("Temperature " + response.main.temp +  "(F)");
    $(".icon").html('<img src= "http://openweathermap.org/img/w/' + image + '.png">');
});