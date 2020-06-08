//global variables
var apiKey = "b3fbe55dd96ce9158bc0be1d0f06e1a5"
var city = "orange"
var currentConditions = "https://api.openweathermap.org/data/2.5/weather?appid="
var fiveDay =
  "https://api.openweathermap.org/data/2.5/forecast?4e5dbe7db2b5e9c8b47fa40b691443d5q={city name},{country code}"

var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];


//taking in user input, and passing the value into a variable
$(document).ready(function() {
  $("#search-input").on("click", function(event) {
    var userInput = $("#city-search").val()
    console.log(userInput)
    localStorage.setItem("cities", JSON.stringify(userInput));
    getWeather(userInput);
  
  })
})

// userInput is passed into the getWeather function as argument 'cityName'
function getWeather(cityName) {
  //Clear out prev. city
  $(".city").empty();
	$(".feelsLike").empty();
	$(".humid").empty();
	$(".wind").empty();

  var apiCall = ""

  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName
  } else {
    apiCall = currentConditions + apiKey + "&q=" + city
  }
//Ajax call to get the current city weather api data 
  $.ajax({
    url: apiCall,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    
    var feelsLike = response.main.temp
    feelsLike = (feelsLike - 273.15) * 1.8 + 32
    feelsLike = Math.floor(feelsLike)
    city = response.name

    var humid = response.main.humidity
    var wind = response.wind.speed


    $("#current-weather").prepend("<div class = 'cw'>" + "Wind Speed: " + wind + " MPH" + "</div>")
    $("#current-weather").prepend("<div class = 'cw'>" + "Humidity: " + humid + "</div>")
    $("#current-weather").prepend("<div class = 'cw'>" + "Current Temperature: " + feelsLike + "° Fahrenheit" + "</div>")
    $("#current-weather").prepend("<div class = 'cwName'>" + city + "</div>")

    fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

  //Ajax call to get the 'five day' weather api data 
     $.ajax({
      url: fiveDay,
      method: "GET"
    }).then(function(response) {
      console.log(response)

      var averageTemp = 0
      var previousDate = ""
      var count = 0
      var results = 0
      previousDate = moment().format("MM/DD/YYYY")
      for (let index = 0; index < response.list.length; index++) {
        var currentDate = moment(response.list[index].dt, "X").format(
          "MM/DD/YYYY"
        )
        var temp = response.list[index].main.temp
        temp = (temp - 273.15) * 1.8 + 32
        temp = Math.floor(temp)
        console.log(currentDate)
        console.log(temp)

        if (previousDate === currentDate) {
          averageTemp = averageTemp + temp
          count++
          previousDate = currentDate
        } else {
          results = averageTemp / count
          results = Math.floor(results)
          console.log("results:", results)
          var card = $("<div class = 'card mb-2'>")

          var div1 = $("<div class= 'card-header col mt-1'>")
          div1.append("Date" + " " + currentDate)
          card.append(div1)

          var div2 = $("<div class= 'card-body col mt-1'>")
          div2.append("Average Temperature: " + results + "° Fahrenheit")
          card.append(div2)

          $("#five-day").append(card)

          count = 0
          averageTemp = 0
          previousDate = currentDate
        }
      }
    })
  })
};