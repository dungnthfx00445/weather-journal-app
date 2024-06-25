// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Get all infomation feel of weather
app.get("/all", getAllWeatherData);

function getAllWeatherData(req, res) {
  res.send(projectData);
}

// Add information feel of weather
app.post("/add", addWeatherData);

function addWeatherData(req, res) {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["content"] = req.body.content;
  res.send(projectData);
}

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
