//main script

var countries = {
    UnitedKingdom: {name: "United Kingdom", abbr: "GB", cuisine: "British"},
    France: {name: "France", abbr: "FR", cuisine: "French"},
    Tunisia: {name: "Tunisia", abbr: "", cuisine: "Tunisian"},
    Japan: {name: "Japan", abbr: "JP", cuisine: "Japanese"},
    Canada: {name: "Canada", abbr: "", cuisine: "Canadian"},
    China: {name: "China", abbr: "", cuisine: "Chinese"},
    Netherlands: {name: "Netherlands", abbr: "", cuisine: "Dutch"},
    Egypt: {name: "Egypt", abbr: "", cuisine: "Egyptian"},
    Greece: {name: "Greece", abbr: "", cuisine: "Greek"},
    India: {name: "India", abbr: "", cuisine: "Indian"},
    Ireland: {name: "Ireland", abbr: "", cuisine: "Irish"},
    Italy: {name: "Italy", abbr: "", cuisine: "Italian"},
    Jamaica: {name: "Jamaica", abbr: "", cuisine: "Jamaican"},
    Kenya: {name: "Kenya", abbr: "KE", cuisine: "Kenyan"},
    Malaysia: {name: "Malaysia", abbr: "MY", cuisine: "Malaysian"},
    Mexico: {name: "Mexico", abbr: "MX", cuisine: "Mexican"},
    Morocco: {name: "Morocco", abbr: "MA", cuisine: "Moroccan"},
    Poland: {name: "Poland", abbr: "PL", cuisine: "Polish"},
    Russia: {name: "Russia", abbr: "RU", cuisine: "Russian"},
    Spain: {name: "Spain", abbr: "ES", cuisine: "Spanish"},
    Thailand: {name: "Thailand", abbr: "TH", cuisine: "Thai"},
    Tunisia: {name: "Tunisia", abbr: "TN", cuisine: "Tunisian"},
    Turkey: {name: "Turkey", abbr: "TR", cuisine: "Turkish"}
}

console.log(countries.UnitedKingdom.cuisine);

//calendarific
// API KEY: 963eb84b09e849ae6b1ab4fa1201730ea69687c5
// https://calendarific.com/api/v2/holidays?&api_key=963eb84b09e849ae6b1ab4fa1201730ea69687c5&country=US&year=2019'
var calendarificURL = "https://calendarific.com/api/v2/holidays?&api_key=963eb84b09e849ae6b1ab4fa1201730ea69687c5&country=US&year=2020"

    $.ajax({
        url: calendarificURL,
        method: "GET"
    }).then(function(calendarResponse) {
    console.log(calendarResponse);
    })