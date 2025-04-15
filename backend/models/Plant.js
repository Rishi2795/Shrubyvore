import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  trefleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
  sunlight: { type: String },
  water: { type: String },
  careInstructions: { type: String },
});

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
