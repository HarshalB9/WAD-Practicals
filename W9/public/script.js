const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusText = document.getElementById("status");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const tempValue = document.getElementById("tempValue");
const humidityValue = document.getElementById("humidityValue");
const conditionValue = document.getElementById("conditionValue");

function fetchWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        statusText.textContent = "Please enter a city name.";
        weatherCard.classList.add("hidden");
        return;
    }

    statusText.textContent = "Loading weather...";
    weatherCard.classList.add("hidden");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/weather", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            statusText.textContent = "Error fetching weather data.";
            return;
        }

        try {
            const data = JSON.parse(xhr.responseText);
            const match = data.find((item) => item.city.toLowerCase() === city.toLowerCase());

            if (!match) {
                statusText.textContent = `No weather data found for "${city}".`;
                return;
            }

            cityName.textContent = match.city;
            tempValue.textContent = `${match.temperature} C`;
            humidityValue.textContent = `${match.humidity} %`;
            conditionValue.textContent = match.conditions;

            statusText.textContent = "Weather loaded successfully.";
            weatherCard.classList.remove("hidden");
        } catch (error) {
            statusText.textContent = "Error parsing weather data.";
        }
    };

    xhr.onerror = function () {
        statusText.textContent = "Error fetching weather data.";
    };

    xhr.send();
}

searchBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});
