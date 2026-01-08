// routes/adminRoutes.js
import express from 'express';
import { 
    getAllCarts, 
    getAdminStats,
    getAllOrders,
    updateOrderStatus,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAnalytics
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.get('/all-carts', protect, admin, getAllCarts);
router.get('/stats', protect, admin, getAdminStats);
router.get('/all-orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);
router.get('/products', protect, admin, getAllProducts);
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);
router.get('/analytics', protect, admin, getAnalytics);

export default router;
