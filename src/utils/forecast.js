const request = require('request');


//my token -- 728d949846f3c9b2a9c873d88041aad6
const forecast = (latitude, longitude, cb) => {
    // const url = 'http://api.weatherstack.com/current?access_key=728d949846f3c9b2a9c873d88041aad6&query=' + latitude + ',' + longitude + '&units=m';
    const url = 'http://api.weatherstack.com/current?access_key=c54bc5bd14051bfae69d7bdc0304d83f&query=' + latitude + ',' + longitude + '&units=m';
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            cb('Error: Connection Problem Detected!')
        } else if (response.body.error) {
            cb('Error: Couldn\'t find location...');
        } else {
            console.log(response.body)
            // cb(undefined, `In ${response.body.location.region}, ${response.body.location.country}, the temperature today will be ${response.body.current.temperature} degrees Celcius. Expected weather throughout the day: ${response.body.current.weather_descriptions}`);
            cb(undefined, `Weather: ${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature}°C with ${response.body.current.humidity}% humidity and a UV index of ${response.body.current.uv_index}. There is a ${response.body.current.precip}% chance of rain.`)
        }
    })
}


module.exports = forecast;