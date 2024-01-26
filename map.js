document.addEventListener('DOMContentLoaded', function () {
    // Prompt the user for city name
    const cityName = prompt('Enter city name:');

    if (cityName) {
        // Use OpenCage Geocoding API to get coordinates based on city name
        geocodeCity(cityName, function (error, result) {
            if (error) {
                alert('Error: ' + error);
            } else {
                // Display the map with the city's location
                displayMap(result.geometry.lat, result.geometry.lng, result.formatted);
            }
        });
    }
});

function geocodeCity(city, callback) {
    YOUR_OPENCAGE_API_KEY = 'b3194bd1ada14d41a963cfff6b0fa389'

    // Use OpenCage Geocoding API to get coordinates
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${YOUR_OPENCAGE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                callback(null, data.results[0]);
            } else {
                callback('Unable to geocode city');
            }
        })
        .catch(error => {
            console.error('Error fetching geocoding information:', error);
            callback('Error fetching geocoding information');
        });
}

function displayMap(latitude, longitude, address) {
    // Log coordinates and display a simple Leaflet map
    console.log('City:', address);
    console.log('Coordinates:', latitude, longitude);

    // Create a Leaflet map
    var map = L.map('map').setView([latitude, longitude], 10);

    // Add a base layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for the city
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(address)
        .openPopup();
}


