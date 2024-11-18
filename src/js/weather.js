// import axios from 'axios';
// import Notiflix from 'notiflix';
// import { sunRiseTime, sunSetTime, updateWeekName, updateMonthName, updateTimer } from './date';

// const searchInput = document.querySelector('.search-input');
// const searchForm = document.querySelector('.search-form');
// const location = document.querySelector('.weather-today-location');
// const temperature = document.querySelector('.weather-today');
// const tempMin = document.querySelector('.temp-min');
// const tempMax = document.querySelector('.temp-max');
// const weatherIcon = document.querySelector('.weather-today-icon');

// async function getWeatherCondition(city) {
//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c32df37628577b1447329bd64ef99bea&units=metric`
//     );
//     let weatherData = await response.data; // Assigning the fetched data to the module-level variable
//     // console.log(weatherData);
//     updateWeatherDisplay(weatherData);
//     updateTimezone(weatherData)
//     updateSunTime(weatherData);
//     searchForm.reset();
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure("Can't fetch weather");
//   }
// }



// function updateWeatherDisplay(data) {
//   location.innerText = `${data.name}, ${data.sys.country}`;
//   temperature.innerText = Math.round(data.main.temp) + '°C';
//   tempMin.innerText = Math.round(data.main.temp_min) + '°';
//   tempMax.innerText = Math.round(data.main.temp_max) + '°';
//   weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
// }

// function updateSunTime(data) {
//   sunRiseTime(data);
//   sunSetTime(data);
// }

// function updateTimezone(data) {
//   const timezoneOffsetInSeconds = data.timezone;
//   const timezoneOffsetInMilliseconds = timezoneOffsetInSeconds * 1000;
//   const currentDate = new Date();
//   const localTime = new Date(
//     currentDate.getTime() + timezoneOffsetInMilliseconds
//   );  
//   updateWeekName(localTime);
//   updateMonthName(localTime);
//   updateTimer(localTime);
// }




// searchForm.addEventListener('submit', e => {
//   e.preventDefault();
//   const city = searchInput.value.trim();
//   if (city) {
//     getWeatherCondition(city);
//   }
// });

// function getLocation() {
//   if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//    console.log('Geolocation is not supported by this browser.');
//   }
// }

// async function showPosition(position) {
//   const { latitude, longitude } = position.coords;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c32df37628577b1447329bd64ef99bea&units=metric`;
//   try {
//     const response = await axios.get(url);
//     let positionData = await response.data; 
//     getWeatherCondition(positionData.name);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure("Can't fetch weather");
//   }
// }

// getLocation();


// const favBtn = document.querySelector('.search-favorite-btn');
// const favList = document.querySelector('.favorite-country-list');
// console.log(favBtn);
// console.log(favList);


// let favorites = [];
// function addFavorite() {
//   const place = searchInput.value.trim();
//   if (!favorites.includes(place)) {
//     favorites.push(place);
//   } else {
//     Notiflix.Notify.info("It is already is the List");
//   }
  
//   // for (let favorite of favorites) {
//   //   if (favorites.includes(place)) {
//   //       uniqueFavorites.push(place);
//   //   }
//   // }

//   console.log(favorites);
//   // for (let favorite of favorites) {
//   //   if (favorite !== place) {
//   //     let renfavorites = favorites
//   //       .map(
//   //         favorite => `<li class="favorite-country-item">
//   //                   <span class="favorite-country">${favorite}</span>
//   //                   <button class="favorite-close-btn">
//   //                       <svg class="favorite-close-icon">
//   //                           <use href="/icons.adfc4680.svg#close1"></use>
//   //                       </svg>
//   //                   </button>
//   //               </li>`
//   //       )
//   //       .join('');
//   //     favList.innerHTML = renfavorites;
//   }


// favBtn.addEventListener("click", addFavorite);