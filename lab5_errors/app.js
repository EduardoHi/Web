

const credentials = require('./credentials.js');
const request = require('request');

const dskey = credentials.DARK_SKY_SECRET_KEY;
const mbkey = credentials.MAPBOX_TOKEN;

const darkSkyUrl = (lat, lon) => `https://api.darksky.net/forecast/${dskey}/${lat},${lon}?lang=es&units=si`;
const mapBoxUrl = (city) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mbkey}`;

const CITY = "San Pedro Garza García";

function handleErr(error, cont) {
    if(error) {
        console.log(`Could not connect with ${error.host}`);
        console.log("Check your internet connection?");
        return () => false;
    }
    cont();
}

request(
    mapBoxUrl(CITY),
    function(error, _response, body) {
        handleErr(error, () => {
            body = JSON.parse(body);
            if(body.message) {
                console.log("MapBox:\n\t" + body.message);
                return;
            }
            const [lat,lon] = body.features[0].center;
            darkSkyRequest(lat,lon)
        });
    }
)

darkSkyRequest = (lat,lon) => {
    request(
        darkSkyUrl(lon,lat),
        function(error, _response, body) {
            handleErr(error, () => {
                body = JSON.parse(body);

                if(body.code === 403) {
                    console.log(`DarkSky:\n\tError code: ${body.code}, message: ${body.error}`);
                    return;
                }
                const msg = `${body.daily.data[0].summary} Actualmente esta a ${body.currently.temperature}°C. Hay ${body.currently.precipProbability*100}% de posibilidad de lluvia.`;
                console.log(msg);
            });
        });
}
