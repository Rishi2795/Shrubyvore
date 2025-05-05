const axios = require('axios');
const Plant = require('../models/Plant');

const fetchAndSavePlants = async (req, res) => {
  try {
    console.log('Starting plant fetch...');
    
    const response = await axios.get('https://trefle.io/api/v1/plants', {
      params: {
        token: process.env.TREFLE_API_KEY
      }
    });

    console.log('Trefle API Response:', {
      status: response.status,
      totalPlants: response.data?.data?.length || 0
    });

    const plants = response.data?.data || [];
    const processedPlants = [];

    for (const plant of plants) {
      try {
        // Use findOneAndUpdate to either update existing or create new
        const updatedPlant = await Plant.findOneAndUpdate(
          { trefleId: plant.id },  // find condition
          {                        // update data
            $set: {
              name: plant.common_name || plant.scientific_name || 'Unknown Plant',
              description: plant.family_common_name || 'No description available',
              soilRequirements: 'Regular potting soil',
              wateringInstructions: 'Water when soil is dry',
              fertilizerRecommendations: 'Monthly feeding during growing season',
              images: plant.image_url ? [plant.image_url] : [],
              lastUpdated: new Date()
            }
          },
          {                        // options
            new: true,            // return updated doc
            upsert: true,         // create if doesn't exist
            runValidators: true   // run schema validations
          }
        );

        processedPlants.push(updatedPlant);
        console.log(`Processed plant: ${updatedPlant.name} (${plant.id})`);
      } catch (processError) {
        console.error(`Error processing plant ${plant.id}:`, processError.message);
      }
    }

    return res.status(200).json({
      message: `Successfully processed ${processedPlants.length} plants`,
      count: processedPlants.length,
      plants: processedPlants
    });

  } catch (error) {
    console.error('Error in fetchAndSavePlants:', error.message);
    return res.status(500).json({
      error: 'Failed to process plants',
      details: error.message
    });
  }
};

const getPlants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get plants with pagination, sorted by name
    const plants = await Plant.find()
      .select('-__v') // Exclude __v field
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });

    // Get total count for pagination
    const total = await Plant.countDocuments();

    // Enhance plant data with default values if missing
    const enhancedPlants = plants.map(plant => ({
      ...plant.toObject(),
      description: plant.description === 'No description available' 
        ? `${plant.name} is a plant species that requires proper care and maintenance.`
        : plant.description,
      soilRequirements: plant.soilRequirements === 'N/A' 
        ? 'Well-draining potting soil with organic matter'
        : plant.soilRequirements,
      wateringInstructions: plant.wateringInstructions === 'N/A'
        ? 'Water when top inch of soil feels dry. Avoid overwatering.'
        : plant.wateringInstructions,
      fertilizerRecommendations: plant.fertilizerRecommendations === 'N/A'
        ? 'Apply balanced, water-soluble fertilizer monthly during growing season'
        : plant.fertilizerRecommendations
    }));

    res.status(200).json({
      plants: enhancedPlants,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    console.error('Error fetching plants:', error.message);
    res.status(500).json({ error: 'Failed to retrieve plants' });
  }
};

module.exports = { fetchAndSavePlants, getPlants };