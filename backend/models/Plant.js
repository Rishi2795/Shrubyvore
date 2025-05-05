const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  trefleId: { type: String, required: true, unique: true }, // ID from Trefle API
  name: { type: String, required: true },
  description: { type: String },
  soilRequirements: { type: String },
  wateringInstructions: { type: String },
  fertilizerRecommendations: { type: String },
  images: [{ type: String }], // Array of image URLs
});

module.exports = mongoose.model('Plant', plantSchema);