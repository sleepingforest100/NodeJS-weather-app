# Weather App

This is a simple Express.js web application that provides weather information, NASA APOD data, and news articles.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

## Usage
Set up your environment variables:  
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key  
NASA_API_KEY=your_nasa_api_key  
NEWS_API_KEY=your_news_api_key  

# Start the server:
npm start  
The server will be running at http://localhost:3000 by default.  

# APIs Used:
- OpenWeatherMap API for weather data
- NASA APOD API for astronomy pictures
- NewsAPI for news articles

# Endpoints
/api/v1/weather/:city - Get weather data for a specific city.  
/apod - Get NASA APOD (Astronomy Picture of the Day) data.  
/news - Get top news articles.  


