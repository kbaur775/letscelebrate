//main script
    var holidayDate
    var holidayDescrip
    var holidayName
    var cAPIkey
    var calendarificURL

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
    January: "1",
    Feburary: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12"
}

var country = "UnitedKingdom";
var month = "1";

//Get list of holidays corresponding to user input of country & month from Calendarific API
function getHolidays() {
    cAPIkey = "963eb84b09e849ae6b1ab4fa1201730ea69687c5";
    calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=" + cAPIkey + "&country=" + countries[country].abbr + "&year=2021&month=" + months[month] + "&type=national,local,religious";

    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function (calendarResponse) {

        //CERTAIN COUNTRIES/MONTHS DON'T HAVE HOLIDAYS IN ARRAY
        var holidayList = $("#holiday-list");
       

       if (calendarResponse.response.holidays.length === 0){
           alert("Try a different country/month")
       }
       else{
        for (var i = 0 ; i < calendarResponse.response.holidays.length ; i++){
            holidayName = calendarResponse.response.holidays[i].name
            
            var hOne = $("<h4>").text(holidayName);
            hOne.attr("id", i)

            holidayList.append(hOne)


        }
        //<h4> displays holiday name
        // <p> displays date
        // <p> displays description
    }
    })
    
}

//Get list of recipes corresponding to user input of country/cuisine from MealDB API
function getRecipes() {
    var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + countries[country].cuisine;
    $.ajax({
        url: mealURL,
        method: "GET"
    }).then(function (mealResponse) {

        var mealList = $("#recipe-list");
        for (var i = 0; i < mealResponse.meals.length ; i++){
            var mealName = mealResponse.meals[i].strMeal
            var mealImageURL = mealResponse.meals[i].strMealThumb
            var mealID = mealResponse.meals[i].idMeal
            var cellCard = $("<div>")
            cellCard.addClass("cell")
            var recipeCard = $("<div>")
            
            recipeCard.addClass("card")
            var mealImage = $("<img>")
            mealImage.attr("id", mealID)
            mealImage.attr("src", mealImageURL)
            var recipeCardTitle = $("<h4>")
            recipeCardTitle.text(mealName)
            recipeCard.append(recipeCardTitle)
            recipeCard.append(mealImage)
            cellCard.append(recipeCard)
            mealList.append(cellCard)

            // var hOne = $("<h4>").text(mealName);
            // mealList.append(hOne);

        }
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
    
    // getHolidays();
    // getRecipes();
})

//EVENT LISTENER FOR SEARCH BUTTON
$("#searchBtn").on("click", function(event) {
    $("#holiday-list").empty();
    event.preventDefault();
    getHolidays();
    // renderHolidays();
})

$("#recipeBtn").on("click", function(event) {
    $("#recipe-list").empty();
    event.preventDefault();
    getRecipes();
})

$(document).on("click", "h4", function(event){
    calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=" + cAPIkey + "&country=" + countries[country].abbr + "&year=2021&month=" + months[month] + "&type=national,local,religious";
    var index = $(this).attr("id")

    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function (calendarResponse) {
        event.preventDefault()
        holidayName = calendarResponse.response.holidays[index].name
        holidayDate = calendarResponse.response.holidays[index].date.iso
        holidayDescrip = calendarResponse.response.holidays[index].description
        
        
        $("#holiday-list").empty();
        hOne = $("<h4>").text(holidayName);
        pTwo = $("<p>").text(holidayDate);
        pThree = $("<p>").text(holidayDescrip);
        backButton = $("<button>").text("Go Back")
        backButton.addClass("backBtn")
        $("#holiday-list").append(hOne)
        $("#holiday-list").append(pTwo)
        $("#holiday-list").append(pThree)
        $("#holiday-list").append(backButton)
})
})
$(document).on("click", ".backBtn", function(event){
    event.preventDefault()
    $("#holiday-list").empty();
    getHolidays()
})

