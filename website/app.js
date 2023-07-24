const form = document.getElementById('clientForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const { zip, countryCode, units, feelings } = Object.fromEntries(formData);

  try {
    const response = await fetch('/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip, countryCode, units, feelings }),
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