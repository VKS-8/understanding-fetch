const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = 5501

// Start an instance of the express app; must be above the app.use expressions
const app = express();

let projectData = {
  "server": "can you see me?"
};

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

app.get('/', (req, res) => {
  res.send('Home Page!')
})

app.get('/website', (req, res) => {
  res.send('Welcome to your server');
});

app.post('/', async (req, res) => {
  const {zip, country, units, feelings} = req.body;

  // Add params to projectData object
  projectData.zip = zip;
  projectData.country = country;
  projectData.units = units;
  projectData.feelings = feelings;

  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  projectData.currentDate = formatDate;

  console.log(projectData);

  const apiUrl = `${baseUrl}zip=${projectData.zip},${projectData.country}&units=${projectData.units}&appid=${apiKey}`;

  try {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  console.log(data);
    projectData.temp = data.main.temp;
    projectData.city = data.name;
    projectData.icon = data.weather[0].icon;
  console.log('Sending response from the server: ', projectData);
  res.json(projectData);
  } catch (error) {

  // Handle errors
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
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});