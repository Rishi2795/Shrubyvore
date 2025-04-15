import express from 'express';
import { getWeatherByCity, getWeatherByCoords } from '../controllers/weatherController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET weather by city name
router.get('/city/:city', authMiddleware, getWeatherByCity);

// GET weather by coordinates
router.get('/coords', authMiddleware, getWeatherByCoords);

export default router;
