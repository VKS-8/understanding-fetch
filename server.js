const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5501

const app = express();


app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Initialize the app
app.use(express.static('website'));

// This hard coded api url does fetch the weather data object from open weather map
// async function getData () {
//   const response = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=74401,US&units=imperial&appid=9a6f38cd817b93e366a58123f0a05b6e');
//   const responseData = await response.json();
//   console.log(responseData);
// }

// getData();

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

// The following POST code was the help of chatGPT
app.post('http://localhost:5501', (req, res) => {
  const {zip, countryCode, units } = req.body;

  // Parse the URL to get the necessary components for the HTTP/HTTPS request
  const apiUrl = `http://api.openweathermap/data/2.5/weather?zip=${zip},${countryCode}&units=${units}&appid=9a6f38cd817b93e366a58123f0a05b6e`;
  const url = new URL(apiURL);
  const protocol = url.protocol === "https:" ? https : http;
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === "https:" ? 443 : 80 ),
    path: url.pathname + url.search,
    method: "GET",
  };

  // Make the HTTP/HTTPS request to the external API
  const request = protocol.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      res.json(JSON.parse(data));
    });
  });

  request.on("error", (error) => {
    console.error("Error making request to API", error);
    res.status(500).json({ error: "Failed to fetch data from API" });
  })

  request.end();
});

// Setup Server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});