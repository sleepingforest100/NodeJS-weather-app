const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const api_key = '5164c9e922e9a48929e05e633713f7ff';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weatherData: null, error: null });
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weatherData: null, error: 'Error, please try again' });
    } else {
      let weatherData = JSON.parse(body);

      if (weatherData.main == undefined) {
        res.render('index', { weatherData: null, error: 'Error, please try again' });
      } else {
        let weatherInfo = {
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          coordinates: {
            latitude: weatherData.coord.lat,
            longitude: weatherData.coord.lon
          },
          feelsLike: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          windSpeed: weatherData.wind.speed,
          country: weatherData.sys.country,
          rainVolumeLast3Hours: weatherData.rain ? weatherData.rain['3h'] : 0
        };

        res.render('index', { weatherData: weatherInfo, error: null });
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Weather app listening on port 3000!');
});
