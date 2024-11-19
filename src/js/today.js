const weatherIcon = document.querySelector(".weather-today-icon"); 
const location = document.querySelector(".weather-today-location");
const temp = document.querySelector(".weather-today");
const tempMin = document.querySelector(".temp-min");
const tempMax = document.querySelector(".temp-max");

const todayButton = document.querySelector(".today-button");
const fiveDaysButton = document.querySelector(".fivedays-button");

const fiveDaysContainer = document.querySelector(".fivedays-container");
const dateContainer = document.querySelector(".date-wrapper");
const todayContainer = document.querySelector(".choose-weather-wrapper");
const quotesContainer = document.querySelector(".quotes-container");

export const getWeatherToday = (weather) => {
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    location.textContent = `${weather.name}, ${weather.sys.country}`;
    temp.textContent = `${Math.round(weather.main.temp)}°`;
    tempMin.textContent = `${Math.round(weather.main.temp_min)}°`;
    tempMax.textContent = `${Math.round(weather.main.temp_max)}°`
}

todayButton.addEventListener("click", () => {
    todayButton.classList.add("active");
    fiveDaysButton.classList.remove("active");
    fiveDaysContainer.classList.add("hidden");
    dateContainer.classList.remove("hidden");
    todayContainer.classList.remove("hidden");
    quotesContainer.classList.remove("hidden");
})

fiveDaysButton.addEventListener("click", () => {
    fiveDaysButton.classList.add("active");
    todayButton.classList.remove("active");
    fiveDaysContainer.classList.remove("hidden");
    dateContainer.classList.add("hidden");
    todayContainer.classList.add("hidden");
    quotesContainer.classList.add("hidden");
})