var city;
var cityID;
var zAPIkey = "9ec596d30e9780fcee974a3cbaeb59a2";
var restaurantID;

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
    Kenya: { name: "Kenya", abbr: "KE", cuisine: "Kenyan", zID: "" },
    Malaysia: { name: "Malaysia", abbr: "MY", cuisine: "Malaysian", zID: "69" },
    Mexico: { name: "Mexico", abbr: "MX", cuisine: "Mexican", zID: "73" },
    Morocco: { name: "Morocco", abbr: "MA", cuisine: "Moroccan", zID: "147" },
    Netherlands: { name: "Netherlands", abbr: "NL", cuisine: "Dutch", zID: "" },
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

function getCity() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city;
    $.ajax({
        url: zomatoURL,
        dataType: "json",
        async: true,
        beforeSend: function (xhr) { xhr.setRequestHeader("user-key", zAPIkey); },
        success: function (response) {
            if (response.location_suggestions.length > 1) {
                var message = $("<p>").appendTo($("#restaurant-list"));
                message.text("We found a few options for that city. Please click on the best match.")
                for (var i = 0; i < response.location_suggestions.length; i++) {
                    var cityOption = response.location_suggestions[i].name;
                    var cityBtn = $("<button>");
                    cityBtn.text(cityOption);
                    cityBtn.addClass("cityBtn");
                    cityBtn.addClass("hollow button");
                    cityBtn.attr("id", response.location_suggestions[i].id);
                    $("#restaurant-list").append(cityBtn);
                }
            } else if (response.location_suggestions.length === 0) {
                alert("sorry, couldn't find that city! try again");
            } else {
                cityID = response.location_suggestions[0].id;
                getRestaurants();
            }
        }
    });
}

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
                console.log(response);
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
                    rstImage.attr("src", response.restaurants[i].restaurant.thumb);
                    rstImage.appendTo(rstCardSection);
                    var rstInfo = $("<p>");
                    rstInfo.text("STARS: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
                    rstInfo.appendTo(rstCardSection);
                    restaurantCard.append(rstCardSection);
                    rstCardSection.appendTo(restaurantCard);
                    $("#restaurant-list").append(restaurantCard);
                }
            } else {
                alert("sorry, no restaurants with that particular cuisine in this city!");
            }
        }
    });
};

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
            var rstName = $("<h3>").appendTo(rstDetailsDiv);
            var rstDetails = $("<p>").appendTo(rstDetailsDiv);
            if (response.featured_image === "") {
                rstImage.attr("src", "Assets/Grains-Map_AdobeStock_46075922.jpeg");
            }else {
                rstImage.attr("src", response.featured_image);
            }
            rstName.text(response.name);
            rstDetails.text(response.location.address);
            $("#restaurant-list").append(rstDetailsDiv);
            var rstBackBtn = $("<button>");
            rstBackBtn.addClass("hollow button");
            rstBackBtn.attr("id", "rstBackBtn");
            rstBackBtn.text("Back to Restaurant List");
            $("#restaurant-list").append(rstBackBtn);
        }
    });
}

//EVENT LISTENER FOR CITY BUTTON TO SEARCH FOR RESTAURANTS
$(document).on("click", ".cityBtn", function(event) {
    event.preventDefault();
    cityID = $(this).attr("id");
    getRestaurants();
});

//EVENT LISTENER FOR CITY SEARCH BUTTON
$("#citySearchBtn").on("click", function(event) {
    event.preventDefault();
    city=$("#cityInput").val();
    $("#cityInput").val("");
    getCity();
});

//EVENT LISTENER FOR RESTAURANT BUTTON
$("#restaurantBtn").on("click", function(event) {
    event.preventDefault();
    $("#restaurant-list").empty();
    $("#recipe-list").empty();
    var form = $("<form>");
    var input = $("<input>");
    input.attr("id", "cityInput");
    var restaurantSearchBtn = $("<button>");
    restaurantSearchBtn.text("Find Restaurants");
    restaurantSearchBtn.attr("id", "restaurantSearchBtn");
    restaurantSearchBtn.addClass("hollow button");
    form.append(input);
    form.append(restaurantSearchBtn);
    $("#restaurant-list").append(form);
    $("#restaurnat-list").append(restaurantSearchBtn);
})

//EVENT LISTENER FOR RESTAURANT SEARCH BUTTON
$(document).on("click", "#restaurantSearchBtn", function(event){
    event.preventDefault();
    city=$("#cityInput").val();
    $("#cityInput").val("");
    getCity();
})

//EVENT LISTENER FOR RESTAURANT CARD
$(document).on("click", ".rstCard", function(event){
    event.preventDefault();
    restaurantID = $(this).attr("id");
    $("#restaurant-list").empty();
    getRestaurantDetails();
})

//EVENT LISTENER FOR RESTAURANT BACK BUTTON
$(document).on("click", "#rstBackBtn", function(event) {
    event.preventDefault()
    $("#restaurant-list").empty();
    getRestaurants();
})
