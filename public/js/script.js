// Get references to HTML elements
const city = document.getElementById("city");
const submitBtn = document.getElementById("submit-city");
const renderDetails = document.getElementById("weather-details-container");

// Array of months for date formatting
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

// URL for weather icons
const iconUrl = "http://openweathermap.org/img/wn/";

// Event listener for the search button
submitBtn.addEventListener("click", async () => {
  console.log(city.value);
  const cityName = city.value;

  // Fetch weather data from the server with additional parameters
  const res = await fetch(`/api/v1/weather/${cityName}?include=feels_like,humidity,pressure,wind,country,rain`);
  const weather = await res.json();

  // Check for errors in the response
  if (!weather.error) {
    // Render weather details
    renderCard(weather.data);
  } else {
    // Display an error message
    showError(weather);
  }
});

// Function to render weather details on the page
const renderCard = (data) => {
  const { name, dt, coord, main, weather, wind, sys, rain } = data;

  // Format the date
  const currentDate = new Date(dt * 1000);
  const date = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // Create HTML template for the weather card
  let template = `
    <div class="card">
      <div class="cart-title d-flex flex-row justify-content-between container-fluid">
        <h3>${name}</h3>
        <p><i class="fas fa-calendar-day"></i> Date: ${date}</p>
      </div>
      <div class="card-body custom-grid">
        <div class="weather">
          <h4>
            <img src="${iconUrl}${weather[0].icon}@2x.png" />
            ${weather[0].main}
          </h4>
        </div>
        <div class="cord">
          <h4>
            <i class="fas fa-map-marker-alt text-primary"></i
            >&nbsp;Co-Ordinates
          </h4>
          <p><strong>long:</strong> ${coord.lon} <strong>lat:</strong> ${coord.lat}</p>
        </div>
        <div class="main">
          <h4><i class="fas fa-temperature-low"></i>&nbsp;Temp</h4>
          <p><strong>Current: </strong>${parseFloat(main.temp - 273.15).toPrecision(4)}&deg; C</p>
          <p><strong>Feels like: </strong>${parseFloat(main.feels_like - 273.15).toPrecision(4)}&deg; C</p>
          <p><strong>Humidity: </strong>${main.humidity}%</p>
          <p><strong>Pressure: </strong>${main.pressure} hPa</p>
        </div>
        <div class="wind">
          <h4><i class="fas fa-wind"></i>&nbsp;Wind</h4>
          <p><strong>Speed: </strong>${wind.speed} m/s</p>
        </div>
        <div class="sys">
          <h4><i class="fas fa-globe"></i>&nbsp;Country</h4>
          <p>${sys.country}</p>
        </div>
        <div class="rain">
          <h4><i class="fas fa-tint"></i>&nbsp;Rain (last 3h)</h4>
          <p>${rain ? `${rain["3h"]} mm` : "N/A"}</p>
        </div>
        <div class="map" id="map"></div> <!-- div for the map -->
      </div>
    </div>
  `;

  // Clear the input and render the template
  city.value = "";
  renderDetails.innerHTML = template;
};

// Create a map
const map = L.map("map").setView([0, 0], 2);

// Add a tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker for the city
L.marker([coord.lat, coord.lon]).addTo(map)
  .bindPopup(`<b>${name}</b><br>${coord.lat}, ${coord.lon}</br>`)
  .openPopup();


// Function to display an error message
const showError = (err) => {
  city.value = "";
  renderDetails.innerHTML = "";

  // Create an error message template
  let temp = `
    <div class="card card-body error text-center">
        <h2>${err.message}. Please try again later.</h2>
    </div>
  `;

  // Display the error message and reload the page after 5 seconds
  renderDetails.innerHTML = temp;

  setTimeout(() => {
    window.location.reload();
  }, 5000);
};
