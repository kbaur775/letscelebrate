/**************************************************************************************************  
DECLARE VARIABLES & OBJECTS
**************************************************************************************************/
var holidayDate
var holidayDescrip
var holidayName
var cAPIkey = "052cf6937be04479cc9f5e6158857c83696191b0";
var calendarificURL
var mealID
var city;
var cityID;
var zAPIkey = "9ec596d30e9780fcee974a3cbaeb59a2";
var restaurantID;
var country;
var month;

var countries = {
    Canada: { name: "Canada", abbr: "CA", cuisine: "Canadian", zID: "381" },
    China: { name: "China", abbr: "CN", cuisine: "Chinese", zID: "25" },
    Egypt: { name: "Egypt", abbr: "EG", cuisine: "Egyptian", zID: "146" },
    France: { name: "France", abbr: "FR", cuisine: "French", zID: "45" },
    Greece: { name: "Greece", abbr: "GR", cuisine: "Greek", zID: "156" },
    India: { name: "India", abbr: "IN", cuisine: "Indian", zID: "148" },
    Ireland: { name: "Ireland", abbr: "IE", cuisine: "Irish", zID: "135" },
    Italy: { name: "Italy", abbr: "IT", cuisine: "Italian", zID: "55" },
    Jamaica: { name: "Jamaica", abbr: "JM", cuisine: "Jamaican", zID: "207" },
    Japan: { name: "Japan", abbr: "JP", cuisine: "Japanese", zID: "60" },
    Malaysia: { name: "Malaysia", abbr: "MY", cuisine: "Malaysian", zID: "69" },
    Mexico: { name: "Mexico", abbr: "MX", cuisine: "Mexican", zID: "73" },
    Morocco: { name: "Morocco", abbr: "MA", cuisine: "Moroccan", zID: "147" },
    Poland: { name: "Poland", abbr: "PL", cuisine: "Polish", zID: "219" },
    Russia: { name: "Russia", abbr: "RU", cuisine: "Russian", zID: "84" },
    Spain: { name: "Spain", abbr: "ES", cuisine: "Spanish", zID: "89" },
    Thailand: { name: "Thailand", abbr: "TH", cuisine: "Thai", zID: "95" },
    Tunisia: { name: "Tunisia", abbr: "TN", cuisine: "Tunisian", zID: "761" },
    Turkey: { name: "Turkey", abbr: "TR", cuisine: "Turkish", zID: "142" },
    UnitedKingdom: { name: "United Kingdom", abbr: "GB", cuisine: "British", zID: "133" },
    UnitedStates: { name: "United States", abbr: "US", cuisine: "American", zID: "1" },
    Vietnam: { name: "Vietnam", abbr: "VN", cuisine: "Vietnamese", zID: "99" }
}

var months = {
    January: "1",
    February: "2",
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

/**************************************************************************************************  
DEFINE MAP FUNCTIONS
**************************************************************************************************/
//Initialize map on page load to show zoomed-out view of the world map
function initMap() {
    setMap(0, 0, 2);
}

//Change map to focus on location & place marker
function setMap(lat, lon, zoom) {
    var location = { lat: lat, lng: lon };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

/**************************************************************************************************  
DEFINE HOLIDAY/CALENDARIFIC FUNCTIONS
**************************************************************************************************/
//Get list of holidays corresponding to user input of country & month from Calendarific API
function getHolidays() {
    calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=" + cAPIkey + "&country=" + countries[country].abbr + "&year=2021&month=" + months[month] + "&type=national,local,religious";
    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function (calendarResponse) {
        var holidayList = $("#holiday-list");
        console.log(calendarResponse.response.holidays.length);
        if (calendarResponse.response.holidays.length === 0) {
            getMonthlyHolidays();
        } else {
            var instructions = $("<p>").text("Select a holiday to learn more!")
            instructions.addClass("instruction-styling")
            holidayList.append(instructions)
            for (var i = 0; i < calendarResponse.response.holidays.length; i++) {
                holidayName = calendarResponse.response.holidays[i].name
                var hOne = $("<h4>").text(holidayName);
                hOne.attr("id", i)
                hOne.attr("class", "holiday-list-item");
                holidayList.removeClass("hide")
                holidayList.append(hOne)
            }
        }
    })
}

//If user chooses country+month pair that returns no results, gets list of country's holidays for full year, 
//tracks which months have holidays, and displays message to user
function getMonthlyHolidays() {
    calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=" + cAPIkey + "&country=" + countries[country].abbr + "&year=2021&type=national,local,religious";
    var trueMonths = [];
    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function (calendarResponse) {
        for (var m = 1; m < 13; m++) {
            for (var i = 0; i < calendarResponse.response.holidays.length; i++) {
                if (calendarResponse.response.holidays[i].date.datetime.month === m) {
                    var index = m - 1;
                    trueMonths.push((Object.keys(months)[index]));
                    break;
                }
            }
        }
        var message1 = $("<p>").text("There are no holidays in " + country + " in " + month + " in our database.")
        var message2 = $("<p>").text(country + " has holidays in " + trueMonths.join(", ") + ".")
        $("#messageDiv").append(message1).append(message2);
    })
}

