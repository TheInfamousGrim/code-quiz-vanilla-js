// API call variables
const quizIOAPIKey = 'Uvyti6DXt1klHzPKT90h8U7tc6ejhoCk45Jm05zb';
const quizQueryURL = `https://quizapi.io/api/v1/questions?apiKey=${quizIOAPIKey}&difficulty=Easy&limit=10&tags=JavaScript`;

// create a new XMLHttpRequestObject
const request = new XMLHttpRequest();

// Open a new connection, using the GET request
request.open('GET', quizQueryURL, true);

request.onload = function () {
        // Begin accessing JSON data here
};

// Send request
console.log(request.send());
