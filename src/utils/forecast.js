const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ef95c9a5f98773b7115f1ec6e0dc2412&query=${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out. The humidity is ${data.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