/**************************************************************************************************  
DEFINE RECIPE/MEALDB FUNCTIONS
**************************************************************************************************/
//Get list of recipes corresponding to user input of country/cuisine from MealDB API
function getRecipes() {
    $("#recipe-list").empty();
    var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + countries[country].cuisine;
    $.ajax({
        url: mealURL,
        method: "GET"
    }).then(function (mealResponse) {
        var mealList = $("#recipe-list");
        for (var i = 0; i < mealResponse.meals.length; i++) {
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
        }
    })
}

/**************************************************************************************************  
DEFINE RESTAURANT/ZOMATO FUNCTIONS
**************************************************************************************************/
//Get city ID using Zomato API
//If user input matches more than one city, generate buttons that represent potential city matches
function getCity() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city;
    $.ajax({
        url: zomatoURL,
        dataType: "json",
        async: true,
        beforeSend: function (xhr) { xhr.setRequestHeader("user-key", zAPIkey); },
        success: function (response) {
            if (response.location_suggestions.length > 1) {
                $("#cityMessage").empty();
                var message = $("<p>").appendTo($("#cityMessage"));
                message.text("We found a few matches for that city name. Please click on the best match.")
                for (var i = 0; i < response.location_suggestions.length; i++) {
                    var cityOption = response.location_suggestions[i].name;
                    var cityBtn = $("<button>");
                    cityBtn.text(cityOption);
                    cityBtn.addClass("cityBtn");
                    cityBtn.addClass("hollow button");
                    cityBtn.attr("id", response.location_suggestions[i].id);
                    $("#cityMessage").append(cityBtn);
                }
            } else if (response.location_suggestions.length === 0) {
                $("#cityMessage").empty();
                var errorMessage = $("<p>").text("Sorry, we couldn't find that city! Please try again.");
                $("#cityMessage").append(errorMessage);
            } else {
                cityID = response.location_suggestions[0].id;
                $("#cityMessage").empty();
                $("#restaurant-list").addClass("grid-x grid-margin-x small-up-2 medium-up-3");
                getRestaurants();
            }
        }
    });
}

//Get list of restaurants corresponding to user input of country/cuisine AND city using Zomato API
function getRestaurants() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&cuisines=" + countries[country].zID;
    $.ajax({
        url: zomatoURL,
        dataType: "json",
        async: true,
        beforeSend: function (xhr) { xhr.setRequestHeader("user-key", zAPIkey); },
        success: function (response) {
            $("#restaurant-list").empty();
            if (response.restaurants.length > 0) {
                for (var i = 0; i < response.restaurants.length; i++) {
                    var restaurantName = response.restaurants[i].restaurant.name;
                    var restaurantCard = $("<div>");
                    restaurantCard.addClass("card rstCard");
                    restaurantCard.attr("id", response.restaurants[i].restaurant.R.res_id);
                    var rstCardDivider = $("<div>");
                    rstCardDivider.addClass("card-divider");
                    rstCardDivider.appendTo(restaurantCard);
                    var rstCardHeader = $("<h5>");
                    rstCardHeader.text(restaurantName);
                    rstCardHeader.appendTo(rstCardDivider);
                    var rstCardSection = $("<div>");
                    rstCardSection.addClass("card-section");
                    var rstImage = $("<img>");
                    if (response.restaurants[i].restaurant.thumb === "") {
                        rstImage.attr("src", "Assets/restaurantThumbnailPlaceholder.png");
                    } else {
                        rstImage.attr("src", response.restaurants[i].restaurant.thumb);
                    }
                    rstImage.appendTo(rstCardSection);
                    var rstInfo = $("<p>");
                    rstInfo.text("STARS: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
                    rstInfo.appendTo(rstCardSection);
                    restaurantCard.append(rstCardSection);
                    rstCardSection.appendTo(restaurantCard);
                    $("#restaurant-list").append(restaurantCard);
                }
            } else {
                $("#cityMessage").text("Sorry, no restaurants with that particular cuisine in this city! Try searching a different city, or check out available recipes.");
            }
        }
    });
};

