import express from 'express';
import { 
    createOrder, 
    getUserOrders, 
    getOrderById,
    verifyEsewaPayment
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

router.post('/esewa-verify', verifyEsewaPayment);

export default router;

