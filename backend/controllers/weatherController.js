import fetchWeather from '../utils/fetchWeather.js';

// Get weather by city
export const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    const weatherData = await fetchWeather({ city });
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

// Get weather by coordinates (lat, lon)
export const getWeatherByCoords = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const weatherData = await fetchWeather({ lat, lon });
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
