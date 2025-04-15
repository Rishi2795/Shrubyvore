import { verifyToken } from '@clerk/backend';
import Plant from '../models/Plant.js';
import fetchTrefleData from '../utils/fetchTrefleData.js';  // Make sure to create this utility function for fetching data from Trefle

// Get list of all plants
export const getPlantList = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plant list', error });
  }
};

// Get details of a specific plant
export const getPlantDetails = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plant details', error });
  }
};

// Sync plant data with Trefle API (Requires Clerk authentication)
export const syncPlantData = async (req, res) => {
  try {
    // Verify Clerk token from Authorization header
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { userId } = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });

    // Now that Clerk authentication is successful, proceed with syncing plant data
    const fetchedPlants = await fetchTrefleData(); // Call the function to fetch plant data from Trefle API

    // Insert the fetched plants into MongoDB, skipping duplicates
    const insertedPlants = await Plant.insertMany(fetchedPlants, { ordered: false }).catch((err) => {
      if (err.code === 11000) {
        console.warn('Duplicate entries skipped');
      } else {
        throw err;
      }
    });

    res.status(200).json({
      message: 'Plant data synced successfully',
      count: insertedPlants?.length || 'Duplicates skipped',
    }); 
  } catch (error) {
    console.error('Error syncing plant data:', error);
    res.status(500).json({ message: 'Error syncing plant data', error: error.message });
  }
};
