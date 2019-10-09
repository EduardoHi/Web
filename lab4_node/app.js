

const credentials = require('./credentials.js');
const request = require('request');

const darkSkyUrl = (lat, lon) => `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${lon}?lang=es&units=si`;
const mapBoxUrl = (city) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${credentials.MAPBOX_TOKEN}`;

const CITY = "San Pedro Garza García";

request(
    mapBoxUrl(CITY),
    function(error, response, body) {
        body = JSON.parse(body);
        const [lat,lon] = body.features[0].center;
        darkSkyRequest(lat,lon)
    }
)

darkSkyRequest = (lat,lon) => {
    request(
        darkSkyUrl(lon,lat),
        function (error, response, body) {
            body = JSON.parse(body)
            const msg = `${body.daily.data[0].summary} Actualmente esta a ${body.currently.temperature}°C. Hay ${body.currently.precipProbability*100}% de posibilidad de lluvia.`;
            console.log(msg);
        });
}
