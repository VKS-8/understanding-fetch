// Used chatGPT to figure out how to set the country code to uppercase in the form
// as soon as the user entered
// Function to convert the input value to upper case
function convertToUpperCase() {
  let countryCodeInput = document.getElementById("country");
  countryCodeInput.value = countryCodeInput.value.toUpperCase();
}

// Add an event listener to the input field to handle input changes
document.getElementById("country").addEventListener("input", convertToUpperCase);


// Used chatGPT to determine how to set up proper parameters from form to
// post to server
const form = document.getElementById('clientForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const { zip, country, units } = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:5501/clientInput', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip, country, units }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from server:", data);
    } else {
      console.error("Error from server:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

