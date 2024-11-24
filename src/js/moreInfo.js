const ul = document.querySelector('.more-info-list');
console.log(ul);

const itemsPerPage = 8; // How many items to show per page

export const getMoreInfo = (weather, page) => {
  ul.innerHTML = '';
  console.log(weather);
  // Calculate the start and end indices for the current page
  const startIndex = (page) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get a slice of the weather array for the current page
  const itemsToDisplay = weather.list.slice(startIndex, endIndex);
  console.log(itemsToDisplay);

  itemsToDisplay.forEach(list => {
    const li = document.createElement('li');
    li.classList.add('more-info-item');

    li.innerHTML = `
      <span class="more-info-time">${getMilitaryTimeFromTimestamp(
        list.dt
      )}</span>
      <span class="more-info-weather-span">
        <img
        src="https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png"
      />
      </span>
      <span class="more-info-temp">${Math.round(list.main.temp)}°</span>
      <ul class="more-info-result-list">
        <li class="more-info-result-item">
          <svg class="more-info-result-icon">
            <use href="/src/images/icons.svg#barometer"></use>
          </svg>
          <span class="more-info-result">${list.main.pressure} mm</span>
        </li>
        <li class="more-info-result-item">
          <svg class="more-info-result-icon">
            <use href="/src/images/icons.svg#humidity"></use>
          </svg>
          <span class="more-info-result">${list.main.humidity}%</span>
        </li>
        <li class="more-info-result-item">
          <svg class="more-info-result-icon">
            <use href="/src/images/icons.svg#wind"></use>
          </svg>
          <span class="more-info-result">${list.wind.speed} m/s</span>
        </li>
      </ul>
    `;

    ul.appendChild(li);
  });
};

function getMilitaryTimeFromTimestamp(timestamp) {
  // Convert the timestamp (which is in seconds) to milliseconds
  const date = new Date(timestamp * 1000);

  // Get the hours and minutes from the Date object
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the hours and minutes to ensure they are two digits (e.g., "09:05" instead of "9:5")
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
}
