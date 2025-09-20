const apiKey = 'YOUR_API_KEY'; 
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  console.log("Fetching from:", apiURL);

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      console.log("API response:", data);
      if (data.cod === 200) {
        document.getElementById("cityName").innerText = `City: ${data.name}`;
        document.getElementById("temp").innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").innerText = `Weather: ${data.weather[0].description}`;
        document.getElementById("weatherResult").classList.remove("hidden");
      } else {
        alert(`Error: ${data.message}`);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

