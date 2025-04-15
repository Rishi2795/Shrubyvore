import { verifyToken } from '@clerk/backend';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const { userId } = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });

    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export default authMiddleware;
