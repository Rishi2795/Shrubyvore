const axios = require('axios');
const Plant = require('../models/Plant');

// Fetch plants from Trefle API and save to MongoDB
const fetchAndSavePlants = async (req, res) => {
  try {
    const { type } = req.query; // 'indoor' or 'outdoor'

    // Fetch data from Trefle API
    const response = await axios.get(`https://trefle.io/api/v1/plants`, {
      params: {
        token: process.env.TREFLE_API_KEY,
        filter_not: { indoor: type === 'outdoor' },
      },
    });

    const plants = response.data.data;

    // Save each plant to MongoDB
    for (const plant of plants) {
      const existingPlant = await Plant.findOne({ trefleId: plant.id });
      if (!existingPlant) {
        await Plant.create({
          trefleId: plant.id,
          name: plant.common_name || plant.scientific_name,
          description: plant.family_common_name || 'No description available',
          soilRequirements: 'N/A', // Placeholder, as Trefle doesn't provide this
          wateringInstructions: 'N/A', // Placeholder
          fertilizerRecommendations: 'N/A', // Placeholder
          images: plant.image_url ? [plant.image_url] : [],
        });
      }
    }

    res.status(200).json({ message: 'Plants fetched and saved successfully' });
  } catch (error) {
    console.error('Error fetching and saving plants:', error.message);
    res.status(500).json({ error: 'Failed to fetch and save plants' });
  }
};

// Retrieve plants from MongoDB
const getPlants = async (req, res) => {
  try {
    const { type } = req.query; // 'indoor' or 'outdoor'

    // Filter plants based on type (if needed)
    const plants = await Plant.find(); // Add filters if required

    res.status(200).json(plants);
  } catch (error) {
    console.error('Error retrieving plants:', error.message);
    res.status(500).json({ error: 'Failed to retrieve plants' });
  }
};

module.exports = { fetchAndSavePlants, getPlants };