const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const API_KEY = "8b364a65aed20584215f51f9f7e47ffe";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const weather_data = await res.json();

    if (weather_data.cod === "404") {
        // City not found
        location_not_found.style.display = "block";
        weather_body.style.display = "none";
        weather_img.src = "assets/error.png"; // error image
        return;
    }

    // If city found
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Temperature in Celsius
    const tempC = Math.round(weather_data.main.temp - 273.15);

    temperature.innerHTML = `${tempC}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    // Weather condition
    const mainWeather = weather_data.weather[0].main.toLowerCase();

    switch (mainWeather) {
        case 'clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'clear':
            weather_img.src = "assets/clear.jpg";
            break;
        case 'rain':
            weather_img.src = "assets/Rain.png";
            break;
        case 'mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'snow':
            weather_img.src = "assets/snow.jpg";
            break;
        default:
            // fallback if API gives something else
            weather_img.src = "assets/default.png";
    }

    // Override by temperature condition
    if (tempC <= 0) {
        weather_img.src = "assets/snow.jpg"; // freezing
    } else if (tempC > 0 && tempC <= 10) {
        weather_img.src = "assets/snow.jpg"; // cold
    } else if (tempC > 15 && tempC <= 25) {
        weather_img.src = "assets/Rain.png"; // normal warm
    } else {
        weather_img.src = "assets/clear.jpg"; // hot
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});