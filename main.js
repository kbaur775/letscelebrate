//main script

//calendarific
// API KEY: 963eb84b09e849ae6b1ab4fa1201730ea69687c5
// https://calendarific.com/api/v2/holidays?&api_key=963eb84b09e849ae6b1ab4fa1201730ea69687c5&country=US&year=2019'
var country = "canadian"
var calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=963eb84b09e849ae6b1ab4fa1201730ea69687c5&country=US&year=2020"
var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country;
    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function(calendarResponse) {
    console.log(calendarResponse);
    })
   
    $.ajax({
        url: mealURL,
        method: "GET"
    }).then(function(mealResponse) {
    console.log(mealResponse);
    })

