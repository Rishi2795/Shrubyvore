import express from 'express';
import { getPlantList, getPlantDetails, syncPlantData } from '../controllers/plantController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all plants (public access)
router.get('/', getPlantList);

// Get details of a specific plant (public access)
router.get('/:id', getPlantDetails);

// Sync plant data (admin access or similar)
router.post('/sync', authMiddleware, syncPlantData);

export default router;
