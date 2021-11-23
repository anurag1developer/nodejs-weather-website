const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const weatherstackUrl = 'http://api.weatherstack.com/current?access_key=3f1fb350066c18975ab252a218de09b3&query=' + latitude + ',' + longitude + '&units=f';
    request({ url: weatherstackUrl, json: true }, (error, response) => {
        const { error: err, current } = response.body;
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (err) {
            callback(err.info, undefined);
            callback('Unable to find location.', undefined);
        }
        else {
            const weatherStackData = current;
            const feel = weatherStackData.weather_descriptions[0] + '. It is currently ' +
                weatherStackData.temperature + ' degrees out. It feels like ' +
                weatherStackData.feelslike + ' degrees out.' + ' Humidity: ' +
                weatherStackData.humidity;
            callback(undefined, feel);
        }
    })
}

module.exports = forecast;