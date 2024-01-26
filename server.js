const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Serve static files from the "public" directory
app.use(express.static("./public"));

// API key for OpenWeatherMap
const api_key = '5164c9e922e9a48929e05e633713f7ff';

// Parse JSON requests
app.use(express.json());

// API endpoint to get weather data for a specific city
app.get("/api/v1/weather/:city", (req, res) => {
  try {
    const city = req.params.city;
    // Make a request to the OpenWeatherMap API
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`,
      )
      .then((response) => {
        const weatherData = response.data;
        // Send the weather data in the response
        res.status(200).json({
          status: 200,
          error: false,
          data: weatherData,
        });
      })
      .catch((err) => {
        // Handle errors if the API request fails
        res.status(404).json({
          status: 404,
          error: true,
          message: err.message,
        });
      });
  } catch (err) {
    // Handle errors if there's an issue with the request
    res.status(400).json({
      status: 400,
      error: true,
      message: err,
    });
  }
});

// Define the port to run the server on
const port = process.env.PORT || 3000;

// Start the server and log the port number
app.listen(port, () => console.log(`Server is running on ${port}`));
