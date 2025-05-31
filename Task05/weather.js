const apiKey = "your_api_key_here"; // Replace with your OpenWeatherMap API key
const form = document.querySelector("form");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;

      weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Condition:</strong> ${description}</p>
      `;
    })
    .catch((error) => {
      weatherResult.innerHTML = `Error: ${error.message}`;
    });
}
