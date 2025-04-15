import Wishlist from '../models/Wishlist.js';
import Plant from '../models/Plant.js';

// Get wishlist for the authenticated user
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.auth.userId }).populate('plantId');
    res.status(200).json(wishlist || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist', details: err.message });
  }
};

// Add a plant to the wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.auth.userId;

    const existing = await Wishlist.findOne({ user: userId, plantId });
    if (existing) {
      return res.status(400).json({ error: 'Plant already in wishlist' });
    }

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const wishlistItem = new Wishlist({
      user: userId,
      plantId,
      name: plant.name,
      image: plant.imageUrl,
      addedDate: new Date(),
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to wishlist', details: err.message });
  }
};

// Remove plant from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { plantId } = req.params;
    const userId = req.auth.userId;

    const removed = await Wishlist.findOneAndDelete({ user: userId, plantId });

    if (!removed) {
      return res.status(404).json({ error: 'Plant not found in wishlist' });
    }

    res.status(200).json({ message: 'Removed from wishlist', removed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from wishlist', details: err.message });
  }
};
