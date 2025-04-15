import express from 'express';
import { registerUser, getUserProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Get user profile by clerkId
router.get('/profile/:clerkId', authMiddleware, getUserProfile);

export default router;

