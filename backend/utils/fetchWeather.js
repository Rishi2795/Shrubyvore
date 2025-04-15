// utils/fetchWeather.js
import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const fetchWeather = async ({ city, lat, lon }) => {
  try {
    let url = '';

    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    return {
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
    throw new Error('Failed to fetch weather data');
  }
};

export default fetchWeather;
