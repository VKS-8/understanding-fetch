const serverUrl = 'http://localhost:5501';
// const path = __dirname + '/clientInput';
// app.use('/clientInput', express.static(path));


// Used chatGPT to figure out how to set the country code to uppercase in the form
// as soon as the user entered
// Function to convert the input value to upper case
function convertToUpperCase() {
  let countryCodeInput = document.getElementById("country");
  countryCodeInput.value = countryCodeInput.value.toUpperCase();
}

// Add an event listener to the input field to handle input changes
document.getElementById("country").addEventListener("input", convertToUpperCase);

async function fetchData(endpoint, data) {
  try {
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}


// Used chatGPT to determine how to set up proper parameters from form to
// post to server
document.getElementById('clientInput').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const userData = Object.fromEntries(formData.entries());

  try {
    const serverData = await fetchData('/clientInput', userData);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
      serverData = await response.json();
      console.log("Response from server:", serverData);
    } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
});

