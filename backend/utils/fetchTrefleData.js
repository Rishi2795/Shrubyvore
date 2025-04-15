// utils/fetchTrefleData.js
import axios from 'axios';

const TREFLE_TOKEN = process.env.TREFLE_TOKEN;

const fetchTrefleData = async (query) => {
  try {
    const response = await axios.get(`https://trefle.io/api/v1/plants/search`, {
      params: {
        token: TREFLE_TOKEN,
        q: query,
      },
    });

    const results = response.data.data;

    return results.map((plant) => ({
      trefleId: plant.id,
      name: plant.common_name || plant.scientific_name,
      scientificName: plant.scientific_name,
      imageUrl: plant.image_url,
      family: plant.family_common_name,
      genus: plant.genus.name,
    }));
  } catch (error) {
    console.error('Trefle API error:', error.message);
    throw new Error('Failed to fetch plant data from Trefle');
  }
};

export default fetchTrefleData;
