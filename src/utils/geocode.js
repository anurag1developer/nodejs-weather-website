const request = require('postman-request');

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW51cmFnYnVkYWtvdGkiLCJhIjoiY2s5ODJpaGxkMHU5aTNucGM2MzczcW82NyJ9.aii1G8Y9X5etD9IDOahgtA&limit=1';
    request({ url: geocodeUrl, json: true }, (error, response) => {
        const { message, features } = response.body;
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (message) {
            callback(message, undefined);
        } else if (features.length === 0) {
            callback('Unable to find location, Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode;