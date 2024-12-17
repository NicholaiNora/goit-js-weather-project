import { getMoreInfo } from './moreInfo';

const country = document.querySelector('.fivedays-country');
const ulForecast = document.querySelector('.fivedays-result-list');

export const getCountry = weather => {
  country.textContent = `${weather.name}, ${weather.sys.country}`;
};

export const getFiveForecast = forecast => {
  const fiveDayForecast = forecast.list.filter(
    (_item, index) => index % 8 === 0
  );
  console.log(fiveDayForecast);

  ulForecast.innerHTML = '';

  fiveDayForecast.map(list => {
    const li = document.createElement('li');
    li.classList.add('fivedays-result-item');
    li.innerHTML = `
      <span class="fivedays-week">${getWeekdayFromTimestamp(list.dt)}</span>
      <span class="fivedays-date">${getFormattedDateFromTimestamp(
        list.dt
      )}</span>
      <span class="fivedays-weather-span">
        <img
        src="https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png"
      />
      </span>
      <ul class="fivedays-range-list">
        <li class="fivedays-range-item">
          <span class="fivedays-range">min</span>
          <span class="fivedays-temp">${Math.round(list.main.temp_min)}°</span>
        </li>
        <li class="fivedays-range-item">
          <span class="fivedays-range">max</span>
          <span class="fivedays-temp">${Math.round(list.main.temp_max)}°</span>
        </li>
      </ul>
      <button class="fivedays-more-info">more info</button>
    `;
    // Append the list item to the ul
    ulForecast.appendChild(li);
  });

  const moreInfoButton = document.querySelectorAll('.fivedays-more-info');
  const fiveDayItem = document.querySelectorAll('.fivedays-result-item');
  const moreInfoContainer = document.querySelector('.more-info-container');
  const closeButton = document.querySelector('.more-info-button');
  const scrollBtns = document.querySelector('.scroll-btn');
  // ito yung hindi pa gumamit ng Event Delegation
  // moreInfoButton.forEach((button, index) =>
  //   button.addEventListener('click', (e) => {
  //     moreInfoContainer.classList.remove('hidden');
  //     getMoreInfo(forecast, index);
  //     fiveDayItem[index].classList.add('fivedays-week-active');
  //   })
  // );

  moreInfoContainer.classList.add('hidden');
  closeButton.classList.add('hidden'); //this ensures that if you click other cities/countries
  //                                         // the more info cloase button will be hidden
  //                                         // and you cant put this on moreInfo.js because it is not click the moreInfoButton
  scrollBtns.classList.add('hidden');

  ulForecast.addEventListener('click', e => {
    if (e.target && e.target.matches('.fivedays-more-info')) {
      const index = Array.from(moreInfoButton).indexOf(e.target);

      moreInfoContainer.classList.remove('hidden');
      closeButton.classList.remove('hidden');
      getMoreInfo(forecast, index);
      scrollBtns.classList.remove('hidden');

      // Remove the active class from all items
      fiveDayItem.forEach(item => {
        item.classList.remove('fivedays-week-active');
      });

      // Add the active class to the clicked item
      fiveDayItem[index].classList.add('fivedays-week-active');

      const selectedItem = fiveDayItem[index]; // Get the clicked list item

      // Scroll the selected list item into view
      selectedItem.scrollIntoView({
        behavior: 'smooth', // Optional, makes the scroll smooth
        block: 'start', // Optional, aligns the item in the center of the viewport
      });
    }
  });

  closeButton.addEventListener('click', () => {
    fiveDayItem.forEach(item => {
      item.classList.remove('fivedays-week-active');
    });
  });
};

function getWeekdayFromTimestamp(timestamp) {
  // Convert the timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Array of weekday names
  //prettier-ignore
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const weekdayIndex = date.getDay();
  // Return the weekday name
  return weekdays[weekdayIndex];
}

function getFormattedDateFromTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = date.getDate();
  const monthIndex = date.getMonth();

  // Array of month names
  //prettier-ignore
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Get the month name
  const month = months[monthIndex];

  return `${day} ${month}`;
}