//Get more detailed information about a particular restaurant & display to user
function getRestaurantDetails() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantID;
    $.ajax({
        url: zomatoURL,
        dataType: "json",
        async: true,
        beforeSend: function (xhr) { xhr.setRequestHeader("user-key", zAPIkey); },
        success: function (response) {
            var rstDetailsDiv = $("<div>");
            var rstImage = $("<img>").appendTo(rstDetailsDiv);
            rstImage.addClass("rstImage");
            var rstName = $("<h3>").appendTo(rstDetailsDiv);
            var rstStars = $("<p>").appendTo(rstDetailsDiv);
            var rstAddress = $("<p>").appendTo(rstDetailsDiv);
            var rstPhone = $("<p>").appendTo(rstDetailsDiv);
            var rstWebsite = $("<a>").appendTo(rstDetailsDiv);
            if (response.featured_image === "") {
                rstImage.attr("src", "Assets/Grains-Map_AdobeStock_46075922.jpeg");
            } else {
                rstImage.attr("src", response.featured_image);
            }
            rstName.text(response.name);
            rstStars.text("STARS: " + response.user_rating.aggregate_rating);
            rstAddress.text(response.location.address);
            rstPhone.text(response.phone_numbers);
            rstWebsite.text(response.url);
            rstWebsite.attr("href", response.url);
            rstWebsite.attr("target", "_blank");
            $("#restaurant-list").append(rstDetailsDiv);
            var rstBackBtn = $("<button>");
            rstBackBtn.addClass("hollow button");
            rstBackBtn.attr("id", "rstBackBtn");
            rstBackBtn.text("Back to Restaurant List");
            $("#restaurant-list").append(rstBackBtn);
        }
    });
}

/**************************************************************************************************  
ADD HOLIDAY SEARCH MENU EVENT LISTENERS
**************************************************************************************************/
//EVENT LISTENER FOR COUNTRY DROPDOWN MENU
$("#countries").change(function() {
    $("#holiday-list").empty();
    $("#recipe-list").empty();
    $("#recipe").empty();
    $("#restaurant-list").empty();
    $("#city-message").empty();
    $("#food-container").addClass("hide");
    country = (this.value);
    var search = country
    var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyAgXL4y4IhyRIFEYBF9wke-Ex5X6m3sWhc"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        var lat = response.results[0].geometry.location.lat
        var lon = response.results[0].geometry.location.lng
        setMap(lat, lon, 3)
    })
});

//EVENT LISTENER FOR MONTH DROPDOWN MENU
$("#month").change(function() {
    month = (this.value);
})

//EVENT LISTENER FOR SEARCH BUTTON
$("#searchBtn").on("click", function(event) {
    $("#holiday-list").empty();
    $("#messageDiv").empty();
    $("#recipe-list").empty();
    $("#recipe").empty();
    $("#restaurant-list").empty();
    $("#food-container").addClass("hide");
    $("#holiday-list").removeClass("chosen");
    event.preventDefault();
    getHolidays();
})

/**************************************************************************************************  
ADD HOLIDAY NAMES & BUTTONS EVENT LISTENERS
**************************************************************************************************/
//GET HOLIDAY DETAILS BY CLICKING ON HOLIDAY NAME IN LIST
$(document).on("click", "h4", function(event) {
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
        backButton = $("<button>").text("Back to Holidays")
        backButton.addClass("backBtn")
        backButton.addClass("hollow button")
        nextStepButton = $("<button>").text("Explore Food Options")
        nextStepButton.addClass("nextBtn")
        nextStepButton.addClass("hollow button")
        $("#holiday-list").append(hOne)
        $("#holiday-list").append(pTwo)
        $("#holiday-list").append(pThree)
        $("#holiday-list").append(backButton)
        $("#holiday-list").append(nextStepButton)
    })
})

//BACK-TO-HOLIDAY-LIST BUTTON 
$(document).on("click", ".backBtn", function(event) {
    event.preventDefault()
    $("#holiday-list").empty();
    getHolidays()
})

