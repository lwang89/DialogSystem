const request = require('request');
const argv = require('yargs').argv;

let apiKey = '4767cfa6ea58a90ee0c3cce7f2cea070';
//let city = 'portland';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

module.exports = request(url, function (err, response, body) {
  if(err){
    console.log('error:', err);
  } else {
    let weather = JSON.parse(body);
    console.log(JSON.stringify(weather));
    //let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    //console.log(message);
    //console.log('body:', body);
  }
});



