const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.set(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log("server started successfully at port:3000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post("/", function (req, res) {
  // took the name of the city from user using body-parser
  const city = req.body.city;
  // real one is in the .env (authentication and security)
  const API_KEY = "4147fbf005-notTheRealKey-16bd704410092";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

  //

  // to get the data from the api provider
  https.get(url, function (response) {
    console.log(response.statusCode);
    // if 200, then everything is working fine
    response.on("data", function (data) {
      // where we got the data
      let weatherData = JSON.parse(data);
      console.log(weatherData.name);
      console.log(weatherData.coord);
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.send(
        `<div style="text-align: center;">
            <h3>The temperature in ${weatherData.name} is ${weatherData.main.temp}&degC , feels like ${weatherData.main.feels_like}&degC .</h3>
            <p>Weather description : ${weatherData.weather[0].description}.</p>
            <img style="background-color: #DFD3C3; border-radius:5px;" src=${imageURL}>
        </div>`
      );
    });
  });
});
