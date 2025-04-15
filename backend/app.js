import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import plantRoutes from './routes/plantRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';  // Import the weather routes

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/weather', weatherRoutes);  // Use the weather routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

export default app;
