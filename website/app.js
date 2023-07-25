// Used chatGPT to figure out how to set the country code to uppercase in the form
// as soon as the user entered
// Function to convert the input value to upper case
function convertToUpperCase() {
  let countryCodeInput = document.getElementById("countryCode");
  countryCodeInput.value = countryCodeInput.value.toUpperCase();
}

// Add an event listener to the input field to handle input changes
document.getElementById("countryCode").addEventListener("input", convertToUpperCase);

const form = document.getElementById('clientForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const { zip, countryCode, units, feelings } = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:5501/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip, countryCode, units }),
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

