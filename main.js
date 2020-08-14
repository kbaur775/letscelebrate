//main script

var countries = {
    Canada: {name: "Canada", abbr: "CA", cuisine: "Canadian"},
    China: {name: "China", abbr: "CN", cuisine: "Chinese"},
    Egypt: {name: "Egypt", abbr: "EG", cuisine: "Egyptian"},
    France: {name: "France", abbr: "FR", cuisine: "French"},
    Greece: {name: "Greece", abbr: "GR", cuisine: "Greek"},
    India: {name: "India", abbr: "IN", cuisine: "Indian"},
    Ireland: {name: "Ireland", abbr: "IE", cuisine: "Irish"},
    Italy: {name: "Italy", abbr: "IT", cuisine: "Italian"},
    Jamaica: {name: "Jamaica", abbr: "JM", cuisine: "Jamaican"},
    Japan: {name: "Japan", abbr: "JP", cuisine: "Japanese"},
    Kenya: {name: "Kenya", abbr: "KE", cuisine: "Kenyan"},
    Malaysia: {name: "Malaysia", abbr: "MY", cuisine: "Malaysian"},
    Mexico: {name: "Mexico", abbr: "MX", cuisine: "Mexican"},
    Morocco: {name: "Morocco", abbr: "MA", cuisine: "Moroccan"},
    Netherlands: {name: "Netherlands", abbr: "NL", cuisine: "Dutch"},
    Poland: {name: "Poland", abbr: "PL", cuisine: "Polish"},
    Russia: {name: "Russia", abbr: "RU", cuisine: "Russian"},
    Spain: {name: "Spain", abbr: "ES", cuisine: "Spanish"},
    Thailand: {name: "Thailand", abbr: "TH", cuisine: "Thai"},
    Tunisia: {name: "Tunisia", abbr: "TN", cuisine: "Tunisian"},
    Turkey: {name: "Turkey", abbr: "TR", cuisine: "Turkish"},
    UnitedKingdom: {name: "United Kingdom", abbr: "GB", cuisine: "British"},
    UnitedStates: {name: "United States", abbr: "US", cuisine: "American"},
    Vietnam: {name: "Vietnam", abbr: "VN", cuisine: "Vietnamese"}
}

console.log(countries.UnitedKingdom.cuisine);

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

