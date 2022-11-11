const request = require("postman-request");

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiZmltaWdhZiIsImEiOiJjbGFiNXo0M3gwZjFsM3dwbGd0eDBnZ3Q5In0.pV4Gu0KJwTRKznkHvr9uHA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
