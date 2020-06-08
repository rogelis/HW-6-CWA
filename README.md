# 06 Server-Side APIs: Weather Dashboard

## Description
    Created a simple dashboard api app. That retrieves weather data from: 
    https://api.openweathermap.org/data 
    User inputs City and will be displayed:
        *City
        *Current Temp
        *Humidity
        *Wind Speed

     A Row for the next 5-days Temp Average w/ Dates.

    If the User inputs and searches another city it will prepend the info onto the previous searched city.
   

## Review
    
Could not get it to clear the local storage because only one city is being tracked in local storage after every search.
While the city data gets prepended, it does not get stored in ls. Will review localstorage and update the missing code at a later date. 