//NEXT BUTTON "EXPLORE FOOD OPTIONS"
$(document).on("click", ".nextBtn", function(event) {
    event.preventDefault()
    $("#shout2").empty();
    $("#holiday-list").addClass("chosen");
    $("#food-container").removeClass("hide");
    var instructions = $("<p>").text("Now that you've chosen a holiday, let's celebrate with some cuisine from " + country + "! Choose 'Recipes' to get a list of recipes to prepare at home, or choose 'Restaurants' to find restaurants in your city.")
    instructions.addClass("instruction-styling");
    var recipeBtn = $("<button>").text("Recipes");
    recipeBtn.addClass("hollow button");
    recipeBtn.attr("id", "recipeBtn");
    var restaurantBtn = $("<button>").text("Restaurants");
    restaurantBtn.addClass("hollow button");
    restaurantBtn.attr("id", "restaurantBtn");
    $("#shout2").append(instructions);
    $("#shout2").append(recipeBtn).append(restaurantBtn);
    $(".nextBtn").addClass("hide");
    $(".backBtn").addClass("hide");
})

/**************************************************************************************************  
ADD RECIPE EVENT LISTENERS
**************************************************************************************************/
//RECIPE BUTTON
$(document).on("click", "#recipeBtn", function(event) {
    $("#recipe-list").empty();
    $("#recipe").empty();
    $("#restaurant-list").empty();
    $("#cityMessage").empty();
    event.preventDefault();
    getRecipes();
})

//RECIPE CARD
$(document).on("click", "img", function(event) {
    event.preventDefault()
    mealID = this.id
    $("#shout2").addClass("hide")
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
        var ingSeven = $("<li>").text(mealIdResponse.meals[0].strMeasure7 + " " + mealIdResponse.meals[0].strIngredient7)
        var ingEight = $("<li>").text(mealIdResponse.meals[0].strMeasure8 + " " + mealIdResponse.meals[0].strIngredient8)
        var ingNine = $("<li>").text(mealIdResponse.meals[0].strMeasure9 + " " + mealIdResponse.meals[0].strIngredient9)
        var ingTen = $("<li>").text(mealIdResponse.meals[0].strMeasure10 + " " + mealIdResponse.meals[0].strIngredient10)
        var ingEleven = $("<li>").text(mealIdResponse.meals[0].strMeasure11 + " " + mealIdResponse.meals[0].strIngredient11)
        var ingTwelve = $("<li>").text(mealIdResponse.meals[0].strMeasure12 + " " + mealIdResponse.meals[0].strIngredient12)
        var ingThirteen = $("<li>").text(mealIdResponse.meals[0].strMeasure13 + " " + mealIdResponse.meals[0].strIngredient13)
        var ingFourteen = $("<li>").text(mealIdResponse.meals[0].strMeasure14 + " " + mealIdResponse.meals[0].strIngredient14)
        var ingFifteen = $("<li>").text(mealIdResponse.meals[0].strMeasure15 + " " + mealIdResponse.meals[0].strIngredient15)
        var ingSixteen = $("<li>").text(mealIdResponse.meals[0].strMeasure16 + " " + mealIdResponse.meals[0].strIngredient16)
        var ingSeventeen = $("<li>").text(mealIdResponse.meals[0].strMeasure17 + " " + mealIdResponse.meals[0].strIngredient17)
        var ingEighteen = $("<li>").text(mealIdResponse.meals[0].strMeasure18 + " " + mealIdResponse.meals[0].strIngredient18)
        var ingNineteen = $("<li>").text(mealIdResponse.meals[0].strMeasure19 + " " + mealIdResponse.meals[0].strIngredient19)
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
        if (mealIdResponse.meals[0].strIngredient1) {
            $("#recipe").append(ingOne)
        }
        if (mealIdResponse.meals[0].strIngredient2) {
            $("#recipe").append(ingTwo)
        }
        if (mealIdResponse.meals[0].strIngredient3) {
            $("#recipe").append(ingThree)
        }
        if (mealIdResponse.meals[0].strIngredient4) {
            $("#recipe").append(ingFour)
        }
        if (mealIdResponse.meals[0].strIngredient5) {
            $("#recipe").append(ingFive)
        }
        if (mealIdResponse.meals[0].strIngredient6) {
            $("#recipe").append(ingSix)
        }
        if (mealIdResponse.meals[0].strIngredient7) {
            $("#recipe").append(ingSeven)
        }
        if (mealIdResponse.meals[0].strIngredient8) {
            $("#recipe").append(ingEight)
        }
        if (mealIdResponse.meals[0].strIngredient9) {
            $("#recipe").append(ingNine)
        }
        if (mealIdResponse.meals[0].strIngredient10) {
            $("#recipe").append(ingTen)
        }
        if (mealIdResponse.meals[0].strIngredient11) {
            $("#recipe").append(ingEleven)
        }
        if (mealIdResponse.meals[0].strIngredient12) {
            $("#recipe").append(ingTwelve)
        }
        if (mealIdResponse.meals[0].strIngredient13) {
            $("#recipe").append(ingThirteen)
        }
        if (mealIdResponse.meals[0].strIngredient14) {
            $("#recipe").append(ingFourteen)
        }
        if (mealIdResponse.meals[0].strIngredient15) {
            $("#recipe").append(ingFifteen)
        }
        if (mealIdResponse.meals[0].strIngredient16) {
            $("#recipe").append(ingSixteen)
        }
        if (mealIdResponse.meals[0].strIngredient17) {
            $("#recipe").append(ingSeventeen)
        }
        if (mealIdResponse.meals[0].strIngredient18) {
            $("#recipe").append(ingEighteen)
        }
        if (mealIdResponse.meals[0].strIngredient19) {
            $("#recipe").append(ingNineteen)
        }
        if (mealIdResponse.meals[0].strIngredient20) {
            $("#recipe").append(ingTwenty)
        }
        $("#recipe").append(instructions)
        backButtonTwo = $("<button>").text("Back to Recipe List")
        backButtonTwo.addClass("backBtnTwo")
        backButtonTwo.addClass("hollow button")
        $("#recipe").append(backButtonTwo)
    })
})

