const dateDay = document.querySelector('.date-day-span');
const dateMonth = document.querySelector('.month-span');
const dateTime = document.querySelector('.time-span');
const sunRise = document.querySelector('.date-sun-rise-span');
const sunSet = document.querySelector('.date-sun-set-span');



const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
// console.log(date);

// function getDayWithOrdinal(date) {
//   const day = date.getDate();
//   const suffix = getOrdinalSuffix(day);
//   return `${day}${suffix}`;
// }

//To know the suffix base on the time given
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

//To know the week base on the time given
function getWeekName(week) {
  return weekdays[week.getDay()];
}

//To know the month base on the time given
function getMonthName(month) {
  return months[month.getMonth()];
}

let timerInterval;

function updateTimer(time) {
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();
  let seconds = time.getUTCSeconds();

  let totalSeconds = hours * 3600 + minutes * 60 + seconds; // Start time in seconds

  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => {
    totalSeconds++;
    hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    seconds = (totalSeconds % 60).toString().padStart(2, '0');
    dateTime.innerHTML = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

export const getDate = date => {

  let utcTimestamp = date.dt; // Current time in UTC
  
  let timezoneOffset = date.timezone; // Offset in seconds

  let localTimestamp = utcTimestamp + timezoneOffset;
  console.log(localTimestamp);

  
  const utcLocalTimestamp = new Date(localTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  console.log(utcLocalTimestamp)

  dateDay.innerHTML = `${utcLocalTimestamp.getDate()}<sup>${getOrdinalSuffix(
    utcLocalTimestamp.getDate()
  )}</sup> ${getWeekName(utcLocalTimestamp)}`;

  dateMonth.innerHTML = `${getMonthName(utcLocalTimestamp)}`;

  updateTimer(utcLocalTimestamp);
  
  sunRiseTime(date);
  sunSetTime(date);
};

function sunRiseTime(weatherData) {
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000);

  return (sunRise.innerHTML = `${sunriseTime
    .getHours()
    .toString()
    .padStart(2, '0')}:${sunriseTime
    .getMinutes()
    .toString()
    .padStart(2, '0')}`);
}

function sunSetTime(weatherData) {
  const sunsetTime = new Date(weatherData.sys.sunset * 1000);

  return (sunSet.innerHTML = `${sunsetTime
    .getHours()
    .toString()
    .padStart(2, '0')}:${sunsetTime.getMinutes().toString().padStart(2, '0')}`);
}

// const quotes = document.querySelector('.quotes-container');

// async function fetchRandomQuote() {
//   try {
//     const response = await axios.get('https://api.quotable.io/random');
//     quotesData = await response.data;
//       quotes.innerHTML = `<p class="quotes-paragraph">${quotesData.content}</p>
//       <span class="quotes-person">${quotesData.author}</span>`;
//   } catch (e) {
//     console.log(e);
//   }
// }

// fetchRandomQuote();

// export { sunRiseTime, sunSetTime, updateWeekName, updateMonthName, updateTimer };
