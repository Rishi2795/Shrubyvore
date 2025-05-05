const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmiddleware');
const { fetchAndSavePlants, getPlants } = require('../controllers/plantcontroller');

// Base route for getting all plants with pagination
router.get('/', protect, getPlants);

// Route for fetching plants from Trefle API
router.get('/fetch-plants', protect, fetchAndSavePlants);

module.exports = router;