//BACK-TO-RECIPE-LIST BUTTON
$(document).on("click", ".backBtnTwo", function (event) {
    event.preventDefault()
    $("#recipe-list").empty();
    $("#recipe").empty();
    $("#shout2").removeClass("hide");
    getRecipes()
})

/**************************************************************************************************  
ADD RESTAURANT & CITY EVENT LISTENERS
**************************************************************************************************/
//RESTAURANT BUTTON - PROMPTS USER FOR CITY TO SEARCH
$(document).on("click", "#restaurantBtn", function (event) {
    event.preventDefault();
    $("#restaurant-list").empty();
    $("#recipe-list").empty();
    $("#restaurant-list").removeClass("grid-x grid-margin-x small-up-2 medium-up-3");
    var form = $("<form>");
    var label = $("<label>");
    label.text("Enter a city and search for restaurants:")
    form.append(label);
    var input = $("<input>");
    input.attr("id", "cityInput");
    var restaurantSearchBtn = $("<button>");
    restaurantSearchBtn.text("Find Restaurants");
    restaurantSearchBtn.attr("id", "restaurantSearchBtn");
    restaurantSearchBtn.addClass("hollow button");
    form.append(input);
    form.append(restaurantSearchBtn);
    $("#restaurant-list").append(form);
})

//CITY SEARCH BUTTON - GETS CITY MATCHES FOR USER INPUT
$("#citySearchBtn").on("click", function (event) {
    event.preventDefault();
    $("#restaurant-list").empty();
    $("#cityMessage").empty();
    city = $("#cityInput").val();
    $("#cityInput").val("");
    $("#restaurant-list").removeClass("grid-x grid-margin-x small-up-2 medium-up-3");
    getCity();
});

//CITY BUTTON TO SEARCH FOR RESTAURANTS IN THAT CITY
$(document).on("click", ".cityBtn", function (event) {
    event.preventDefault();
    $("#cityMessage").empty();
    cityID = $(this).attr("id");
    $("#restaurant-list").addClass("grid-x grid-margin-x small-up-2 medium-up-3");
    getRestaurants();
});

//RESTAURANT SEARCH BUTTON
$(document).on("click", "#restaurantSearchBtn", function (event) {
    event.preventDefault();
    city = $("#cityInput").val();
    $("#cityInput").val("");
    getCity();
})

//RESTAURANT CARD
$(document).on("click", ".rstCard", function (event) {
    event.preventDefault();
    restaurantID = $(this).attr("id");
    $("#restaurant-list").empty();
    $("#restaurant-list").removeClass("grid-x grid-margin-x small-up-2 medium-up-3");
    getRestaurantDetails();
})

//RESTAURANT BACK BUTTON
$(document).on("click", "#rstBackBtn", function (event) {
    event.preventDefault()
    $("#restaurant-list").empty();
    $("#restaurant-list").addClass("grid-x grid-margin-x small-up-2 medium-up-3");
    $("#shout2").removeClass("hide");
    getRestaurants();
})
