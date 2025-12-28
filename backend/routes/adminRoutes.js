import express from 'express';
import { getAllCarts, getAdminStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all-carts', protect, admin, getAllCarts);
router.get('/stats', protect, admin, getAdminStats);

export default router;

