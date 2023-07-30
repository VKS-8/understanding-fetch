const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
require('dotenv').config();
// const path = require('path');
const port = 5501

// Start an instance of the express app; must be above the app.use expressions
const app = express();

// app.use(express()); COMMENTED this out because chatGPT said the following so testing:
// Remove the app.use(express()); line:
// The express() function returns an instance of the Express application, so you don't need to use it again with app.use().

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize the app
app.use(express.static('website'));

// Global variables
const apiKey = process.env.API_KEY;
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';

// This hard coded api url does fetch the weather data object from open weather map
async function getData () {
  const response = await fetch(`${baseUrl}zip=10012,US&units=imperial&appid=${apiKey}`);
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

// Test api with hard coded params
getData();

// Set this GET route up per viewing this YouTube tutorial
// https://www.youtube.com/watch?v=Lr9WUkeYSA8
// The Net Ninja
// Node.js Crash Course #6 - Express Apps

// app.get('/', (req, res) => {
//   res.sendFile('./website/index.html', { root: __dirname });
// });

// The following POST code was the help of chatGPT
app.post('/clientInput', async (req, res) => {
  const {zip, country, units, feelings } = req.body;
  console.log(req.body);

  const apiUrl = `${baseUrl}zip=${zip},${country}&units=${units}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

  const weatherData = await response.json();

  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const combinedData = {
    currentDate: formatDate,
    temp: weatherData.main.temp,
    name: weatherData.name,
    feelings: feelings
  }

  console.log(combinedData);

  res.json(combinedData);

} catch (error) {
  console.error('Error making request to API', error);
  res.status(500).json({ error: "Failed to fetch data from API" });
}
});

// 404 page per this YouTube tutorial:
// https://www.youtube.com/watch?v=Lr9WUkeYSA8&t=624s
// The Net Ninja
// Node.js Crash Course #6 - Express Apps
app.use((req, res) => {
  res.status(404).sendFile('./website/404.html', { root: __dirname});
});

// Setup Server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});