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

export const getDate = date => {

  let utcTimestamp = date.dt; // Current time in UTC
  
  const utcLocalTimestamp = new Date(utcTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  console.log(utcLocalTimestamp);
  dateDay.innerHTML = `${utcLocalTimestamp.getDate()}<sup>${getOrdinalSuffix(
    utcLocalTimestamp.getDate()
  )}</sup> ${getWeekName(utcLocalTimestamp)}`;

  dateMonth.innerHTML = `${getMonthName(utcLocalTimestamp)}`;

  updateTime(date);

  sunRiseTime(date);
  sunSetTime(date);
};

let timerInterval; //para di bumalik sa dating time every second;

export const updateTime = (time) => {
  const utcStartTime = new Date(time.dt * 1000); // Start time in UTC
  const timezoneOffset = time.timezone * 1000; // Convert seconds to milliseconds for consistency

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const now = new Date();
    const elapsedTime = now - utcStartTime; // Elapsed time since the UTC start
    const adjustedTime = new Date(utcStartTime.getTime() + elapsedTime + timezoneOffset); // Adjusted to the target timezone

    // Format adjustedTime to HH:mm:ss
    const hours = adjustedTime.getUTCHours().toString().padStart(2, '0');
    const minutes = adjustedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = adjustedTime.getUTCSeconds().toString().padStart(2, '0');

    dateTime.innerHTML = `${hours}:${minutes}:${seconds}`;
  }, 1000);
};

export const sunRiseTime = (weatherData) => {
  const sunriseTime = new Date((weatherData.sys.sunrise + weatherData.timezone) * 1000);

  sunRise.innerHTML = `${sunriseTime.getUTCHours().toString().padStart(2, '0')}:${sunriseTime
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}`;
};

export const sunSetTime = (weatherData) => {
  const sunsetTime = new Date((weatherData.sys.sunset + weatherData.timezone) * 1000);

  sunSet.innerHTML = `${sunsetTime.getUTCHours().toString().padStart(2, '0')}:${sunsetTime
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}`;
};

