import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: String, required: true },
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
  name: String,
  image: String,
  addedDate: Date,
});

export default mongoose.model('Wishlist', wishlistSchema);
