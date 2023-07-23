const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = 5500

const app = express();


app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Initialize the app
app.use(express.static('website'));

// Global variables
const apiKEY = process.env.API_KEY;

async function getData () {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=74401,US&units=imperial&appid=${apiKEY}`);
  const responseData = await response.json();
  console.log(responseData);
}

getData();

// Setup Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});