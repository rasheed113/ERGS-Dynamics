/*
ERGS Dynamics
Weather Service
*/


function getWeatherIcon(code) {

    if ([0].includes(code)) {
        return "☀️";
    }

    if ([1,2,3].includes(code)) {
        return "🌤";
    }

    if ([45,48].includes(code)) {
        return "🌫";
    }

    if ([51,53,55,56,57].includes(code)) {
        return "🌦";
    }

    if ([61,63,65,66,67,80,81,82].includes(code)) {
        return "🌧";
    }

    if ([95,96,99].includes(code)) {
        return "⛈";
    }

    return "🌡";
}

async function loadWeather() {

    const weatherElement = document.getElementById("live-weather");
    const humidityElement = document.getElementById("live-humidity");
    const windElement = document.getElementById("live-wind");

    if (!weatherElement) {
        return;
    }

    try {

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"
        );

        const data = await response.json();

        const current = data.current;

        weatherElement.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        if (humidityElement) {
            humidityElement.textContent =
                `Humidity ${current.relative_humidity_2m}%`;
        }

        if (windElement) {
            windElement.textContent =
                `Wind ${Math.round(current.wind_speed_10m)} km/h`;
        }

    } catch (error) {

        console.error(
            "Weather loading failed:",
            error
        );

    }
}

window.loadWeather = loadWeather;
