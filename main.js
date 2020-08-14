//main script

var countries = {
    Canada: { name: "Canada", abbr: "CA", cuisine: "Canadian" },
    China: { name: "China", abbr: "CN", cuisine: "Chinese" },
    Egypt: { name: "Egypt", abbr: "EG", cuisine: "Egyptian" },
    France: { name: "France", abbr: "FR", cuisine: "French" },
    Greece: { name: "Greece", abbr: "GR", cuisine: "Greek" },
    India: { name: "India", abbr: "IN", cuisine: "Indian" },
    Ireland: { name: "Ireland", abbr: "IE", cuisine: "Irish" },
    Italy: { name: "Italy", abbr: "IT", cuisine: "Italian" },
    Jamaica: { name: "Jamaica", abbr: "JM", cuisine: "Jamaican" },
    Japan: { name: "Japan", abbr: "JP", cuisine: "Japanese" },
    Kenya: { name: "Kenya", abbr: "KE", cuisine: "Kenyan" },
    Malaysia: { name: "Malaysia", abbr: "MY", cuisine: "Malaysian" },
    Mexico: { name: "Mexico", abbr: "MX", cuisine: "Mexican" },
    Morocco: { name: "Morocco", abbr: "MA", cuisine: "Moroccan" },
    Netherlands: { name: "Netherlands", abbr: "NL", cuisine: "Dutch" },
    Poland: { name: "Poland", abbr: "PL", cuisine: "Polish" },
    Russia: { name: "Russia", abbr: "RU", cuisine: "Russian" },
    Spain: { name: "Spain", abbr: "ES", cuisine: "Spanish" },
    Thailand: { name: "Thailand", abbr: "TH", cuisine: "Thai" },
    Tunisia: { name: "Tunisia", abbr: "TN", cuisine: "Tunisian" },
    Turkey: { name: "Turkey", abbr: "TR", cuisine: "Turkish" },
    UnitedKingdom: { name: "United Kingdom", abbr: "GB", cuisine: "British" },
    UnitedStates: { name: "United States", abbr: "US", cuisine: "American" },
    Vietnam: { name: "Vietnam", abbr: "VN", cuisine: "Vietnamese" }
}

var months = {
    January: 1,
    Feburary: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
}

var country;
var month;

//Get list of holidays corresponding to user input of country & month from Calendarific API
function getHolidays() {
    var cAPIkey = "963eb84b09e849ae6b1ab4fa1201730ea69687c5";
    var calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=" + cAPIkey + "&country=" + countries[country].abbr + "&year=2020&month=" + months[month];

    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function (calendarResponse) {
        console.log(calendarResponse);
    })
}

//Get list of recipes corresponding to user input of country/cuisine from MealDB API
function getRecipes() {
    var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + countries[country].cuisine;
    $.ajax({
        url: mealURL,
        method: "GET"
    }).then(function (mealResponse) {
        console.log(mealResponse);
    })
}

//Get list (& map?) of restaurants corresponding to user input of country/cuisine AND city (or geolocation?) using Zomato API
function getRestaurants() {
// $.ajax({
//     url: zomatoURL,
//     method: "GET"
// }).then(function () {

// })
}

//EVENT LISTENER FOR COUNTRY DROPDOWN MENU
$("#countries").change(function() {
    country = (this.value);
});

//EVENT LISTENER FOR MONTH DROPDOWN MENU
$("#month").change(function() {
    month = (this.value);
    getHolidays();
    getRecipes();
})

//EVENT LISTENER FOR SEARCH BUTTON
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    getHolidays();
    renderHolidays();
})