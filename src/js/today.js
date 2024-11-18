const weatherIcon = document.querySelector(".weather-today-icon"); 
const location = document.querySelector(".weather-today-location");
const temp = document.querySelector(".weather-today");
const tempMin = document.querySelector(".temp-min");
const tempMax = document.querySelector(".temp-max");

export const getWeatherToday = (weather) => {
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    location.textContent = `${weather.name}, ${weather.sys.country}`;
    temp.textContent = `${Math.round(weather.main.temp)}°`;
    tempMin.textContent = `${Math.round(weather.main.temp_min)}°`;
    tempMax.textContent = `${Math.round(weather.main.temp_max)}°`
}
