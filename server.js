const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5500

const app = express();


app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Initialize the app
app.use(express.static('website'));


async function getData () {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=74401,US&units=imperial&appid=9a6f38cd817b93e366a58123f0a05b6e');
  const responseData = await response.json();
  console.log(responseData);
}

getData();

app.get('/', (req, res) => {
  res.sendFile('./website/index.html', { root: __dirname });
});

// 404 page per this YouTube tutorial:
// https://www.youtube.com/watch?v=Lr9WUkeYSA8&t=624s
// The Net Ninja
// Node.js Crash Course #6 - Express Apps
app.use((req, res) => {
  res.status(404).sendFile('./website/404.html', { root: __dirname});
});

// Setup Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});