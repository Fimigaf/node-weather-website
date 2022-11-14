const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Filipe Ferreira",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Filipe Ferreira",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Help message that is very helpful.",
    name: "Filipe Ferreira",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location.",
    });
  }
  geocode(req.query.location, (error, { location, lat, long } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        input: req.query.location,
        forecast: forecastData,
        location: location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "Help article not found.",
    name: "Filipe Ferreira",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "Page not found.",
    name: "Filipe Ferreira",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
