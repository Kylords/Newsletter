const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "a0c64a98369a8a511cfe63735af06946";
    const units = "metric";
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + units;

    https.get(weatherUrl, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data); // Kinuha mo yung data from the url and ginawa mong Object format
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const description = weatherData.weather[0].description;
            const weatherIconCode = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";
            res.write("<h1>The temperature in " + city + " is " + temp + "</h1>.");
            res.write("<p>And the weather is " + description + ".</p>");
            res.write("<img src = " + iconUrl + ">");
            
            res.send();

        })
    })

})

app.listen(3000, function() {
    console.log("Server loaded in port 3000");
})