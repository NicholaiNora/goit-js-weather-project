import Notiflix from 'notiflix';
import { fetchFiveForecast, fetchWeather } from './api';
import { getQuote } from './quotes';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city === '') {
    Notiflix.Notify.info('Please enter a location');
  }
  if (city) {
    fetchWeather(city);
    getQuote();
  }
}

fetchWeather("Manila");
fetchFiveForecast("Manila");
getQuote();