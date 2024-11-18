import Notiflix from 'notiflix';
import { fetchWeather } from './api';

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
  }
}

