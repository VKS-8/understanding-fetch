document.addEventListener('DOMContentLoaded', function() {

checkIfBrowser();
checkIfNode();

const serverUrl = 'http://localhost:5501';

// Check functions when working with node.js
// Learned from this site:
// https://stackdiary.com/tutorials/referenceerror-document-is-not-defined/#:~:text=The%20%22ReferenceError%3A%20document%20is%20not,such%20as%20in%20a%20Node.
// Based on search about this error:
// ReferenceError: document is not defined in JavaScript
function checkIfBrowser() {
  if (typeof window === "object") { console.log('running in browser'); } else { console.log('not running in browser'); }
}
function checkIfNode() {
  if (process.browser) {
    console.log('Not Node');
  } else {
    console.log('Yes, Node');
  }
}
// Current result of above checks: not running in the browser, yes, node


// const path = __dirname + '/clientInput';
// app.use('/clientInput', express.static(path));


// Used chatGPT to figure out how to set the country code to uppercase in the form
// as soon as the user entered
// Function to convert the input value to upper case
function convertToUpperCase() {
  let countryCodeInput = document.getElementById('country');
  countryCodeInput.value = countryCodeInput.value.toUpperCase();
}

// Add an event listener to the input field to handle input changes
document.getElementById('country').addEventListener('input', convertToUpperCase);

async function fetchData(endpoint, data) {
  try {
    const response = await fetch(`${serverUrl}${endpoint}`, {
      method: 'POST',
      credentials: 'same-origin',
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
});
