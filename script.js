const apiKey = "b1762a6adf01e9a18f6aa6c4462ae539"; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const currentWeather = document.getElementById("current-weather");

// Fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    currentWeather.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}

// Display weather data on the page
function displayWeather(data) {
  const { name, main, weather, wind } = data;
  currentWeather.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
}

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    currentWeather.innerHTML = `<p style="color: red;">Please enter a city name</p>`;
  }
});
