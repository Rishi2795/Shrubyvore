import User from '../models/User.js';

// Register user in MongoDB using Clerk ID
export const registerUser = async (req, res) => {
  try {
    const { clerkId, email, fullName } = req.body;

    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ clerkId, email, fullName });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Get user profile by Clerk ID
export const getUserProfile = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
};
