const credentials = require('./credentials.js');
const request = require('request');
const express = require('express');

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

function Result(city, temp, rainProbability, message) {
    return {
        city,
        temp,
        rainProbability,
        message,
    };
}

// City -> Promise (lat,lon) | Error
function mapBoxRequest(city, cont) {
    request(
        mapBoxUrl(city),
        function(error, _response, body) {
            handleErr(error, () => {
                body = JSON.parse(body);
                if(body.message) {
                    console.log("MapBox:\n\t" + body.message);
                    return;
                }
                if(body.features.length === 0) {
                    console.log("MapBox:\n\t City not found");
                    return;
                }

                const firstResult = body.features[0];

                const coord = firstResult.center;
                const place = firstResult.place_name || firstResult.text;

                cont({coord, place});
            });
        }
    );
}

// lat -> lon -> Promise Result
function darkSkyRequest ({coord: [lat, lon], place}, cont) {
    request(
        darkSkyUrl(lon,lat),
        function(error, _response, body) {
            handleErr(error, function() {
                body = JSON.parse(body);

                if(body.code === 403) {
                    console.log(`DarkSky:\n\tError code: ${body.code}, message: ${body.error}`);
                    return;
                }
                const summary = body.daily.data[0].summary;
                const temp = body.currently.temperature;
                const rainProbability = body.currently.precipProbability*100;
                const message =
                      `${summary} Actualmente esta a ${temp}°C. ` +
                      `Hay ${rainProbability}% de posibilidad de lluvia.`;

                cont(Result(place, temp, rainProbability, message));
            });
        }
    );
}


const app = express();
const port = process.env.PORT || 3000;

app.get('/weather', function(req, response) {

    city = req.query.search;
    mapBoxRequest(city, o => darkSkyRequest(o, x  => response.send(x)));
});

app.get('*', function(req, res) {
    res.status(404)
       .send(`Error, url: ${req.hostname + req.originalUrl} not found`);
});

app.listen(port, function() {
    console.log("listening in port: " + port)
});
