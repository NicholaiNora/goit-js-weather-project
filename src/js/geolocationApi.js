import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchFiveForecast, fetchWeather } from './api';
import { fetchImage } from './backgroundApi';

const API = 'c32df37628577b1447329bd64ef99bea';

function getCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

const fetchWeatherData = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
    );
    const data = await res.data;
    fetchWeather(data.name);
    fetchFiveForecast(data.name);
    fetchImage(data.name);
    getQuote();
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure("Can't add such city");
  }
};

getCurrentLocation();
