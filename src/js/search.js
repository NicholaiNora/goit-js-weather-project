import Notiflix from 'notiflix';
import { fetchFiveForecast, fetchImage, fetchWeather } from './api';
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
    fetchFiveForecast(city);
    fetchImage(city);
    getQuote();
  }
}

fetchWeather('Manila');
fetchImage("Manila");
fetchFiveForecast('Manila');
getQuote();
