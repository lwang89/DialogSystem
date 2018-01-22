const request = require('request');
const argv = require('yargs').argv;

let apiKey = '4767cfa6ea58a90ee0c3cce7f2cea070';
//let city = 'portland';
//let city = argv.c || 'portland';


//let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

//need to define get current weather, or forcast

const getWeather = function(location) {
  let city = location || 'portland';
  //If you use Celsius you’d add: units=metric and if you use Fahrenheit you’d use units=imperial
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  // Return new promise
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (err) {
        console.log('error:', err);
        reject(err);
      } else {
        let weather = JSON.parse(body);
        //console.log(JSON.stringify(weather));
        resolve(weather);
      }
    });
  });
}

const getForecast = function(location) {
  let city = location || 'portland';
  //If you use Celsius you’d add: units=metric and if you use Fahrenheit you’d use units=imperial
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
  //openweathermap.org/data/2.5/forecast?q=
  // Return new promise
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (err) {
        console.log('error:', err);
        reject(err);
      } else {
        let weather = JSON.parse(body);
        console.log(JSON.stringify(weather));
        resolve(weather);
      }
    });
  });
}

module.exports = {
  getWeather,
  getForecast
}