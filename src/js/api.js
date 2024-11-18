import axios from 'axios';
import Notiflix from 'notiflix';

import { getWeatherToday } from './today';
import { getDate } from './date';
const API = 'c32df37628577b1447329bd64ef99bea';

export const fetchWeather = async city => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    );
    const data = await res.data;
    console.log(data);
    getWeatherToday(data);
    getDate(data);
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure("Can't fetch weather");
  }
};

// const fetchWeatherCity = async city => {
//   try {
//     const res = await axios.get(
//       `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API}`
//     );
//     const data = await res.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure("Can't fetch weather in this city");
//   }
// };

// export const fetchWeather = async city => {
//   try {
//     const weather = await fetchWeatherCity(city);
//     const res = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${weather[0].lat}&lon=${weather[0].lon}&units=metric&appid=${API}`
//     );
//     const data = await res.data;
//     console.log(data);
//     getWeatherToday(data);
//     getDate(data);
//   } catch (error) {
//     console.log(error.message);
//     Notiflix.Notify.failure("Can't fetch weather");
//   }
// };
