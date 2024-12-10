import Notiflix from 'notiflix';
import { fetchCity, fetchFiveForecast, fetchWeather } from './api';
import { fetchImage } from './backgroundApi';

const form = document.querySelector('.search-form');
const ulFavorite = document.querySelector('.favorite-country-list');
const input = document.querySelector('.search-input');
const scrollContainer = document.querySelector('.favorite-country-list');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

function updateArrowVisibility() {
  const containerWidth = scrollContainer.clientWidth;
  const contentWidth = scrollContainer.scrollWidth;

  // Show arrows only if content overflows
  if (contentWidth > containerWidth) {
    scrollLeft.style.display =
      scrollContainer.scrollLeft === 0 ? 'none' : 'block';
    scrollRight.style.display =
      scrollContainer.scrollLeft + containerWidth >= contentWidth
        ? 'none'
        : 'block';
  } else {
    // Hide arrows if no overflow
    scrollLeft.style.display = 'none';
    scrollRight.style.display = 'none';
  }
}

// Initialize favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorite')) || [];

// Add event listener to the form
form.addEventListener('click', handleFormClick);

// Render favorites list initially
renderFavorites();

/** Handle form click events */
function handleFormClick(event) {
  if (event.target.id === 'favorite') {
    const city = input.value.trim();
    if (!city) {
      Notiflix.Notify.info('Please enter a location');
      return;
    }
    fetchCity(city);
  }
}

/** Save a city to favorites */
function saveFavorite(city) {
  try {
    const formattedCity = formatCityName(city);
    if (!favorites.includes(formattedCity)) {
      favorites.push(formattedCity);
      localStorage.setItem('favorite', JSON.stringify(favorites));
      renderFavorites();
      Notiflix.Notify.success(`${formattedCity} has  been added to favorites.`);
    } else {
      Notiflix.Notify.info(`${formattedCity} is already in favorites.`);
    }
  } catch (error) {
    console.error('Error saving to favorites:', error.message);
  }
}

/** Delete a city from favorites */
function deleteFavorite(city) {
  try {
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem('favorite', JSON.stringify(favorites));
    renderFavorites();
    Notiflix.Notify.info(`${city} has been removed from favorites.`);
  } catch (error) {
    console.error('Error deleting from favorites:', error.message);
  }
}

/** Render the favorites list in the UI */
function renderFavorites() {
  ulFavorite.innerHTML = ''; // Clear the current list

  favorites.forEach(city => {
    const li = document.createElement('li');
    li.classList.add('favorite-country-item');
    li.innerHTML = `
      <span class="favorite-country">${city}</span>
      <button class="favorite-close-btn" data-city="${city}">
        <svg class="favorite-close-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M1 11L11 1"/>
        </svg>
      </button>`;
    ulFavorite.appendChild(li);
  });

  // Delegate event listener for deleting favorites
  ulFavorite.addEventListener('click', handleFavoriteDelete);
  ulFavorite.addEventListener('click', handleFavoriteCity);

  scrollLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -100, behavior: 'smooth' });
  });

  scrollRight.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 100, behavior: 'smooth' });
  });

  // Attach to scroll and window resize events
  scrollContainer.addEventListener('scroll', updateArrowVisibility);
  window.addEventListener('resize', updateArrowVisibility);
  updateArrowVisibility();
}

/** Handle deletion of a favorite */
function handleFavoriteDelete(event) {
  const button = event.target.closest('.favorite-close-btn');
  if (button) {
    const city = button.dataset.city;
    deleteFavorite(city);
  }
}

function handleFavoriteCity(e) {
  const location = e.target.closest('.favorite-country').textContent;
  if (location) {
    fetchWeather(location);
    fetchFiveForecast(location);
    fetchImage(location);
    getQuote();
  }
}

/** Format city name to capitalize the first letter */
function formatCityName(city) {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
}

export const getCity = city => saveFavorite(city);
