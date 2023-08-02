const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = 5501

// Start an instance of the express app; must be above the app.use expressions
const app = express();

const projectData = {
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

app.get('http://localhost:5501', function (req, res) {

  return projectData;
})

// Set this GET route up per viewing this YouTube tutorial
// https://www.youtube.com/watch?v=Lr9WUkeYSA8
// The Net Ninja
// Node.js Crash Course #6 - Express Apps
// app.get('/', (req, res) => {
//   res.sendFile('./website/index.html', { root: __dirname });
// });

app.post('http://localhost:5500', async (req, res) => {
  const {zip, country, units, feelings } = req.body;

  // Add params to projectData object
    projectData.feelings = feelings;

  console.log(projectData);

  const apiUrl = `${baseUrl}zip=${zip},${country}&units=${units}&appid=${apiKey}`;
  try {
    res.send('POST received');

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

  projectData = {
    currentDate: formatDate,
    temp: weatherData.main.temp,
    name: weatherData.name,
    feelings: feelings
  }

  console.log(projectData);

  res.json(projectData);

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
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});