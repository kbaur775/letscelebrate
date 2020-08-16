//main script
    var holidayDate
    var holidayDescrip
    var holidayName
    var cAPIkey
    var calendarificURL
    var mealID 

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
            hOne.attr("class", "holiday-list");
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
    $("#recipe-list").empty();
    var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + countries[country].cuisine;
    $.ajax({
        url: mealURL,
        method: "GET"
    }).then(function (mealResponse) {

        var mealList = $("#recipe-list");
        for (var i = 0; i < mealResponse.meals.length ; i++){
            var mealName = mealResponse.meals[i].strMeal
            var mealImageURL = mealResponse.meals[i].strMealThumb
            mealID = mealResponse.meals[i].idMeal
            var cellCard = $("<div>")
            cellCard.addClass("cell")
            var recipeCard = $("<div>")
            
            recipeCard.addClass("card")
            var mealImage = $("<img>")
            mealImage.attr("id", mealID)
            mealImage.attr("src", mealImageURL)
            var recipeCardTitle = $("<h4>")
            recipeCardTitle.text(mealName)
            recipeCardTitle.attr("class", "recipe-title")
            recipeCard.append(recipeCardTitle)
            recipeCard.append(mealImage)
            cellCard.append(recipeCard)
            cellCard.attr("class", "recipe-box")
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

//pick a holiday
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

//back button
$(document).on("click", ".backBtn", function(event){
    event.preventDefault()
    $("#holiday-list").empty();
    getHolidays()
})


// recipe functions
$(document).on("click", "img", function(event){
    event.preventDefault()
    mealID = this.id

    $("#recipe-list").empty();
    var mealURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID;
    $.ajax({
        url: mealURL,
        method: "GET"
    }).then(function (mealIdResponse) {
       console.log(mealIdResponse.meals[0])
       //measurements and ingredients in one string
    var ingOne = $("<li>").text(mealIdResponse.meals[0].strMeasure1 + " " + mealIdResponse.meals[0].strIngredient1)
    var ingTwo = $("<li>").text(mealIdResponse.meals[0].strMeasure2 + " " + mealIdResponse.meals[0].strIngredient2)
    var ingThree = $("<li>").text(mealIdResponse.meals[0].strMeasure3 + " " + mealIdResponse.meals[0].strIngredient3)
    var ingFour = $("<li>").text(mealIdResponse.meals[0].strMeasure4 + " " + mealIdResponse.meals[0].strIngredient4)
    var ingFive = $("<li>").text(mealIdResponse.meals[0].strMeasure5 + " " + mealIdResponse.meals[0].strIngredient5)
    var ingSix = $("<li>").text(mealIdResponse.meals[0].strMeasure6 + " " + mealIdResponse.meals[0].strIngredient6)
    var ingSeven =$("<li>").text( mealIdResponse.meals[0].strMeasure7 + " " + mealIdResponse.meals[0].strIngredient7)
    var ingEight = $("<li>").text(mealIdResponse.meals[0].strMeasure8 + " " + mealIdResponse.meals[0].strIngredient8)
    var ingNine = $("<li>").text(mealIdResponse.meals[0].strMeasure9 + " " + mealIdResponse.meals[0].strIngredient9)
    var ingTen = $("<li>").text(mealIdResponse.meals[0].strMeasure10 + " " + mealIdResponse.meals[0].strIngredient10)
    var ingEleven = $("<li>").text(mealIdResponse.meals[0].strMeasure11 + " " + mealIdResponse.meals[0].strIngredient11)
    var ingTwelve = $("<li>").text(mealIdResponse.meals[0].strMeasure12 + " " + mealIdResponse.meals[0].strIngredient12)
    var ingThirteen = $("<li>").text(mealIdResponse.meals[0].strMeasure13 + " " + mealIdResponse.meals[0].strIngredient13)
    var ingFourteen =$("<li>").text( mealIdResponse.meals[0].strMeasure14 + " " + mealIdResponse.meals[0].strIngredient14)
    var ingFifteen = $("<li>").text(mealIdResponse.meals[0].strMeasure15 + " " + mealIdResponse.meals[0].strIngredient15)
    var ingSixteen = $("<li>").text(mealIdResponse.meals[0].strMeasure16 + " " + mealIdResponse.meals[0].strIngredient16)
    var ingSeventeen = $("<li>").text(mealIdResponse.meals[0].strMeasure17 + " " + mealIdResponse.meals[0].strIngredient17)
    var ingEighteen = $("<li>").text(mealIdResponse.meals[0].strMeasure18 + " " + mealIdResponse.meals[0].strIngredient18)
    var ingNineteen = $("<li>").text( mealIdResponse.meals[0].strMeasure19 + " " + mealIdResponse.meals[0].strIngredient19)
    var ingTwenty = $("<li>").text(mealIdResponse.meals[0].strMeasure20 + " " + mealIdResponse.meals[0].strIngredient20)
    var instructions = $("<p>").text(mealIdResponse.meals[0].strInstructions)
    var mealTitle = $("<h4>").text(mealIdResponse.meals[0].strMeal)
    var youtubeLink = mealIdResponse.meals[0].strYoutube
    var mealThumb = mealIdResponse.meals[0].strMealThumb
    var mealImage = $("<img>")
    mealImage.attr("src", mealThumb)
    mealImage.attr("id", "mealImg")
    //recipe is displayed
    $("#recipe").append(mealImage)
    $("#recipe").append(mealTitle)
    if (mealIdResponse.meals[0].strIngredient1){
    $("#recipe").append(ingOne)
    }
    if (mealIdResponse.meals[0].strIngredient2){
    $("#recipe").append(ingTwo)
    }
    if (mealIdResponse.meals[0].strIngredient3){
    $("#recipe").append(ingThree)
    }
    if (mealIdResponse.meals[0].strIngredient4){
    $("#recipe").append(ingFour)
    }
    if (mealIdResponse.meals[0].strIngredient5){
    $("#recipe").append(ingFive)
    }
    if (mealIdResponse.meals[0].strIngredient6){
    $("#recipe").append(ingSix)
    }
    if (mealIdResponse.meals[0].strIngredient7){
    $("#recipe").append(ingSeven)
    }
    if (mealIdResponse.meals[0].strIngredient8){
    $("#recipe").append(ingEight)
    }
    if (mealIdResponse.meals[0].strIngredient9){
    $("#recipe").append(ingNine)
    }
    if (mealIdResponse.meals[0].strIngredient10){
    $("#recipe").append(ingTen)
    }
    if (mealIdResponse.meals[0].strIngredient11){
    $("#recipe").append(ingEleven)
    }
    if (mealIdResponse.meals[0].strIngredient12){
    $("#recipe").append(ingTwelve)
    }
    if (mealIdResponse.meals[0].strIngredient13){
    $("#recipe").append(ingThirteen)    
    }
    if (mealIdResponse.meals[0].strIngredient14){
    $("#recipe").append(ingFourteen)
    }
    if (mealIdResponse.meals[0].strIngredient15){
    $("#recipe").append(ingFifteen)
    }
    if (mealIdResponse.meals[0].strIngredient16){
    $("#recipe").append(ingSixteen)
    }
    if (mealIdResponse.meals[0].strIngredient17){
    $("#recipe").append(ingSeventeen)
    }
    if (mealIdResponse.meals[0].strIngredient18){
    $("#recipe").append(ingEighteen)
    }
    if (mealIdResponse.meals[0].strIngredient19){
    $("#recipe").append(ingNineteen)
    }
    if (mealIdResponse.meals[0].strIngredient20){
    $("#recipe").append(ingTwenty)
    }
    $("#recipe").append(instructions)
    

    backButtonTwo = $("<button>").text("Go Back")
    backButtonTwo.addClass("backBtnTwo")
    $("#recipe").append(backButtonTwo)
    })
})
//back button two
$(document).on("click", ".backBtnTwo", function(event){
    event.preventDefault()
    $("#recipe-list").empty();
    $("#recipe").empty();
    getRecipes()
})
