const axios = require('axios');

document.addEventListener('DOMContentLoaded', function () {
    const cityName = prompt('Enter city name:');

    if (cityName) {
        geocodeCity(cityName, function (error, result) {
            if (error) {
                alert('Error: ' + error);
            } else {
                // Use the geocoded result to display a map
                displayMap(result.geometry.lat, result.geometry.lng, result.formatted);
            }
        });
    }
});

function displayMap(latitude, longitude, address) {
    console.log('City:', address);
    console.log('Coordinates:', latitude, longitude);

    var map = L.map('map').setView([latitude, longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(address)
        .openPopup();
}

function geocodeCity(city, callback) {
    axios({
        method: 'GET',
        url: 'https://api.opencagedata.com/geocode/v1/json',
        params: {
            q: city,
            key: 'b3194bd1ada14d41a963cfff6b0fa389'
        }
    })
    .then(response => {
        callback(undefined, response.data.results[0]);
    })
    .catch(error => {
        console.error('Error fetching geocoding information:', error);
        callback('Error fetching geocoding information');
    });
}
