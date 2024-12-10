import axios from 'axios';
import Notiflix from 'notiflix';

import { getWeatherToday } from './today';
import { getDate } from './date';
import { getCountry } from './fiveDays';
import { getFiveForecast } from './fiveDays';
import { getMoreInfo } from './moreInfo';
import { getChartData } from './myChart';
import { getCity } from './favorite';

const API = 'c32df37628577b1447329bd64ef99bea';

export const fetchWeather = async city => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    );
    const data = await res.data;
    console.log(data.name);
    getWeatherToday(data);
    getDate(data);
    getCountry(data);
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure("Can't fetch weather");
  }
};

export const fetchFiveForecast = async city => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}&units=metric`
    );
    const data = await res.data;
    getFiveForecast(data);
    getMoreInfo(data);
    getChartData(data);
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure("Can't fetch weather");
  }
};

export const fetchCity = async city => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    );
    const data = await res.data;
    getCity(data.name);
  }  catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure("Can't add such city");
  }
}

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

// export const fetchFiveForecast = async city => {
//   try {
//     const weather = await fetchWeatherCity(city);
//     const res = await axios.get(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${weather[0].lat}&lon=${weather[0].lon}&units=metric&appid=${API}`
//     );
//     const data = await res.data;
//     getFiveForecast(data);
//     getMoreInfo(data);
//   } catch (error) {
//     console.log(error.message);
//     Notiflix.Notify.failure("Can't fetch weather");
//   }
// };
